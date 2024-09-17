'use client';
import React from 'react';
import LoginContainer from './LoginContainer';
import { getUserStates } from '@/commons/contexts/UserInfoContext';

const MemberOnlyContainer = ({ children }) => {
  const { isAdmin } = getUserStates();
  return isAdmin ? children : <LoginContainer />;
};

export default React.memo(MemberOnlyContainer);
