const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

require('dotenv').config();

module.exports = defineConfig({
  projectId: 'dvsq5u',
  reporter: 'cypress-mochawesome-reporter',
   reporterOptions: {
    reportDir: 'cypress/reports', // JSON dosyalarının kaydolacağı klasör
    overwrite: false,             // her spec kendi json'unu bırakır
    html: false,                  // mochawesome'ın kendisinin HTML üretmesini kapatıyoruz (biz marge ile üreteceğiz)
    json: true
    },

  e2e: {
    baseUrl: "https://www.kitapsepeti.com",
    specPattern: "cypress/e2e/features/**/*.feature",
    supportFile: 'cypress/support/e2e.js',

    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    defaultCommandTimeout: 10000,


    async setupNodeEvents(on, config) {
    // Step definitions yollarını buraya plugin'e tanıtıyoruz:
    await addCucumberPreprocessorPlugin(on, config, {
    stepDefinitions: "cypress/e2e/step-definitions/**/*.{js,ts}"
    });

    require('cypress-mochawesome-reporter/plugin')(on);

  // **** Canlı ortamdaki bot korumasını (401 hatasını) engellemek için eklenen kısım:
    on('before:browser:launch', (browser = {}, launchOptions) => {
      if (browser.name === 'chrome' || browser.name === 'edge') {
        launchOptions.args.push('--disable-blink-features=AutomationControlled');
        launchOptions.args.push('--no-sandbox');
        launchOptions.args.push('--disable-infobars');
      }
      return launchOptions;
    });

    config.env.VALID_EMAIL = process.env.VALID_EMAIL;
    config.env.VALID_PASSWORD = process.env.VALID_PASSWORD;

    on("file:preprocessor", createBundler({
      plugins: [createEsbuildPlugin(config)],
    }));

    return config;
  },  
  },
});