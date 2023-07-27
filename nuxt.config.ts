// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: ["@nuxt/image", "@pinia/nuxt"],

  components: ["~/components", "~/components/common"],

  imports: {
    dirs: ["stores", "composables/**"],
  },

  runtimeConfig: {
    public: {
      baseURL:
        process.env.BASE_URL ||
        "https://test-task-frontend-2023.slava.digital/",
    },
  },

  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },
});
