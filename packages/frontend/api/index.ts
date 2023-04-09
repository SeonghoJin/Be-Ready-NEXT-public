import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import { getCompanyAllPath, GetCompanyArticleRequest, getTagAllPath } from "@./common";
import { useApiService } from "../context/ApiServiceContext";

export const useCompanyAll = () => {
  const { apiService } = useApiService();
  return useQuery([getCompanyAllPath], async () => {
    return (await apiService.getCompanyAll()).companyList;
  });
};

export const useTagAll = () => {
  const { apiService } = useApiService();
  return useQuery([getTagAllPath], async () => {
    return (await apiService.getTagAll()).tagList;
  });
};

export const useCompanyArticle = ({
  company,
  tag,
  contentHeader
}: Omit<GetCompanyArticleRequest, "page">) => {
  const { articleService } = useApiService();

  return useInfiniteQuery(
    [...company.sort(), ...tag.sort(), contentHeader],
    async ({ pageParam = 1 }) => {
      return await articleService.getCompanyArticle({
        company,
        contentHeader,
        tag,
        page: pageParam
      });
    },
    {
      getNextPageParam(a, b) {
        if (b?.flatMap((_) => _.article).length >= a.count) {
          return false;
        }
        return a.page + 1;
      }
    }
  );
};

export const useIncreaseViewCount = () => {
  const { articleService } = useApiService();
  return useMutation(articleService.incraseViewCountCompanyArticle);
};

export const useTime = (name: string) => {
  const { apiService } = useApiService();
  return useQuery([name], () => apiService.getTime(name as any));
};

export const useLikeArticle = () => {
  const { articleService } = useApiService();
  return useMutation(articleService.likeArticle);
};

export const useIsLike = (href: string) => {
  const { articleService } = useApiService();
  return useQuery([href], () => articleService.isLike({ href }));
};

export const useDeleteLike = () => {
  const { articleService } = useApiService();
  return useMutation(articleService.deleteLike)
}

export const useLikeCount = (href) => {
  const { articleService } = useApiService();
  return useQuery(['like', 'count', href], () => articleService.getLikeCount({ href }))
}

export const useDeativateArticle = () => {
  const { articleService } = useApiService();

  return useMutation(articleService.deactivateArticle)
}
