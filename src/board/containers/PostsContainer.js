'use client';
import React, { useLayoutEffect } from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';

const PostsContainer = () => {
  const { setMenuCode, setSubMenuCode } = getCommonActions();
  useLayoutEffect(() => {
    setMenuCode('board');
    setSubMenuCode('posts');
  }, [setSubMenuCode, setMenuCode]);

  return <h1>게시판 등록/수정</h1>;
};

export default React.memo(PostsContainer);
