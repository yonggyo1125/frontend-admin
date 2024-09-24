'use client';
import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { useTranslation } from 'react-i18next';
import GroupRegisterForm from '../components/GroupRegisterForm';
import { deleteFile } from '@/commons/libs/apiFile';
import {
  getCounselors,
  registerGroupProgram,
  updateGroupProgram,
} from '../apis/apiCounseling';

const GroupUpdateContainer = ({ params }) => {
  const { setMenuCode, setSubMenuCode, setMainTitle } = getCommonActions();
  const { cNo } = params;
  const { t } = useTranslation();

  const router = useRouter();

  useLayoutEffect(() => {
    setMenuCode('counseling');
    setSubMenuCode(cNo ? 'update' : 'register');
    setMainTitle(
      cNo ? t('집단_상담_프로그램_수정') : t('집단_상담_프로그램_등록'),
    );
  }, [setMenuCode, setSubMenuCode, cNo, setMainTitle, t]);

  const [form, setForm] = useState({
    cNo,
    gid: '' + Date.now(),
    counselingLimit: 1,
  });
  const [errors, setErrors] = useState({});
  const [counselors, setCounselors] = useState([]);
  const [skey, setSkey] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const counselors = await getCounselors(skey);
        setCounselors(counselors);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [skey]);

  const onChange = useCallback((e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'skey') {
      setSkey(value);
    } else {
      setForm((form) => ({ ...form, [name]: value }));
    }
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // 유효성 검사
      const requiredFields = {
        counselingName: t('프로그램명을_입력해주세요.'),
        counselingDes: t('설명을_입력하세요.'),
        counselorName: t('상담사를_선택하세요.'),
        counselorEmail: t('상담사를_선택하세요.'),
      };
      const _errors = {};
      let hasErrors = false;
      for (const [field, message] of Object.entries(requiredFields)) {
        if (!form[field]?.trim()) {
          _errors[field] = _errors[field] ?? [];
          _errors[field].push(message);
          hasErrors = true;
        }
      }

      setErrors(_errors);
      if (hasErrors) {
        return;
      }

      // 추가, 수정 처리
      (async () => {
        try {
          cNo
            ? await updateGroupProgram(form)
            : await registerGroupProgram(form);

          router.replace('/counseling/group');
        } catch (err) {
          const message = err.message;
          setErrors(
            typeof message === 'string' ? { global: [message] } : message,
          );
          console.error(err);
        }
      })();
    },
    [form, cNo, router, t],
  );

  const onFileDelete = useCallback(
    (seq) => {
      if (!confirm(t('정말_삭제하겠습니까?'))) {
        return;
      }

      (async () => {
        try {
          await deleteFile(seq);

          let editorImages = form?.editorImages;
          if (!editorImages) {
            return;
          }

          editorImages = editorImages.filter((file) => file.seq !== seq);
          setForm((form) => ({ ...form, editorImages }));
        } catch (err) {
          console.error(err);
        }
      })();
    },
    [form, t],
  );

  const onClick = useCallback((counselor) => {
    setForm((form) => ({
      ...form,
      counselorName: counselor.userName,
      counselorEmail: counselor.email,
      counselor,
    }));
  }, []);

  return (
    <GroupRegisterForm
      form={form}
      errors={errors}
      onChange={onChange}
      onSubmit={onSubmit}
      onFileDelete={onFileDelete}
      counselors={counselors}
      onClick={onClick}
    />
  );
};

export default React.memo(GroupUpdateContainer);
