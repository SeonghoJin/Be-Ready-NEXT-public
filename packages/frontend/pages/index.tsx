import React from 'react';
import { Gnb } from '../components/GNB/GNB';
import { css } from '@emotion/react';
import { ContentContainer } from '../components/ContentContainer/ContentContainer';
import { ContentHeader } from '../components/ContentHeader/ContentHeader';
import { ContentBody } from '../components/ContentBody/ContentBody';
import { SideCompanyNavigation } from '../components/SideCompanyNavigation/SideCompanyNavigation';
import { SideTagNavigation } from '../components/SideTagNavigation/SideTagNavigation';
import NoSSR from '../components/NoSSR';
import { GNF } from '../components/GNF';
import { AuthProvider } from '../context/AuthProvider';
export { getServerSideProps } from '../util/getServerSideProps';

export function Index({ user }) {
  return (
    <AuthProvider user={user}>
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <div
          css={css`
            flex: 1;
          `}
        >
          <Gnb />
          <ContentContainer>
            <div className={'mt-[10px] mb-[20px]'}>
              <NoSSR>
                <ContentHeader />
              </NoSSR>
            </div>
            <ContentBody
              sideNavigation={
                <div className={'sticky top-[calc(60px+50px)]'}>
                  <SideCompanyNavigation />
                  <div
                    css={css`
                      margin-top: 50px;
                    `}
                  />
                  <SideTagNavigation />
                </div>
              }
            />
          </ContentContainer>
        </div>
        <GNF />
      </div>
    </AuthProvider>
  );
}

export default Index;
