import { BlogItemDatabase, CompanyRepository, MongoDBConnection, TimeDatabase } from "@./repository";
import { TechBlogCrawlingJob } from "@./batch-util";
import chalk from "chalk";
import { createCompanyMap, createTechBlogInspectorMap } from "@./inspector";
import { SERVER_CONFIG } from "@./serve-config";

async function main() {
  console.log("start batch application");
  const connection = await new MongoDBConnection(
    SERVER_CONFIG.DATABASE_URL
  ).connect();
  const blogItemRepository = new BlogItemDatabase(connection);
  const timeRepository = new TimeDatabase(connection);
  const companyRepository = new CompanyRepository(connection);

  const companyList = await companyRepository.db.find({ active: true }).toArray();

  const companyMap = createCompanyMap(companyList);
  console.log("companyMap", companyMap)
  const techBlogInspectorMap = createTechBlogInspectorMap(companyMap);
  console.log("techBlogInspectorMap", techBlogInspectorMap)

  console.log(chalk.green("batch start", new Date()));
  await (new TechBlogCrawlingJob(
    techBlogInspectorMap,
    blogItemRepository,
    timeRepository,
    companyRepository
  )).start();
}

main();
