import { css } from '@emotion/react';
import { Gnb } from '../components/GNB/GNB';
import { GNF } from '../components/GNF';
import KakaoLoginImage from '../public/images/kakao_login_image.png';
import Image from 'next/image';
import Link from 'next/link';
import NoSSR from '../components/NoSSR';
import { AuthProvider } from '../context/AuthProvider';
import { FRONT_CONFIG } from '@./front-config';
import { GetServerSideProps } from 'next';
import { getServerSideProps as customServerSideProps } from '../util/getServerSideProps';

export default function Login({ user }) {
  return (
    <AuthProvider user={user}>
      <div
        css={css`
          display: flex;
        `}
      >
        <div
          css={css`
            flex: 1;
          `}
        >
          <Gnb />
          <div className={'m-[50px_auto] w-[360px]'}>
            <div className={'itesm-center flex flex-col justify-center'}>
              <p className={'text-center text-[40px]'}>Sign in</p>
              <p className={'text-center text-[14px]'}>
                Be Ready NEXT는 OAuth 로그인만 지원합니다.
              </p>
              <div
                className={
                  'mt-[40px] flex flex-col items-center justify-center gap-[15px]'
                }
              >
                <NoSSR>
                  <Link
                    href={`${FRONT_CONFIG.CORE_BASE_URL}/auth/kakao`}
                    className={
                      'flex items-center rounded-[4px] bg-[#fee601] p-[0_12px]'
                    }
                  >
                    <Image
                      src={KakaoLoginImage}
                      alt={'kakao_login'}
                      height={45}
                    />
                  </Link>
                </NoSSR>
                {/* <button className={'flex items-center'}>
                <Image
                  src={NaverLoginImage
                  alt={'naver_login'}
                  className={'bg-cover'}
                  height={45}
                />
              </button> */}
              </div>
            </div>
          </div>
          <GNF />
        </div>
      </div>
    </AuthProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const side = (await customServerSideProps(context)) as {
    props: {
      user: any;
    };
  };

  if (side.props.user) {
    return {
      redirect: {
        statusCode: 301,
        destination: '/',
      },
    };
  }

  return side;
};
