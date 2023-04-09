import { schedule } from "@./common";
import { BlogItemDatabase, CompanyRepository, MongoDBConnection, TimeDatabase } from "@./repository";
import { createCompanyMap, createTechBlogInspectorMap } from "@./inspector";
import { logger, TechBlogCrawlingJob } from "@./batch-util";
import chalk from "chalk";
import { SERVER_CONFIG } from '@./serve-config';

async function main() {
  logger.info("START BATCH APPLICATION");

  const connection = await new MongoDBConnection(
    SERVER_CONFIG.DATABASE_URL
  ).connect();
  const blogItemRepository = new BlogItemDatabase(connection);
  const timeRepository = new TimeDatabase(connection);
  const companyRepository = new CompanyRepository(connection);

  const companyList = await companyRepository.db.find({}).toArray();

  const companyMap = createCompanyMap(companyList);
  const techBlogInspectorMap = createTechBlogInspectorMap(companyMap);
  console.log("ADD BATCH SCHEDULE");

  schedule.scheduleJob("30 * * * *", function () {
    console.log(chalk.green("batch start", new Date()));
    const crawlingJob = new TechBlogCrawlingJob(
      techBlogInspectorMap,
      blogItemRepository,
      timeRepository,
      companyRepository
    );

    crawlingJob.start();
  });
}

main();
