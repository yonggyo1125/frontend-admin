'use client';
import React, { useLayoutEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import BoardForm from '../components/BoardForm';

const UpdateContainer = ({ params }) => {
  const { bid } = params;
  const { t } = useTranslation();
  const { setMenuCode, setSubMenuCode, setMainTitle } = getCommonActions();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  useLayoutEffect(() => {
    setMenuCode('board');
    setSubMenuCode('register');
    setMainTitle(bid ? t('게시판_수정') : t('게시판_등록'));
  }, [setSubMenuCode, setMenuCode, setMainTitle, t, bid]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  }, []);

  const onToggle = useCallback((name, value) => {
    setForm((form) => ({ ...form, [name]: value }));
  }, []);
  return (
    <BoardForm
      form={form}
      errors={errors}
      onChange={onChange}
      onToggle={onToggle}
      onSubmit={onSubmit}
    />
  );
};

export default React.memo(UpdateContainer);
