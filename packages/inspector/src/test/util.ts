import { mkdir, writeFile } from 'fs/promises';
import { TechBlogInspector } from '@./inspector';
import { existsFile, urlToFileName } from '@./fetcher';
import { join } from 'path';
import { chalk } from '@./common';

const outputFolderPath = join(__dirname, 'output');

(async function verifyDirectoryStructure() {
  if (!(await existsFile(outputFolderPath))) {
    console.warn(`not found ${outputFolderPath}`);
    console.log(`create ${outputFolderPath}`);

    await mkdir(outputFolderPath);
  }
})();

export const writeOutput = async (
  url: string,
  blogItem: Awaited<ReturnType<TechBlogInspector['parseArticle']>>
) => {
  const path = join(outputFolderPath, `${urlToFileName(url)}.json`);
  console.log(`${chalk.green('write blog item')} of ${path}`);
  await writeFile(path, JSON.stringify(blogItem));
};
