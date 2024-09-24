'use client';
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { StyledInput } from '@/commons/components/inputs/StyledInput';
import { StyledButton } from '@/commons/components/buttons/StyledButton';
import { useTranslation } from 'react-i18next';
import FileUpload from '@/commons/components/FileUpload';
import FileItems from '@/commons/components/FileItems';
import { IoIosRadioButtonOn, IoIosRadioButtonOff } from 'react-icons/io';
import StyledMessage from '@/commons/components/StyledMessage';
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

const GroupRegisterForm = ({
  form,
  errors,
  onChange,
  onSubmit,
  onFileDelete,
  counselors,
  onClick,
}) => {
  const { t } = useTranslation();
  const [editor, setEditor] = useState(null);

  const insertImageCallback = useCallback(
    (files) => {
      if (!files || files.length === 0) {
        return;
      }

      const source = files.map((file) => file.fileUrl);

      editor.execute('insertImage', { source });

      const editorImages = form?.editorImages ?? [];
      editorImages.push(...files);
      onChange({ target: { name: 'editorImages', value: editorImages } });
    },
    [editor, form, onChange],
  );

  return (
    <FormBox autoComplete="off" onSubmit={onSubmit}>
      {form?.cNo && (
        <dl>
          <dt>{t('집단상담 프로그램번호')}</dt>
          <dd>{form.cNo}</dd>
        </dl>
      )}
      <dl>
        <dt>{t('집단상담 프로그램명')}</dt>
        <dd>
          <StyledInput
            type="text"
            name="counselingName"
            value={form?.counselingName ?? ''}
            onChange={onChange}
          />
          <StyledMessage variant="danger">
            {errors?.counselingName}
          </StyledMessage>
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
            data={form?.counselingDes ?? ''}
            onReady={(editor) => setEditor(editor)}
            onChange={(_, editor) => {
              onChange({
                target: { name: 'counselingDes', value: editor.getData() },
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
          {form?.editorImages && (
            <FileItems files={form.editorImages} onDelete={onFileDelete} />
          )}
          <StyledMessage variant="danger">
            {errors?.counselingDes}
          </StyledMessage>
        </dd>
      </dl>

      <dl>
        <dt>{t('상담사_선택')}</dt>
        <dd>
          <StyledInput
            type="text"
            name="skey"
            onChange={onChange}
            placeholder={t('검색어를_입력하세요.')}
          />
          {counselors &&
            counselors.length > 0 &&
            counselors.map((c) => (
              <span key={c.seq} onClick={() => onClick(c)}>
                {c.seq === form?.counselor?.seq ? (
                  <IoIosRadioButtonOn />
                ) : (
                  <IoIosRadioButtonOff />
                )}{' '}
                {c.userName}({c.email}/{c.subject})
              </span>
            ))}
        </dd>
      </dl>
      <dl>
        <dt>{t('상담사명')}</dt>
        <dd>
          <StyledInput
            type="text"
            name="counselorName"
            value={form?.counselorName ?? ''}
            readOnly
          />
          <StyledMessage variant="danger">
            {errors?.counselorName}
          </StyledMessage>
        </dd>
      </dl>
      <dl>
        <dt>{t('상담사 이메일')}</dt>
        <dd>
          <StyledInput
            type="text"
            name="counselorEmail"
            value={form?.counselorEmail ?? ''}
            readOnly
          />
          <StyledMessage variant="danger">
            {errors?.counselorEmail}
          </StyledMessage>
        </dd>
      </dl>
      <dl>
        <dt>{t('집단상담 프로그램 신청 시작일')}</dt>
        <dd>
          <StyledInput
            type="date"
            name="reservationSdate"
            value={form?.reservationSdate ?? ''}
            onChange={onChange}
          />
        </dd>
        <StyledMessage variant="danger">
          {errors?.reservationSdate}
        </StyledMessage>
      </dl>
      <dl>
        <dt>{t('집단상담 프로그램 신청 종료일')}</dt>
        <dd>
          <StyledInput
            type="date"
            name="reservationEdate"
            value={form?.reservationEdate ?? ''}
            onChange={onChange}
          />
          <StyledMessage variant="danger">
            {errors?.reservationEdate}
          </StyledMessage>
        </dd>
      </dl>
      <dl>
        <dt>{t('상담일시')}</dt>
        <dd>
          <StyledInput
            type="text"
            name="counselingDate"
            value={form?.counselingDate ?? ''}
            onChange={onChange}
          />
          <StyledMessage variant="danger">
            {errors?.counselingDate}
          </StyledMessage>
        </dd>
      </dl>
      <dl>
        <dt>{t('인원')}</dt>
        <dd>
          <select
            name="counselingLimit"
            onChange={onChange}
            value={form?.counselingLimit ?? 1}
          >
            {[...new Array(10).keys()].map((i) => (
              <option key={`counselingLimit_${i + 1}`} value={i + 1}>{`${
                i + 1
              }명`}</option>
            ))}
          </select>
          <StyledMessage variant="danger">
            {errors?.counselingLimit}
          </StyledMessage>
        </dd>
      </dl>
      <StyledButton variant="primary">{t('등록')}</StyledButton>
      <StyledMessage variant="danger">{errors?.global}</StyledMessage>
    </FormBox>
  );
};

export default React.memo(GroupRegisterForm);
