import UpdateContainer from '@/board/containers/UpdateContainer';
import AdminOnlyContainer from '@/member/containers/AdminOnlyContainer';
const BoardRegisterPage = () => {
  return (
    <AdminOnlyContainer>
      <UpdateContainer />
    </AdminOnlyContainer>
  );
};

export default BoardRegisterPage;
