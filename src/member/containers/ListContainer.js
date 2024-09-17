'use client';
import React, { useLayoutEffect } from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';

const ListContainer = () => {
  const { setMenuCode, setSubMenuCode } = getCommonActions();

  useLayoutEffect(() => {
    setMenuCode('member');
    setSubMenuCode('list');
  }, [setMenuCode, setSubMenuCode]);

  return <h1>회원 목록</h1>;
};

export default React.memo(ListContainer);
