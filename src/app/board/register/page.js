import UpdateContainer from '@/board/containers/UpdateContainer';
import AdminOnlyContainer from '@/member/containers/AdminOnlyContainer';
const BoardRegisterPage = ({ params }) => {
  return (
    <AdminOnlyContainer>
      <UpdateContainer params={params} />
    </AdminOnlyContainer>
  );
};

export default BoardRegisterPage;
