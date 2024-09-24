'use client';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const FormBox = styled.form``;

const BoardForm = ({ form, errors, onSubmit, onChange, onToggle }) => {
  const { t } = useTranslation();
  return (
    <FormBox onSubmit={onSubmit} autoComplete="off">
      <dl>
        <dt>{t('게시판_아이디')}</dt>
        <dd></dd>
      </dl>
    </FormBox>
  );
};

export default React.memo(BoardForm);
