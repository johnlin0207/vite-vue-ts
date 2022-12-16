import { defineStore } from 'pinia';
import { UserInfo } from '@/utils/interface';

interface State {
  userInfo: UserInfo;
}

export const useUserStore = defineStore('user', {
  state: (): State => ({ userInfo: { roles: [] } }),
  actions: {
    set(r: UserInfo) {
      this.userInfo = r;
    },
  },
});
