import { BlogItemDatabase, LikeRepository } from "@./repository";
import {
  CompanyArticleDto,
  DeleteIsLikeArticleResponse,
  GetCompanyArticleRequest,
  GetCompanyArticleResponse,
  GetLikeArticleCountRequest,
  GetLikeArticleCountResponse,
  PostDeactivateBlogArticleRequest,
  PostLikeArticleResponse,
  PutIncreaseArticleRequest,
  PutIncreaseArticleResponse
} from "@./common";
import { Sort } from "mongodb";

export class BlogItemService {
  constructor(
    private blogRepository: BlogItemDatabase,
    private likeRepository: LikeRepository) {
  }

  deactivateBlogArticle = ({ href }: PostDeactivateBlogArticleRequest) => {
    if (typeof href !== "string") {
      throw new TypeError();
    }

    return this.blogRepository.db.updateOne({
      href
    }, {
      $set: {
        active: false
      }
    });
  }

  async increaseArticleViewCount({
    href
  }: PutIncreaseArticleRequest): Promise<PutIncreaseArticleResponse> {
    if (typeof href !== "string") {
      throw new TypeError();
    }

    await this.blogRepository.db.updateOne(
      {
        href
      },
      {
        $inc: { viewCount: 1 }
      }
    );
  }

  async likeArticle({
    href,
    userId
  }: { href: string, userId: string }): Promise<PostLikeArticleResponse> {
    if (typeof href !== "string") {
      throw new TypeError();
    }

    const item = await this.blogRepository.db.findOne({
      href
    });


    if (!item) {
      throw new Error("존재 하지 않은 블로그입니다.");
    }


    await this.likeRepository.db.insertOne({
      blogId: item._id.toString(),
      userId
    });
  }

  async deleteLikeArticle({
    href,
    userId
  }: { href: string, userId: string }): Promise<DeleteIsLikeArticleResponse> {
    if (typeof href !== "string") {
      throw new TypeError();
    }

    const item = await this.blogRepository.db.findOne({
      href
    });

    if (!item) {
      throw new Error("존재 하지 않은 블로그입니다.");
    }
    await this.likeRepository.db.deleteOne({
      blogId: item._id.toString(),
      userId
    });
  }

  isLikeArticle = async (params: { href: string; userId: string; }) => {
    const { href, userId } = params;

    const blogItem = await this.blogRepository.db.findOne({
      href
    });

    if (!blogItem) {
      return false;
    }

    const item = await this.likeRepository.db.findOne({
      userId,
      blogId: blogItem._id.toString()
    });

    return !!item;
  };

  getLikeArticleCount = async (params: GetLikeArticleCountRequest): Promise<GetLikeArticleCountResponse> => {
    const { href } = params;

    const blogItem = await this.blogRepository.db.findOne({
      href
    });

    if (!blogItem) {
      return { count: 0 };
    }

    const item = await this.likeRepository.db.countDocuments({
      blogId: blogItem._id.toString()
    });

    return { count: item };
  }


  async getAllItemBlog({
    company = [],
    tag = [],
    contentHeader = "최신",
    page = "0"
  }: GetCompanyArticleRequest): Promise<GetCompanyArticleResponse> {
    if (!Array.isArray(company)) {
      throw new TypeError();
    }

    if (!Array.isArray(tag)) {
      throw new TypeError();
    }

    if (contentHeader !== "최신" && contentHeader !== "인기") {
      throw new TypeError();
    }

    const pageNum = parseInt(page, 10);

    if (typeof pageNum !== "number" || pageNum < 0) {
      throw new TypeError();
    }

    const companyFindOptions = (() => {
      if (company.length === 0) {
        return {};
      }

      return {
        $or: company.map((name) => ({
          "company.name": name
        }))
      };
    })();

    const tagFindOptions = (() => {
      if (tag.length === 0) {
        return {};
      }

      return {
        $or: tag.map((name) => ({
          tag: name
        }))
      };
    })();

    const contentHeaderOptions = (() => {
      if (contentHeader === "최신") {
        return {
          createdAt: -1,
          href: -1
        };
      }

      return {
        like: -1,
        viewCount: -1,
        createdAt: -1,
        href: -1
      };
    })() as Sort;

    const PER_PAGE = 10;
    const skipNum = pageNum > 0 ? (pageNum - 1) * PER_PAGE : 0;

    const count = (await this.blogRepository.db.aggregate<CompanyArticleDto>([
      {
        $match: {
          active: true
        }
      },
      {
        $lookup: {
          from: "company",
          localField: "company",
          foreignField: "_id",
          as: "company"
        }
      }, {
        $unwind: "$company"
      },

      {
        $match: {
          $and: [companyFindOptions, tagFindOptions]
        }
      }]).toArray()).length;


    const article = await this.blogRepository.db
      .aggregate<CompanyArticleDto>([
        {
          $match: {
            active: true
          }
        },
        {
          $lookup: {
            from: "company",
            localField: "company",
            foreignField: "_id",
            as: "company"
          }
        }, {
          $unwind: "$company"
        },
        {
          $match: {
            $and: [companyFindOptions, tagFindOptions]
          }
        },
        {
          $sort: contentHeaderOptions
        },
        {
          $skip: skipNum
        },
        {
          $limit: PER_PAGE
        }
      ]).toArray();

    return {
      article,
      page: pageNum,
      count
    };
  }


}
