import PostsContainer from '@/board/containers/PostsContainer';
import AdminOnlyContainer from '@/member/containers/AdminOnlyContainer';
const PostsPage = () => {
  return (
    <AdminOnlyContainer>
      <PostsContainer />
    </AdminOnlyContainer>
  );
};

export default PostsPage;
