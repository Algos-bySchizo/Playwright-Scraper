import { firefox } from 'playwright';
import fs from 'fs'; 

(async () => {
  const browser = await firefox.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://www.360xpertsolutions.com/');

  await page.locator('#services').scrollIntoViewIfNeeded();

  let services = await page.$$eval('#services div', divs =>
    divs
      .filter(div => div.querySelector('h3') && div.querySelector('p')) // only divs with both h3 & p
      .map(div => {
        const title = div.querySelector('h3')!.textContent!.trim();
        const description = div.querySelector('p')!.textContent!.trim();
        return { title, description };
      })
  );

  services = Array.from(new Map(services.map(s => [s.title + s.description, s])).values());

  console.log('Services:', services);

  await page.locator('#products').scrollIntoViewIfNeeded();

  const productLinks = await page.$$eval('#products a.group', anchors =>
    anchors
      .filter(a => a.textContent?.includes('View More'))
      .map(a => a.getAttribute('href'))
  );

  const uniqueLinks = [...new Set(productLinks)];

  console.log('Product Links:', uniqueLinks);

  const products = [];

  for (const link of uniqueLinks) {
    if (!link) continue;

    console.log('Opening:', link);

    const newPage = await browser.newPage();
    await newPage.goto(link);
    await newPage.waitForLoadState('load');

    const title = await newPage.title();

    let heading = '';
    try {
      heading = await newPage.locator('h1').first().textContent() || '';
    } catch {}

    products.push({ link, title, heading });

    await newPage.close();
  }

  const results = { services, products };
  fs.writeFileSync('scraped_data.json', JSON.stringify(results, null, 2));

  console.log('✅ Scraping complete! Data saved in scraped_data.json');

  await browser.close();
})();