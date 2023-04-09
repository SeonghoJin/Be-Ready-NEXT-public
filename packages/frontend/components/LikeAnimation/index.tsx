import Lottie from 'react-lottie-player';
import { css } from '@emotion/react';
import cand from './70547-like.json';

type Props = {
  active: boolean;
};
export const LikeAnimation = ({ active }: Props) => {
  return (
    <Lottie
      animationData={cand}
      play={active}
      loop={false}
      css={css`
        width: 20px;
        height: 20px;
      `}
    />
  );
};
