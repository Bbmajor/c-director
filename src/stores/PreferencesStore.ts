import { defineStore } from 'pinia';
import { type Option, type OptionKey } from '@/types';

const $postfix = ':cdirector';

export const usePreferencesStore = defineStore('preferences', {
  state: () => ({
    options: [
      {
        value: 'invertImage',
        text: 'Invert Image',
        setting: true,
        disabled: false,
      },
      {
        value: 'markdownEnabled',
        text: 'Enable Markdown',
        setting: true,
        disabled: false,
      },
    ] as Option[],
  }),

  getters: {
    settings(state) {
      return state.options.map(selected) as OptionKey[];
    },

    invertImage() {
      const selected = this.settings as OptionKey[];
      return selected.includes('invertImage');
    },

    markdownEnabled() {
      const selected = this.settings as OptionKey[];
      return selected.includes('markdownEnabled');
    },
  },

  actions: {
    open() {
      // load settings from local storage
      for (const option of this.options) {
        option.setting = getFromStorage(option);
      }
    },

    setSettings(settings: OptionKey[]) {
      const storage = globalThis.localStorage;
      for (const option of this.options) {
        // set option settings
        option.setting = settings.includes(option.value);
        // persist to local storage
        if (option.setting) {
          storage.setItem(option.value + $postfix, 'true');
        } else {
          storage.removeItem(option.value + $postfix);
        }
      }
    },
  },
});

function getFromStorage(option: Option) {
  return globalThis.localStorage.getItem(option.value + $postfix) == 'true';
}

function selected(option: Option) {
  if (option.setting) return option.value;
}
