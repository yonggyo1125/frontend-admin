'use client';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const ListItem = ({ item, className }) => {
  console.log(item);
  return (
    <li className={className}>
      <Link href={`/counseling/group/update/${item.cno}`}>
        {item.counselingName}
      </Link>
    </li>
  );
};

const StyledListItem = styled(ListItem)``;

const GroupListItems = ({ items }) => {
  return (
    items &&
    items.length > 0 &&
    items.map((item) => (
      <StyledListItem key={`counseling_${item.cno}`} item={item} />
    ))
  );
};

export default React.memo(GroupListItems);
