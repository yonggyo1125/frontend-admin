import AdminOnlyContainer from '@/member/containers/AdminOnlyContainer';
import GroupListContainer from '@/counseling/group/GroupListContainer';

const CounselingGroupPage = ({ searchParams }) => {
  return (
    <AdminOnlyContainer>
      <GroupListContainer searchParams={searchParams} />
    </AdminOnlyContainer>
  );
};

export default CounselingGroupPage;
