import { css } from '@emotion/react';
import { c } from 'packages/frontend/util';
import {
  headerItemList,
  useSelectedHeaderItem,
} from '../../states/SelectedHeaderItem';
import { UnderlineInteractiveTitle } from '../UnderlineInteractiveTitle/UnderlineInteractiveTitle';

export const ContentHeader = () => {
  const { set, item: headerItem } = useSelectedHeaderItem();
  return (
    <div
      css={css`
        display: flex;
        gap: 20px;
        flex-direction: row;
      `}
    >
      {headerItemList.map((_) => {
        const active = headerItem === _.name;
        return (
          <button
            key={_.name}
            onClick={() => {
              set(_.name);
            }}
          >
            <UnderlineInteractiveTitle active={active}>
              <span
                className={c({
                  'font-bold': active,
                })}
                css={css`
                  font-size: 24px;
                `}
              >
                {_.name}
              </span>
            </UnderlineInteractiveTitle>
          </button>
        );
      })}
    </div>
  );
};
