import AdminOnlyContainer from '@/member/containers/AdminOnlyContainer';
import ApplicationListContainer from '@/counseling/containers/ApplicationListContainer';

const counselingPage = ({ searchParams }) => {
  return (
    <AdminOnlyContainer>
      <ApplicationListContainer searchParams={searchParams} />
    </AdminOnlyContainer>
  );
};

export default counselingPage;
