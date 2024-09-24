import AdminOnlyContainer from '@/member/containers/AdminOnlyContainer';
import GroupUpdateContainer from '@/counseling/group/GroupUpdateContainer';

const GroupRegisterPage = ({ params }) => {
  return (
    <AdminOnlyContainer>
      <GroupUpdateContainer params={params} />
    </AdminOnlyContainer>
  );
};

export default GroupRegisterPage;
