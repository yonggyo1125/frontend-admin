import requestData from '@/commons/libs/requestData';
import saveProcess from '@/commons/libs/saveProcess';
export const getCounselors = (skey) =>
  requestData(`/member/admin/counselors?skey=${skey}`);

export const registerGroupProgram = (form) =>
  saveProcess('/counseling/admin/counseling', 'POST', form);

export const updateGroupProgram = (form) =>
  saveProcess('/counseling/admin/counseling', 'PATCH', form);

export const getList = (search) => {
  search = search ?? {};

  const qs = [];

  for (const [k, v] of Object.entries(search)) {
    qs.push(`${k}=${v}`);
  }

  let url = '/counseling/counseling';
  if (qs.length > 0) url += `?${qs.join('&')}`; //검색 조건이 있을 때

  return requestData(url);
};
