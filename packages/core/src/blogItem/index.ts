import express from "express";
import { BlogItemDatabase, LikeRepository } from "@./repository";
import { BlogItemService } from "./blogItem.service";
import {
  DeleteIsLikeArticleRequest,
  GetCompanyArticleRequest,
  GetIsLikeArticleRequest,
  GetLikeArticleCountRequest,
  PostDeactivateBlogArticleRequest,
  PostLikeArticlePath,
  PostLikeArticleRequest,
  PutIncreaseArticleRequest,
  deleteIsLikeArticlePath,
  getCompanyArticlePath,
  getIsLikeArticle,
  getLikeArticleCount,
  postDeativateBlogArticlePath,
  putIncreaseArticlePath
} from "@./common";
import { isLoggedIn } from "../middleware";
import { rescue } from "../middleware/errorMiddleware";

type GetBlogItemRouterArgs = {
  blogItemRepository: BlogItemDatabase;
  likeRepository: LikeRepository
};

export const getBlogItemRouter = ({
  blogItemRepository,
  likeRepository
}: GetBlogItemRouterArgs) => {
  const blogItemService = new BlogItemService(blogItemRepository, likeRepository);

  const blogItemRouter = express.Router();

  blogItemRouter.get(getCompanyArticlePath, async (req, res) => {
    const { contentHeader, tag, company, page } =
      req.query as GetCompanyArticleRequest;

    const itemBlogList = await blogItemService.getAllItemBlog({
      company,
      tag,
      contentHeader,
      page
    });
    res.send(itemBlogList);
  });

  blogItemRouter.put(putIncreaseArticlePath, async (req, res) => {
    const { href } = req.body as PutIncreaseArticleRequest;

    await blogItemService.increaseArticleViewCount({
      href
    });

    res.sendStatus(200);
  });

  blogItemRouter.post(PostLikeArticlePath, isLoggedIn, rescue(async (req, res) => {
    const { href } = req.body as PostLikeArticleRequest;

    const { user } = req;


    if (!user) {
      return res.sendStatus(401);
    }

    await blogItemService.likeArticle({
      href,
      userId: user._id
    });


    res.sendStatus(200);
  }));

  blogItemRouter.get(getIsLikeArticle, async (req, res) => {
    const { href } = req.query as GetIsLikeArticleRequest;
    const { user } = req;

    if (!user) {
      return res.send({ isLike: false });
    }

    const isLike = await blogItemService.isLikeArticle({
      href, userId: user._id
    });
    res.send({ isLike });
  });

  blogItemRouter.delete(deleteIsLikeArticlePath, isLoggedIn, rescue(async (req, res) => {
    const { href } = req.query as DeleteIsLikeArticleRequest;
    const { user } = req;

    if (!user) {
      return res.send({ isLike: false });
    }

    await blogItemService.deleteLikeArticle({
      href, userId: user._id
    });

    res.send(200);
  }));

  blogItemRouter.get(getLikeArticleCount, rescue(async (req, res) => {
    const { href } = req.query as GetLikeArticleCountRequest;

    const { count } = await blogItemService.getLikeArticleCount({
      href
    });

    res.send({ count });
  }))

  blogItemRouter.post(postDeativateBlogArticlePath, isLoggedIn, rescue(async (req, res) => {
    const { href } = req.body as PostDeactivateBlogArticleRequest;

    try {
      const response = await fetch(href)

      if (response.status >= 400) {
        await blogItemService.deactivateBlogArticle({ href });
        return res.send(200);
      }

      res.send(400);
    } catch (err) {
      res.send(400);
    }
  }))


  return blogItemRouter;
};
