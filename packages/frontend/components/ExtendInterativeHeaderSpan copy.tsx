import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { c } from '../util';
import { InterativeHeaderSpan } from './InterativeHeaderSpan';

export function ExtendInterativeHeaderSpan(
  props: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
) {
  const { className = '', ...rest } = props;
  return (
    <InterativeHeaderSpan
      {...rest}
      className={c('text-[18px] leading-[1] lg:text-[22px]', className)}
    />
  );
}
