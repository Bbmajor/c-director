/* -- src\stores\ApplicationStore.js -- */
import { defineStore } from 'pinia';

export const useApplicationStore = defineStore('application', {
  state: () => ({
    endPoint: null,
  }),

  getters: {
    appVersion: () => {
      return '0.0.0';
    }, // process.env.PACKAGE_VERSION ||

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
    open(endPoint) {
      this.endPoint = endPoint;
      this.endPoint.open();
    },

    close({ commit, state }) {
      this.endPoint.close();
      this.endPoint = null;
    },
  },
});
