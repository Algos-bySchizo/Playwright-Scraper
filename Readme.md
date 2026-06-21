# Playwright Scraper

A simple web scraper built with [Playwright](https://playwright.dev/) (using Firefox) that extracts **services** and **product** information from [360xpertsolutions.com](https://www.360xpertsolutions.com/) and saves the results to a local JSON file.

## What it does

1. Opens the target website in a Firefox browser window.
2. Scrolls to the **Services** section and extracts each service's title and description.
3. Scrolls to the **Products** section and collects all "View More" product links.
4. Visits each product link in a new tab, grabs the page title and main heading (`<h1>`).
5. Saves everything (services + products) into `scraped_data.json`.

## Tech Stack

- **TypeScript**
- **Playwright** (Firefox)
- **Node.js** `fs` module for writing output

## Prerequisites

- [Node.js](https://nodejs.org/) installed (v16 or later recommended)
- npm (comes with Node.js)

## Installation

```bash
git clone https://github.com/Algos-bySchizo/Playwright-Scraper.git
cd Playwright-Scraper
npm install
npx playwright install firefox
```

- `npm install` — downloads all the project's dependencies listed in `package.json`.
- `npx playwright install firefox` — downloads the Firefox browser binary that Playwright controls (Playwright doesn't use your normal installed browser, it ships its own).

## Usage

Run the scraper with:

```bash
npx ts-node index.ts
```

(Replace `index.ts` with the actual filename if it's different.)

This will:
- Open a visible Firefox window (since `headless: false` is set)
- Scrape the data
- Save it to `scraped_data.json` in the project root

## Output

A file named `scraped_data.json` will be created with this structure:

```json
{
  "services": [
    { "title": "Service Name", "description": "Service description text" }
  ],
  "products": [
    { "link": "https://...", "title": "Page Title", "heading": "Main Heading" }
  ]
}
```

## Notes

- The scraper runs in **non-headless** mode by default (you'll see the browser open). Change `headless: false` to `headless: true` in the script if you want it to run silently in the background.
- Duplicate services/links are automatically filtered out before saving.

## License

This project is for educational/personal use. Make sure scraping this site complies with its terms of service.
