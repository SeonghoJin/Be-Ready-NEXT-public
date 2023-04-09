import { useTagAll } from '../../api';
import { css } from '@emotion/react';
import c from 'classnames';
import { useSelectedTagList } from '../../states/SelectedTagList';

type Props = {};

export const TagNavigation = (props: Props) => {
  const { data: tagList } = useTagAll();
  const { add: addTag, has: hasTag, remove: removeTag } = useSelectedTagList();
  return (
    <div
      css={css`
        display: flex;
        padding: 12px 0px;
        gap: 20px;
        position: sticky;
        align-items: center;
        justify-content: center;
        background-color: white;
        border-bottom: 1px solid var(--grey200);
      `}
    >
      {tagList?.map((tag) => {
        const isActive = hasTag(tag);
        return (
          <div
            key={tag.name}
            className={c({
              active: isActive,
            })}
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              transition: color 0.1s ease-in 0s;
              padding: 10px;
              border-radius: 10px;
              opacity: 0.5;

              &:hover {
                opacity: 0.7;
              }

              &.active {
                opacity: 1;
              }

              &:hover > span {
                font-weight: bold;
              }

              &:hover div {
                opacity: 0.6;
              }

              &.active div {
                opacity: 1;
              }
            `}
            onClick={() => {
              if (isActive) {
                return removeTag(tag);
              }
              addTag(tag);
            }}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 7px;
                align-items: center;
              `}
            >
              <span
                className={c({
                  active: isActive,
                })}
                css={css`
                  &.active {
                    font-weight: bold;
                  }
                `}
              >
                #{tag.name}
              </span>
              <div
                css={css`
                  width: calc(100% - 10px);
                  height: 2px;
                  border-radius: 4px;
                  background-color: black;
                  opacity: 0;
                `}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
