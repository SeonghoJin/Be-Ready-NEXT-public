import { ContentContainer } from '../components/ContentContainer/ContentContainer';
import { Gnb } from '../components/GNB/GNB';
import { GNF } from '../components/GNF';
import { SideTagNavigation } from '../components/SideTagNavigation/SideTagNavigation';
import { AuthProvider } from '../context/AuthProvider';
export { getServerSideProps } from '../util/getServerSideProps';

export default function Tag({ user }) {
  return (
    <AuthProvider user={user}>
      <div>
        <Gnb />
        <ContentContainer>
          <div className="mt-[10px]">
            <SideTagNavigation />
          </div>
        </ContentContainer>
        <GNF />
      </div>
    </AuthProvider>
  );
}
