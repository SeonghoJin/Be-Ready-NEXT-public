import { mkdir, stat, writeFile } from 'fs/promises';
import { join, normalize } from 'path';
import { chalk } from '@./common';

export const urlToFileName = (url: string) =>
  url.split('/').join('').replace(':', '');

export const getCachingPath = (url: string) => {
  const filename = urlToFileName(url);
  return join(normalize(`${__filename}/..`), 'html', filename);
};

export const cachingHtml = async (url: string, html: string) => {
  console.log(`${chalk.green('caching')}: ${url} at ${getCachingPath(url)}`);
  await writeFile(getCachingPath(url), html);
};

export const existsFile = async (fileName: string) => {
  try {
    await stat(fileName);
    return true;
  } catch (e) {
    return false;
  }
};

(async function verifyDirectoryStructure() {
  const htmlFolderPath = join(normalize(`${__filename}/..`), 'html');

  if (!(await existsFile(htmlFolderPath))) {
    console.warn(`not found ${htmlFolderPath}`);
    console.log(`create ${htmlFolderPath}`);

    await mkdir(htmlFolderPath);
  }
})();
