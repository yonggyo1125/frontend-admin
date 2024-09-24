'use client';
import React, { useLayoutEffect } from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';

const ApplicationListContainer = ({ searchParams }) => {
  const { setMenuCode, setSubMenuCode } = getCommonActions();

  useLayoutEffect(() => {
    setMenuCode('counseling');
    setSubMenuCode('apply');
  }, [setMenuCode, setSubMenuCode]);

  return <h1>신청 목록...</h1>;
};

export default React.memo(ApplicationListContainer);
