import { useTagAll } from '../../api';
import { css } from '@emotion/react';
import { Tag } from '@./common';
import c from 'classnames';
import { TinkleOpacity } from '../Css';
import { useSelectedTagList } from '../../states/SelectedTagList';

export const SideTagNavigation = () => {
  const { has, remove, add } = useSelectedTagList();
  const { data: tagList } = useTagAll();

  return (
    <div>
      <div
        css={css`
          margin-bottom: 30px;
        `}
      >
        <span
          className={'font-bold'}
          css={css`
            font-size: 30px;
          `}
        >
          Tag
        </span>
        <div className="text-[12px] font-extralight text-red-600">
          태그 기능은 현재 지원하지 않습니다.
        </div>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          max-height: 300px;
          flex-wrap: wrap;
          gap: 10px;
        `}
      >
        {tagList?.map((tag, index) => {
          const isActive = has(tag);
          return (
            <SideTagItem
              name={tag.name}
              key={index}
              active={isActive}
              onClick={() => {
                if (isActive) {
                  return remove(tag);
                }
                add(tag);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

type SideTagItemProps = Pick<Tag, 'name'> & {
  onClick: () => void;
  active: boolean;
};
export const SideTagItem = (props: SideTagItemProps) => {
  return (
    <button
      css={css`
        min-width: fit-content;
        display: flex;
        flex-direction: row;
        gap: 3px;
        font-size: 14px;
        cursor: pointer;

        ${TinkleOpacity}
        &.active {
          font-weight: bolder;
        }
      `}
      className={c({ active: props.active })}
      onClick={() => props.onClick()}
    >
      <span css={css``}>#{props.name}</span>
    </button>
  );
};
