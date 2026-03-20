/* -- src\stores\ApplicationStore.js -- */
import { defineStore } from 'pinia';
import { type ApplicationEndPoint } from '@/types';

export const useApplicationStore = defineStore('application', {
  state: () => ({
    endPoint: {} as ApplicationEndPoint,

    appVersion: globalThis.__APP_VERSION__,
  }),

  getters: {
    companyName: (state) => {
      return state.endPoint.companyName;
    },
    edition: (state) => {
      return state.endPoint.edition;
    },
    name: (state) => {
      return state.endPoint.name;
    },
    version: (state) => {
      return state.endPoint.version;
    },
  },

  actions: {
    open(endPoint: ApplicationEndPoint) {
      this.endPoint = endPoint;
      this.endPoint.open();
    },

    close() {
      this.endPoint.close();
      this.endPoint = {} as ApplicationEndPoint;
    },
  },
});
