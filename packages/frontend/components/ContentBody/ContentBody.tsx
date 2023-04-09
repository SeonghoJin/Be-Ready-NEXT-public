import { css } from '@emotion/react';
import c from 'classnames';
import { useCompanyArticle, useTime } from '../../api';
import { useSelectedHeaderItem } from '../../states/SelectedHeaderItem';
import { useSelectedTagList } from '../../states/SelectedTagList';
import { useSelectedCompanyList } from '../../states/SelectedCompanyList';
import {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { LoadingLottie } from '../LoadingLottie';
import { ArticleView, SkeletonArticleView } from '../ArticleView';
import { debounce } from 'lodash';
import dayjs from 'dayjs';

type Props = {
  sideNavigation?: ReactNode | undefined;
};

export const ContentBody = ({ sideNavigation }: PropsWithChildren<Props>) => {
  const { item: headerItem } = useSelectedHeaderItem();
  const { item: tagList } = useSelectedTagList();
  const { item: companyList } = useSelectedCompanyList();

  const {
    data: articleList,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useCompanyArticle({
    company: companyList.map((company) => company.name),
    tag: tagList.map((tag) => tag.name),
    contentHeader: headerItem,
  });

  const hasItem =
    articleList?.pages?.flatMap((_) => _.article)?.length ?? false;
  const [showSkeleton, setShowSkeleton] = useState(false);

  const debounceF = useMemo(() => {
    return debounce(() => {
      setShowSkeleton(true);
    }, 300);
  }, []);

  useEffect(() => {
    if (!isFetching) {
      setShowSkeleton(false);
      return;
    }
    debounceF();
    return () => {
      setShowSkeleton(false);
      debounceF.cancel();
    };
  }, [debounceF, isFetching]);

  const { data: timeCollection } = useTime('batch');

  const batchDate = useMemo(() => {
    if (!timeCollection) {
      return null;
    }

    return dayjs(timeCollection.value ?? '').format('YYYY-MM-DD HH:MM');
  }, [timeCollection]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        gap: 100px;
      `}
    >
      <div className={c('w-full max-w-[652px]')}>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 20px;
          `}
        >
          <div className={'text-right text-[14px] font-light'}>
            {batchDate ? `최근업데이트: ${batchDate}` : ''}
          </div>
          {articleList?.pages
            ?.flatMap((page) => page.article)
            ?.map((article) => {
              return (
                <ArticleView
                  key={article.href}
                  summarize3={article.summarize3}
                  title={article.title}
                  company={article.company}
                  createdAt={article.createdAt}
                  like={article.like}
                  href={article.href}
                  viewCount={article.viewCount}
                  tag={article.tag}
                  description={article.description}
                />
              );
            })}
          <div
            className={c(
              {
                hidden:
                  !isFetching || isFetchingNextPage || hasItem || !showSkeleton,
                block:
                  (isFetching && !isFetchingNextPage && !hasItem) ||
                  showSkeleton,
              },
              'flex flex-col gap-[20px]'
            )}
          >
            <SkeletonArticleView />
          </div>
          <button
            className={c(
              'flex',
              'items-center justify-center',
              'h-[50px]',
              'bg-[rgb(242,_244,_246)]',
              'rounded-[10px]',
              'shadow-sm',
              'font-light',
              { [c('hidden')]: !hasNextPage && !isFetchingNextPage }
            )}
            disabled={!hasNextPage || isFetchingNextPage}
            onClick={() => {
              fetchNextPage();
            }}
          >
            {isFetchingNextPage ? <LoadingLottie /> : '가져오기'}
          </button>
          <div
            className={c(
              {
                ['hidden']: hasNextPage || isFetching || isFetchingNextPage,
                ['block']: !hasNextPage,
              },
              'flex',
              'items-center justify-center',
              'h-[50px]',
              'w-full'
            )}
          >
            블로그를 모두 확인하셨어요! 🎉🎉
          </div>
        </div>
      </div>
      <div
        className={'hidden lg:block'}
        css={css`
          width: 369px;
        `}
      >
        {sideNavigation}
      </div>
    </div>
  );
};
