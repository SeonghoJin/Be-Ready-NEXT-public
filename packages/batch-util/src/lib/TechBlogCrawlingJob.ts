import { BlogInspectorApi } from "@./inspector";
import { CompanyArticle, CompanyNameType } from "@./common";
import { logger } from "./logger";
import { BlogItemDatabase, CompanyRepository, TimeDatabase } from "@./repository";
import { OptionalId } from "mongodb";
import { omit } from 'lodash';

type ConstructorType = {
  [x in CompanyNameType]: BlogInspectorApi;
};

export class TechBlogCrawlingJob {
  constructor(
    private apiMap: ConstructorType,
    private blogItemRepository: BlogItemDatabase,
    private timeRepository: TimeDatabase,
    private companyRepository: CompanyRepository
  ) {
  }

  async start() {

    await this.startCrawling();

    await this.updateCompanyBlogItemCount();

    await this.updateBatchTime();
  }

  private updateBatchTime = async () => {
    await this.timeRepository.db.findOneAndUpdate({
      name: "batch"
    }, {
      $set: {
        name: "batch",
        value: new Date().toString()
      }
    },
      { upsert: true }
    );
  };

  private updateCompanyBlogItemCount = async () => {
    const data = await this.blogItemRepository.db.aggregate([
      {
        $group: {
          _id: {
            company: "$company"
          },
          count: { $count: {} }
        }
      }
    ]).toArray();

    if (!data) {
      throw new TypeError("blogItem is empty");
    }

    for (const item of data) {
      const { _id: { company }, count } = item;
      logger.info(`try insert [${company}] is ${count}`);
      await this.companyRepository.db.updateOne({
        _id: company
      }, {
        $set: {
          count
        }
      });
      logger.info(`insert count of [${company}] success`);
    }
  };


  private startCrawling = async () => {
    try {
      const inspectorKeyValueArray = Object.entries<BlogInspectorApi>(
        this.apiMap
      );

      for (const [companyName] of inspectorKeyValueArray) {
        logger.info(`DETECT ${companyName} inspector`);
      }

      for (const [companyName, inspector] of inspectorKeyValueArray) {
        logger.info(`${companyName} crawling start`);

        try {
          const blogItemList = await inspector.getNewBlogItemList();
          blogItemList.forEach((blogItem) => {
            logger.info(
              `[${companyName} INSPECTOR] ${blogItem.href} PARSE SUCCESS`
            );
          });

          (
            await Promise.allSettled(
              blogItemList.map(async (blogItem) => {
                const doc: OptionalId<CompanyArticle> = {
                  company: (await this.companyRepository.db.findOne({ id: blogItem.company.id }))!._id as unknown as string,
                  createdAt: blogItem.createdAt,
                  href: blogItem.href,
                  like: 0,
                  summarize3: ["", "", ""],
                  title: blogItem.title,
                  viewCount: 0,
                  tag: [],
                  description: blogItem.description,
                  rawText: blogItem.rawText,
                  active: true,
                }
                logger.info(`try insert at Database`, omit(doc, ['rawText', 'description']));
                return this.blogItemRepository.db.insertOne(doc);
              })
            )
          ).map((response) => {
            if (response.status === "rejected") {
              logger.error(`[${companyName}] ${response.reason}`);
            }
          });


          logger.info(`${companyName} crawling end`);
        } catch (e) {
          logger.error(e);
        }


      }
    } catch (e) {
      logger.error(e);
    }
    logger.info("TechBlogCrawling End");
  };
}
