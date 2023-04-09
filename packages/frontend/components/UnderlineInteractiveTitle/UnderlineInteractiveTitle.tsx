import { css } from '@emotion/react';
import c from 'classnames';
import { PropsWithChildren } from 'react';

type Props = {
  active: boolean;
};
export const UnderlineInteractiveTitle = (props: PropsWithChildren<Props>) => {
  return (
    <div
      className={c(
        { [c('opacity-100')]: props.active },
        'flex',
        'flex-col',
        'items-center',
        'opacity-70',
        'cursor-pointer',
        'group'
      )}
    >
      {props.children}
      <div
        className={c(
          'h-[2px] w-[calc(100%-10px)] rounded-[4px] bg-black opacity-0 group-hover:opacity-50',
          { 'font-bold !opacity-100': props.active }
        )}
      />
    </div>
  );
};
