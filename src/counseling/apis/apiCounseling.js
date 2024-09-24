import requestData from '@/commons/libs/requestData';
import saveProcess from '@/commons/libs/saveProcess';
export const getCounselors = (skey) =>
  requestData(`/member/admin/counselors?skey=${skey}`);

export const registerGroupProgram = (form) =>
  saveProcess('/counseling/admin/counseling', 'POST', form);

export const updateGroupProgram = (form) =>
  saveProcess('/counseling/admin/counseling', 'PATCH', form);
