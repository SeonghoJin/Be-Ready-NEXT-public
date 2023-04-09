import { GetHtmlClient } from '@./fetcher';
import puppeteer from 'puppeteer';

export class PuppetterHtmlClient implements GetHtmlClient {
  async getHtml(url: string): Promise<string> {
    console.log('[INFO] PUPPETEER LAUNCHED');
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    console.log(`[INFO] PUPPETEER GOTO ${url}`);
    await page.goto(url, {
      waitUntil: 'networkidle0',
    });

    const html = await page.content();

    console.log(`[INFO] PUPPETEER CLOSE`);
    await browser.close();
    return Promise.resolve(html);
  }
}
