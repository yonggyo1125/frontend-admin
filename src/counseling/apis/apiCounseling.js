import requestData from '@/commons/libs/requestData';

export const getCounselors = (skey) =>
  requestData(`/member/admin/counselors?skey=${skey}`);
