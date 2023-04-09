import { ApiPathType } from "../types";

export type GetIsLikeArticleRequest = {
    href: string;
};

export type GetIsLikeArticleResponse = {
    isLike: boolean;
};

export const getIsLikeArticle: ApiPathType = "/api/v1/article/like";
