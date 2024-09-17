import ListContainer from '@/board/containers/ListContainer';
import AdminOnlyContainer from '@/member/containers/AdminOnlyContainer';
const BoardListPage = () => {
  return (
    <AdminOnlyContainer>
      <ListContainer />
    </AdminOnlyContainer>
  );
};

export default BoardListPage;
