import { ApiPathType } from "../types";

export type DeleteIsLikeArticleRequest = {
    href: string;
};

export type DeleteIsLikeArticleResponse = void;

export const deleteIsLikeArticlePath: ApiPathType = "/api/v1/article/like";
