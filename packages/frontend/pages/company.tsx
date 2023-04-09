import { Gnb } from '../components/GNB/GNB';
import { ContentContainer } from '../components/ContentContainer/ContentContainer';
import { SideCompanyNavigation } from '../components/SideCompanyNavigation/SideCompanyNavigation';
import { GNF } from '../components/GNF';
import { AuthProvider } from '../context/AuthProvider';
export { getServerSideProps } from '../util/getServerSideProps';

export default function CompanyPage({ user }) {
  return (
    <AuthProvider user={user}>
      <div className="">
        <Gnb />
        <ContentContainer>
          <div className={'mt-[10px]'}>
            <SideCompanyNavigation />
          </div>
        </ContentContainer>
        <GNF />
      </div>
    </AuthProvider>
  );
}
