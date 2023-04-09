import Link from "next/link";
import Image from "next/image";
import { CompanyArticleDto } from "@./common";
import { Skeleton } from "@mui/material";
import { css } from "@emotion/react";
import {
  useDeativateArticle,
  useDeleteLike,
  useIncreaseViewCount,
  useIsLike,
  useLikeArticle,
  useLikeCount
} from "../api";
import { c } from "../util";
import { useEffect, useState } from "react";
import { LoadingLottie } from "./LoadingLottie";
import { useToast } from "./Toast/util";
import { useHandleError } from "../util/useHandleError";

type ArticleViewProps = CompanyArticleDto;

export const ArticleView = (article: ArticleViewProps) => {
  const { mutate } = useIncreaseViewCount();
  const {
    mutateAsync: likeArticle,
    isLoading,
    error: likeError,
    reset: resetLike
  } = useLikeArticle();
  const toast = useToast();

  const {
    mutateAsync: deleteLikeArticle,
    error: deleteError,
    isLoading: deleteLoading,
    reset: resetDelete
  } = useDeleteLike();

  const {
    data: isLike,
    refetch: refetchIsLike,
    isFetching: isLikeLoading
  } = useIsLike(article.href);
  const { data: likeCount, refetch: refetchLikeCount } = useLikeCount(
    article.href
  );

  const [descriptionOption, setDescriptionOption] = useState<
    "description" | "summarize3"
  >("description");

  const isEmptySummarize3 =
    article.summarize3.reduce((acc, cur) => `${acc}${cur}`, "").trim() === "";

  const isEmptyDescription = article.description.trim() === "";
  const {
    mutateAsync: deactivate,
    isLoading: deactivateLoading,
    error: deactivateError,
    isSuccess: deactivateSuccess,
    reset: resetDeactivate
  } = useDeativateArticle();

  const handleDeactivate = async () => {
    toast({
      text: (
        <>
          삭제 요청해주셔서 감사합니다. 😊 <br /> 확인 후 삭제하겠습니다.
        </>
      )
    });
  };
  useHandleError(likeError, resetLike);
  useHandleError(deleteError, resetDelete);
  useHandleError(deactivateError, resetDeactivate, [
    (e) => {
      if (e.response.status === 400) {
        handleDeactivate();
        return true;
      }
      return false;
    }
  ]);

  useEffect(() => {
    if (deactivateSuccess) {
      handleDeactivate();
    }
  }, [deactivateSuccess]);

  function changeDescriptionOption() {
    if (descriptionOption === "description") {
      toast({
        text: "3줄 요약은 준비 중이에요. 😢",
        force: true
      });
      return setDescriptionOption("summarize3");
    }
    return setDescriptionOption("description");
  }

  return (
    <div
      key={article.href}
      className={"transition-transform hover:scale-[101%]"}
      css={css`
        padding-bottom: 5px;
      `}
    >
      <div className="flex justify-between">
        <div
          css={css`
            display: flex;
            align-items: center;
            font-size: 16px;
            gap: 10px;
          `}
        >
          <Link href={article.company.href} target={"_blank"}>
            <Image
              src={article.company.imageUrl}
              alt={article.company.name}
              width={30}
              height={30}
            />
          </Link>
          <div
            css={css`
              gap: 8px;
              display: flex;
              align-items: center;
            `}
          >
            <Link
              target={"_blank"}
              href={article.company.href}
              className={"hover:underline hover:underline-offset-4"}
            >
              <span>{article.company.name}</span>
            </Link>
            <span
              css={css`
                font-size: 12px;
                opacity: 0.5;
              `}
            >
              {article.createdAt}
            </span>
          </div>
        </div>
        <button
          className={"justify-items-end"}
          disabled={deactivateLoading}
          onClick={() => {
            deactivate({ href: article.href });
          }}
        >
          {deactivateLoading ? (
            "요청 중.."
          ) : (
            <span className=" text-[14px] underline-offset-4 opacity-70 hover:underline">
              삭제 요청
            </span>
          )}
        </button>
      </div>
      <Link
        href={article.href}
        target={"_blank"}
        className={"group"}
        onClick={() => {
          mutate({ href: article.href });
        }}
      >
        <div
          className={
            "group-hover:text-blue500 transition-all duration-300 group-hover:drop-shadow-xl"
          }
          css={css`
            margin-top: 10px;
            font-size: 26px;
            font-weight: bold;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 1.5;
            max-height: 117px;
          `}
        >
          {article.title}
        </div>
      </Link>
      <div />
      <div className="flex flex-col">
        <Link
          css={css`
            display: flex;
            flex-direction: column;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-word;
            overflow-wrap: break-word;
            font-size: 0.875rem;
            line-height: 1.5;
            height: 3.9375rem;
            width: 100%;
          `}
          className={
            "group text-left leading-[1.5] underline-offset-4 hover:underline"
          }
          href={article.href}
          target={"_blank"}
          onClick={() => {
            mutate({ href: article.href });
          }}
        >
          <div
            className={c(
              {
                hidden: "description" !== descriptionOption
              },
              "overflow-hidden"
            )}
          >
            {!isEmptyDescription
              ? article.description
              : "설명이 존재하지 않아요. 😢"}
          </div>
          <div
            className={c({
              hidden: "summarize3" !== descriptionOption
            })}
          >
            {isEmptySummarize3 ? (
              <div>아직 3줄 요약이 준비되지 않았어요. 😢</div>
            ) : (
              article.summarize3.map((summarize, index) => {
                return (
                  <div className={"hover:underline"} key={index}>
                    - {summarize}
                  </div>
                );
              })
            )}
          </div>
        </Link>
      </div>
      <div className="mt-[10px] flex flex-col ">
        <div className="flex  gap-x-[10px]">
          <div className="flex w-full flex-col items-end justify-end gap-[5px]">
            <div className="text-right">
              <strong>{article.viewCount}</strong> 명의 사람들이 읽었어요.
            </div>
            <div className="text-right">
              <strong>{likeCount?.count ?? 0}</strong> 명의 사람들이 저장하고
              있어요.
            </div>
          </div>
        </div>
        <div className="mt-[10px] mb-[10px] flex gap-x-[10px] self-end">
          <button
            className={c(
              "hover:bg-opacityGray min-w-[100px] self-end rounded-[8px] bg-slate-50  p-[12px_10px] text-[14px]"
            )}
            onClick={() => {
              changeDescriptionOption();
            }}
            title={
              "3줄 요약 기능은 준비 중인 기능으로, 완벽하지 않을 수 있습니다."
            }
          >
            {descriptionOption === "summarize3" ? "되돌리기" : "3줄 요약 ✍"}
          </button>
          <button
            className={c(
              "hover:bg-opacityGray min-w-[100px] rounded-[8px] bg-slate-50 p-[12px_10px] text-[14px]"
            )}
            disabled={isLoading || deleteLoading || isLikeLoading}
            onClick={async () => {
              if (isLike) {
                await deleteLikeArticle({ href: article.href });
              } else {
                await likeArticle({ href: article.href });
              }

              await refetchIsLike();
              await refetchLikeCount();
            }}
          >
            {isLoading || deleteLoading || isLikeLoading ? (
              <div className="flex justify-center">
                <LoadingLottie />
              </div>
            ) : !isLike ? (
              "저장하기 📌"
            ) : (
              "삭제하기 🗑"
            )}
          </button>
        </div>
        {" "}
      </div>
      <div
        css={css`
          margin-top: 5px;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
        `}
      >
        <div>
          {article.tag.map((tag) => {
            return <div key={tag}>#{tag}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export const SkeletonArticleView = () => {
  return (
    <div
      css={css`
        padding-bottom: 5px;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          font-size: 16px;
          gap: 10px;
        `}
      >
        <Skeleton width={30} height={30} variant={"rectangular"} />
        <div
          css={css`
            gap: 8px;
            display: flex;
            align-items: center;
          `}
        >
          <Skeleton width={100} />
          <span
            css={css`
              font-size: 12px;
              opacity: 0.5;
            `}
          >
            <Skeleton width={80} />
          </span>
        </div>
      </div>
      <div
        className={
          "group-hover:text-blue500 transition-all duration-300 group-hover:drop-shadow-xl"
        }
        css={css`
          margin-top: 10px;
          font-size: 26px;
          font-weight: bold;
        `}
      >
        <Skeleton width={200} />
      </div>
      <div />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          font-size: 0.875rem;
          line-height: 1.5;
          height: 3.9375rem;
          width: 100%;
        `}
      >
        <div className={"flex flex-row gap-x-[10px]"}>
          <Skeleton width={"100%"} />
        </div>
        <div className={"flex flex-row gap-x-[10px]"}>
          <Skeleton width={"100%"} />
        </div>
        <div className={"flex flex-row gap-x-[10px]"}>
          <Skeleton width={"100%"} />
        </div>
      </div>
      <div
        className={c(
          "flex w-full justify-end text-[12px] opacity-50 hover:underline"
        )}
      >
        <Skeleton width={100} />
      </div>
      <div
        css={css`
          margin-top: 5px;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          opacity: 0.5;
        `}
      >
        <div className={"flex flex-row gap-x-[10px]"}>
          <div className={"flex items-center gap-1"}>
            <Skeleton width={60} height={20} />
          </div>
          <div className={"flex items-center gap-1"}>
            <Skeleton width={40} height={20} />
          </div>
        </div>
        <div
          css={css`
            display: flex;
            gap: 10px;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: row;
              align-items: center;
              gap: 5px;
            `}
          >
            <Skeleton width={36} height={16} />
          </div>
          <button className="flex flex-row items-center gap-[3px] hover:underline">
            <Skeleton width={36} height={16} variant="text" />
          </button>
        </div>
      </div>
    </div>
  );
};
