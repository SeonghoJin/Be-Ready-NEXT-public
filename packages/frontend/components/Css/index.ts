import { css } from '@emotion/react';

export const TinkleOpacity = css`
  opacity: 0.5;

  &.active,
  &:hover.active {
    opacity: 1;
  }

  &:hover {
    opacity: 0.75;
  }
`;
