'use client';
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { StyledInput } from '@/commons/components/inputs/StyledInput';
import { StyledButton } from '@/commons/components/buttons/StyledButton';
import { useTranslation } from 'react-i18next';
import FileUpload from '@/commons/components/FileUpload';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  Image,
  ImageInsert,
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

const FormBox = styled.form`
  dl {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    dt {
      width: 200px;
      font-weight: bold;
    }

    dd {
      flex-grow: 1;
      max-width: 100%;
      padding: 5px;
    }
  }

  /* CKEditor 스타일 조정 */
  .ck-editor {
    border: 1px solid #ccc; /* CKEditor 테두리 */
    border-radius: 4px; /* 둥근 모서리 */
    padding: 10px; /* 패딩 추가 */
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1); /* 음영 효과 */
    margin-top: 5px; /* 레이블과 CKEditor 간 간격 */
  }
`;

const GroupRegisterForm = ({ form, errors, onChange, onSubmit }) => {
  const { t } = useTranslation();
  const [editor, setEditor] = useState(null);

  const insertImageCallback = useCallback(
    (url) => {
      editor.execute('insertImage', { source: url });
    },
    [editor],
  );

  return (
    <FormBox autoComplete="off" onSubmit={onSubmit}>
      <dl>
        <dt>{t('집단상담 프로그램번호')}</dt>
        <dd>
          <StyledInput
            type="text"
            name="gno"
            value={form?.gno}
            onChange={onChange}
          />
        </dd>
      </dl>
      <dl>
        <dt>{t('집단상담 프로그램명')}</dt>
        <dd>
          <StyledInput
            type="text"
            name="gname"
            value={form?.gname}
            onChange={onChange}
          />
        </dd>
      </dl>
      <dl>
        <dt>{t('집단상담 프로그램 설명')}</dt>
        <dd>
          <CKEditor
            editor={ClassicEditor}
            config={{
              toolbar: {
                items: ['undo', 'redo', '|', 'bold', 'italic'],
              },
              plugins: [
                Bold,
                Essentials,
                Italic,
                Mention,
                Paragraph,
                Undo,
                Image,
                ImageInsert,
              ],
            }}
            data={form?.gdes || ''}
            onReady={(editor) => setEditor(editor)}
            onChange={(_, editor) => {
              onChange({
                target: { name: 'gdes', value: editor.getData() },
              });
            }}
          />
          <FileUpload
            imageOnly={true}
            gid={form?.gid}
            color="primary"
            callback={insertImageCallback}
          >
            {t('이미지_첨부')}
          </FileUpload>
        </dd>
      </dl>

      <dl>
        <dt>{t('상담사명')}</dt>
        <dd>
          <StyledInput
            type="text"
            name="cname"
            value={form?.cname}
            onChange={onChange}
          />
        </dd>
      </dl>
      <dl>
        <dt>{t('상담사 이메일')}</dt>
        <dd>
          <StyledInput
            type="text"
            name="cemail"
            value={form?.cemail}
            onChange={onChange}
          />
        </dd>
      </dl>
      <dl>
        <dt>{t('집단상담 프로그램 신청 시작일')}</dt>
        <dd>
          <StyledInput
            type="date"
            name="sdate"
            value={form?.sdate}
            onChange={onChange}
          />
        </dd>
      </dl>
      <dl>
        <dt>{t('집단상담 프로그램 신청 종료일')}</dt>
        <dd>
          <StyledInput
            type="date"
            name="edate"
            value={form?.edate}
            onChange={onChange}
          />
        </dd>
      </dl>
      <dl>
        <dt>{t('상담일시')}</dt>
        <dd>
          <StyledInput
            type="text"
            name="date"
            value={form.date}
            onChange={onChange}
          />
        </dd>
      </dl>
      <dl>
        <dt>{t('인원')}</dt>
        <dd>
          <StyledInput
            type="text"
            name="peopleCount" // 이름 지정
            onChange={onChange}
          />
        </dd>
      </dl>
      <StyledButton variant="primary">{t('등록')}</StyledButton>
    </FormBox>
  );
};

export default React.memo(GroupRegisterForm);
