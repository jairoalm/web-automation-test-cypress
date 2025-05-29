import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";

export default defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: "allure-results", // Define o diretório para os resultados do Allure
      });
      return config;      
    },
  },
  projectId: "u6uqez",
  video: true
})