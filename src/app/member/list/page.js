import AdminOnlyContainer from '@/member/containers/AdminOnlyContainer';
import ListContainer from '@/member/containers/ListContainer';
const MemberListPage = () => {
  return (
    <AdminOnlyContainer>
      <ListContainer />
    </AdminOnlyContainer>
  );
};

export default MemberListPage;
