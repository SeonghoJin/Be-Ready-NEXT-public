import { ApiPathType } from "../types";

export type GetLikeArticleCountRequest = {
    href: string;
};

export type GetLikeArticleCountResponse = {
    count: number;
};

export const getLikeArticleCount: ApiPathType = "/api/v1/article/like/count";
