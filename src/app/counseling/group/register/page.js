import AdminOnlyContainer from '@/member/containers/AdminOnlyContainer';
import GroupListContainer from '@/counseling/containers/GroupListContainer';

const GroupRegisterPage = ({ searchParams }) => {
  return (
    <AdminOnlyContainer>
      <GroupListContainer searchParams={searchParams} />
    </AdminOnlyContainer>
  );
};

export default GroupRegisterPage;
