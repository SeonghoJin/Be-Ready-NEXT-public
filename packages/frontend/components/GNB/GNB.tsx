import { css } from '@emotion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { c } from '../../util';
import { ContentContainer } from '../ContentContainer/ContentContainer';
import { ExtendInterativeHeaderSpan } from '../ExtendInterativeHeaderSpan copy';
import { LogoTitle } from '../LogoTitle/LogoTitle';
import Image from 'next/image';
import { useState } from 'react';
import { useUser } from '../../context/AuthProvider';
import { FRONT_CONFIG } from '@./front-config';

export const Gnb = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const user = useUser();

  const { text, href } = (() => {
    if (user) {
      return {
        text: 'Sign out',
        href: `${FRONT_CONFIG.CORE_BASE_URL}/auth/logout`,
      };
    }
    return {
      text: 'Sign in',
      href: `/login`,
    };
  })();
  return (
    <nav
      className={'sticky top-0 z-[1] h-fit w-full !bg-slate-50'}
      css={css`
        border-bottom: 1px solid var(--grey200);
      `}
    >
      <div className={'flex h-[80px] flex-row items-center'}>
        <ContentContainer>
          <div className="flex w-full items-center justify-between">
            <div className="flex h-full flex-row items-center gap-x-[4px]">
              <Link href={'/'}>
                <LogoTitle />
              </Link>
              <Link href={'/tag'}>
                <ExtendInterativeHeaderSpan
                  className={c({
                    active: router.pathname === '/tag',
                  })}
                >
                  Tag
                </ExtendInterativeHeaderSpan>
              </Link>
              <Link href={'/company'}>
                <ExtendInterativeHeaderSpan
                  className={c({
                    active: router.pathname === '/company',
                  })}
                >
                  Company
                </ExtendInterativeHeaderSpan>
              </Link>
            </div>
            <div className="xsm:block hidden">
              <Link href={href}>
                <ExtendInterativeHeaderSpan
                  className={c({
                    active: router.pathname === '/login',
                  })}
                >
                  {text}
                </ExtendInterativeHeaderSpan>
              </Link>
            </div>
            <button
              className="xsm:hidden hover:bg-opacityGray rounded-[8px] p-[5px]"
              onClick={() => {
                setIsOpen((_) => !_);
              }}
            >
              <Image
                src={'/icon/dropdown.png'}
                alt={'dropdown'}
                width={30}
                height={30}
              />
            </button>
          </div>
        </ContentContainer>
      </div>
      <div
        className={c(
          'xsm:hidden overflow-hidden transition-all duration-[300ms] ease-in-out',
          {
            ['max-h-[80px]']: isOpen,
            ['max-h-[0px]']: !isOpen,
          }
        )}
      >
        <div className={'p-[12px_20px]'}>
          <Link
            href={href}
            className={
              ' flex w-full items-center justify-center rounded-[8px] bg-blue-500 p-[12px_15px] font-bold text-white hover:bg-blue-700'
            }
          >
            {text}
          </Link>
        </div>
      </div>
    </nav>
  );
};
