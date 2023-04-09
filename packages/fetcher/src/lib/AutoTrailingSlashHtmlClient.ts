import { GetHtmlClient } from '@./fetcher';
import { chalk } from '@./common';

export class AutoTrailingSlashHtmlClient implements GetHtmlClient {
  private htmlClient: GetHtmlClient;

  public constructor({ htmlClient }: { htmlClient: GetHtmlClient }) {
    this.htmlClient = htmlClient;
  }

  getHtml(url: string): Promise<string> {
    if (url.at(-1) === '/') {
      return this.htmlClient.getHtml(url);
    }

    console.log(
      chalk.green(
        `The URL doesn't have a trailing slash. Add a trailing slash. \n
      before = ${url} \n
      after  = ${url + '/'}
    `
      )
    );

    return this.htmlClient.getHtml(url + '/');
  }
}
