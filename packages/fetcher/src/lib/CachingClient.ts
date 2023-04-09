import { cachingHtml, existsFile, getCachingPath, GetHtmlClient } from "@./fetcher";
import { readFile } from "fs/promises";

export class CachingClient implements GetHtmlClient {
  private htmlClient: GetHtmlClient;

  public constructor({ htmlClient }: { htmlClient: GetHtmlClient }) {
    this.htmlClient = htmlClient;
  }

  async getHtml(url: string): Promise<string> {
    if (url.trim() === "") {
      throw new Error("getHtml argument error");
    }
    const fileName = getCachingPath(url);

    if (await existsFile(fileName)) {
      try {
        return (await readFile(fileName)).toString();
      } catch (e) {
        throw new Error(`read - ${fileName} \n argument - ${url} \n ${e}`);
      }
    }

    const html = await this.htmlClient.getHtml(url);

    await cachingHtml(url, html);

    return html;
  }
}
