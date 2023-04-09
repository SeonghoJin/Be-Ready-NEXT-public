import { Logo } from '../Logo/Logo';
import { css } from '@emotion/react';
import { ExtendInterativeHeaderSpan } from '../ExtendInterativeHeaderSpan copy';
import { MetaData } from '../SeoHeader/metata';

export const LogoTitle = () => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
      `}
    >
      <ExtendInterativeHeaderSpan
        className={'flex flex-row items-center justify-center gap-[10px]'}
      >
        <Logo />
        <span className="xsm:block hidden">{MetaData.title}</span>
        <span className="xsm:hidden">{MetaData.short_title}</span>
      </ExtendInterativeHeaderSpan>
    </div>
  );
};
