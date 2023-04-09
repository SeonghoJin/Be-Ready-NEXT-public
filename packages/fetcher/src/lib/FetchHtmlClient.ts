import { GetHtmlClient } from '@./fetcher';

export class FetchHtmlClient implements GetHtmlClient {
  async getHtml(url: string): Promise<string> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`
          status = ${response.statusText} \n
          redirected = ${response.redirected} \n
          headers = ${response.headers}
        `);
      }

      return await response.text();
    } catch (e) {
      throw new Error(`fetching error - because url = ${url} \n ${e}`);
    }
  }
}
