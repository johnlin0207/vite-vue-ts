import { Res } from '@/utils/interface';

const isSuccess = (resData: Res) => {
  return resData.status === '0';
};

export { isSuccess };
