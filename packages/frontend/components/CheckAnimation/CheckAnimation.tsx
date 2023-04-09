import Lottie from 'react-lottie-player';
import CheckMarkAnimation from '../../public/lottie/checkmark.json';
import { css } from '@emotion/react';

type Props = {};

export const CheckAnimation = (props: Props) => {
  return (
    <Lottie
      animationData={CheckMarkAnimation}
      play
      loop={false}
      css={css`
        width: 40px;
        height: 40px;
      `}
    />
  );
};
