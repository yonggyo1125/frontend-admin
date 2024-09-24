'use client';
import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import Pagination from '@/commons/components/Pagination';
import GroupListItems from '../components/GroupListItems';
import { getList } from '../apis/apiCounseling';

const GroupListContainer = ({ searchParams }) => {
  const { setMenuCode, setSubMenuCode, setMainTitle } = getCommonActions();
  searchParams.page = searchParams.page ?? 1;

  const { t } = useTranslation();
  const [items, setItems] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [search, setSearch] = useState(searchParams);

  useLayoutEffect(() => {
    setMenuCode('counseling');
    setSubMenuCode('group');
    setMainTitle(t('집단_상담_프로그램_목록'));
  }, [setMenuCode, setSubMenuCode, setMainTitle, t]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getList(search);
        if (data) {
          setItems(data.items);
          setPagination(data.pagination);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [search]);

  const onPageClick = useCallback((page) => {
    setSearch((search) => ({ ...search, page }));
  }, []);

  if (!items || items.length === 0) {
    return <h1>로딩....</h1>;
  }

  return (
    <>
      <GroupListItems items={items} />
      <Pagination pagination={pagination} onClick={onPageClick} />
    </>
  );
};

export default React.memo(GroupListContainer);
