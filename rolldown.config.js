import { defineConfig } from 'rolldown';

export default defineConfig({
  input: 'src/main.js',
  external: ['cantabile-js', 'markdowndeep'],
  output: {
    cleanDir: true,
    dir: 'Root.webfolder',
    codeSplitting: {
      groups: [
        {
          name: 'bootstrap-vendor',
          test: /node_modules[\\/]bootstrap(.*)/,
          priority: 20,
        },
        {
          name: 'vendor',
          test: /node_modules/,
          priority: 10,
        },
        {
          name: 'common',
          minShareCount: 2,
          minSize: 10000,
          priority: 5,
        },
      ],
    },
  },
});
