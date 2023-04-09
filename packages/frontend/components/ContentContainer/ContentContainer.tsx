import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';

type Props = {};
export const ContentContainer = (props: PropsWithChildren<Props>) => {
  return (
    <div className="flex w-full flex-row items-center justify-center">
      <div className={'max-w-[230px] lg:w-[calc(25vw+-184.75px)]'} />
      <div className={'h-full flex-1 p-[5px_15px] lg:p-[0_30px]'}>
        {props.children}
      </div>
    </div>
  );
};
