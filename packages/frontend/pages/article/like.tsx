import { css } from '@emotion/react';
import { AuthProvider } from '../../context/AuthProvider';
import { Gnb } from '../../components/GNB/GNB';
import { GNF } from '../../components/GNF';
import { ContentContainer } from '../../components/ContentContainer/ContentContainer';

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
            <div className={'mt-[10px] mb-[20px]'}>Like</div>
          </ContentContainer>
        </div>
        <GNF />
      </div>
    </AuthProvider>
  );
}

export default Index;
