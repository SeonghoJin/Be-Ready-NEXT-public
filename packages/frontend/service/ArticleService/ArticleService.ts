import {
  deleteIsLikeArticlePath,
  DeleteIsLikeArticleRequest,
  DeleteIsLikeArticleResponse,
  getCompanyArticlePath,
  GetCompanyArticleRequest,
  GetCompanyArticleResponse,
  GetIsLikeArticleRequest,
  GetIsLikeArticleResponse,
  getLikeArticleCount,
  GetLikeArticleCountRequest,
  GetLikeArticleCountResponse,
  postDeativateBlogArticlePath,
  PostLikeArticlePath,
  PostLikeArticleRequest,
  PostLikeArticleResponse,
  putIncreaseArticlePath,
  PutIncreaseArticleRequest,
  PutIncreaseArticleResponse,
  timer
} from "@./common";
import { HTTPClient } from "@./fetcher";

export class ArticleService {
  constructor(private httpService: HTTPClient) {
  }

  deactivateArticle = async (requset: PostLikeArticleRequest) => {
    return (await this.httpService.post<PostLikeArticleResponse>(
      postDeativateBlogArticlePath,
      requset
    ))
  }

  getLikeCount = async (request: GetLikeArticleCountRequest) => {
    return (await this.httpService.get<GetLikeArticleCountResponse>(
      getLikeArticleCount,
      {
        params: request
      }
    )).data
  }

  likeArticle = async (request: PostLikeArticleRequest) => {
    await timer(400);
    return (
      await this.httpService.post<PostLikeArticleResponse>(
        PostLikeArticlePath,
        request
      )
    ).data;
  };

  deleteLike = async (request: DeleteIsLikeArticleRequest): Promise<DeleteIsLikeArticleResponse> => {
    await timer(400);

    await this.httpService.delete<PostLikeArticleRequest>(deleteIsLikeArticlePath, {
      params: request
    });
  };

  isLike = async (request: GetIsLikeArticleRequest) => {
    await timer(400);
    return (await (this.httpService.get<GetIsLikeArticleResponse>("/api/v1/article/like", {
      params: request
    }))).data.isLike;
  };

  getCompanyArticle = async (
    request: GetCompanyArticleRequest
  ): Promise<GetCompanyArticleResponse> => {
    return (
      await this.httpService.get<GetCompanyArticleResponse>(
        getCompanyArticlePath,
        {
          params: request
        }
      )
    ).data;
  };

  incraseViewCountCompanyArticle = async (
    request: PutIncreaseArticleRequest
  ) => {
    return await this.httpService.put<PutIncreaseArticleResponse>(
      putIncreaseArticlePath,
      request
    );
  };
}
