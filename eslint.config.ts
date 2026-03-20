import { globalIgnores } from 'eslint/config';
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import pluginOxlint from 'eslint-plugin-oxlint';
import skipFormatting from 'eslint-config-prettier/flat';

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  ...pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  skipFormatting,
);

// import js from "@eslint/js";
// import globals from "globals";
// import pluginVue from "eslint-plugin-vue";
// import { defineConfig } from "eslint/config";

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs,vue}"],
//     plugins: { js },
//     extends: ["js/recommended"],
//     languageOptions: { globals: globals.browser }
//   },
//   pluginVue.configs["flat/essential"],
// ]);
