const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
  e2e:
  {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);

      return config;
    },
    baseUrl: 'https://app-dev.waffyapp.com',
    specPattern: "cypress/e2e/features/*.feature",
    chromeWebSecurity: false,
    env: {
      apiUrl: 'https://dev-api.waffyapp.com/api',
      snapshotOnly: true,
      requestMode: true,
    },
    experimentalSessionAndOrigin: true,
    experimentalSourceRewriting: true
  },
  watchForFileChanges: false,
  defaultCommandTimeout: 20000,
  viewportWidth: 1280,
  viewportHeight: 720,
}
  ,);
