// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: ["@nuxt/image"],

  components: ["~/components", "~/components/common"],

  runtimeConfig: {
    public: {
      baseURL:
        process.env.BASE_URL ||
        "https://test-task-frontend-2023.slava.digital/",
    },
  },
});
