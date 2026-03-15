/* -- src\stores\PreferencesStore.js -- */
import { defineStore } from 'pinia';

const $postfix = ':cdirector';
const $re = new RegExp('^(.*)' + $postfix);

const preferences = [
  ['invertImage', 'false'],
  ['markdownEnabled', 'false'],
];

export const usePreferencesStore = defineStore('preferences', {
  state: () => ({
    prefs: new Map(preferences),
  }),

  getters: {
    options: () => {
      return [
        { text: 'Invert Image', value: 'invertImage' },
        { text: 'Enable Markdown', value: 'markdownEnabled' },
      ];
    },

    settings: (state) => {
      let settings = [];
      for (let [key, value] of state.prefs.entries()) {
        if (value == 'true') {
          settings.push(key);
        }
      }
      return settings;
    },

    invertImage: (state) => {
      return state.prefs.get('invertImage') == 'true';
    },

    markdownEnabled: (state) => {
      return state.prefs.get('markdownEnabled') == 'true';
    },
  },

  actions: {
    open() {
      // load preferences
      let newPrefs = new Map(preferences);
      for (let i = 0; i < localStorage.length; i++) {
        var matches = localStorage.key(i).match($re);
        if (matches !== null) newPrefs.set(matches[1], 'true');
      }
      this.prefs = newPrefs;
    },

    setSettings(settings) {
      let newPrefs = new Map(preferences);
      for (let i = 0; i < settings.length; i++) {
        newPrefs.set(settings[i], 'true');
      }
      for (let [key, value] of newPrefs) {
        if (value == 'true') {
          localStorage.setItem(key + $postfix, value);
        } else {
          localStorage.removeItem(key + $postfix);
        }
      }
      this.prefs = newPrefs;
    },
  },
});
