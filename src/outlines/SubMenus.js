'use client';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import Link from 'next/link';
import { getCommonStates } from '@/commons/contexts/CommonContext';

const SubMenuBox = styled.nav`
  box-shadow: 2px 2px 10px ${({ theme }) => theme.colors.gray};
  height: 55px;
  border-radius: 5px;
  margin-bottom: 20px;
  display: flex;
  a {
    line-height: 55px;
    padding: 0 20px;
    font-size: ${({ theme }) => theme.fontSizes.medium}px;
  }
  a.on {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const SubMenus = () => {
  const { menuCode, subMenuCode } = getCommonStates();

  const subMenus = useMemo(() => getSubMenus(menuCode), [menuCode]);
  return (
    subMenus &&
    subMenus.length > 0 && (
      <SubMenuBox>
        {subMenus.map(({ code, name, url }) => (
          <Link
            key={code}
            href={url}
            className={classNames({ on: code === subMenuCode })}
          >
            {name}
          </Link>
        ))}
      </SubMenuBox>
    )
  );
};

function getSubMenus(menuCode) {
  switch (menuCode) {
    case 'member': // 회원관리
      return [{ code: 'list', name: '회원목록', url: '/member/list' }];
    case 'board': // 게시판 관리
      return [
        { code: 'list', name: '게시판 목록', url: '/board/list' },
        { code: 'register', name: '게시판 등록', url: '/board/register' },
        { code: 'posts', name: '게시글 관리', url: '/board/posts' },
      ];
    case 'counseling': // 집단상담 관리
      return [
        {
          code: 'group',
          name: '집단 상담 프로그램 목록',
          url: '/counseling/group',
        },
        {
          code: 'register',
          name: '집단 상담 프로그램 등록',
          url: '/counseling/group/register',
        },
      ];

    case 'application': // 상담이력 관리
      return [
        { code: 'details', name: '상담 접수 목록', url: '/counseling/details' },
      ];
    default:
      return [];
  }
}

export default React.memo(SubMenus);
