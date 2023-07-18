import path from "path";
import fs from "fs";
import MonacoEditorWebpackPlugin from "monaco-editor-webpack-plugin";

const rootPath = "/";

export default {
  ssr: false,
  target: "static",
  // development certs for https://localhost

  /*
    environments
     */

  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_description || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    link: [
      { rel: "stylesheet", type: "text/css", href: "", id: "dark-mode" },

      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,500;0,700;0,900;1,100;1,200&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css",
      },
    ],
    style: [
      {
        cssText: "dark-mode-custom-style",
        type: "text/css",
        id: "dark-mode-custom-style",
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  styleResources: {
    scss: [],
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    // { src: "~plugins/kendoui", mode: "client" }, //uncomment this to enable kendo plugin from parent app
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    // "bootstrap-vue/nuxt",
    "@nuxtjs/style-resources",
    "@nuxtjs/pwa",
    "D:\\Vince Live\\demo-child", // path of child app in local drive
  ],

  /*
   ** Disabling Bootstrap Compiled CSS
   *  (we are including them explicitly in main.scss!)
   */
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */

    parallel: true,
    cache: true,
    babel: {
      presets: ["@nuxt/babel-preset-app"],
      compact: true,
    },
    postcss: null,
    extend(config) {
      if (rootPath) {
        config.output.publicPath = rootPath + "_nuxt/";
      }
      return config;
    },
    node: {
      fs: false,
    },
    plugins: [
      new MonacoEditorWebpackPlugin({
        languages: ["json", "typescript", "javascript"],
      }),
    ],
  },
  /*
   ** Build configuration
   */
  generate: {
    /*
     ** You can extend webpack config here
     */
    babel: {
      presets: ["@nuxt/babel-preset-app"],
      plugins: ["istanbul"],
      compact: true,
    },
    devtools: !!rootPath, // use devtools on PR's
    extend(config) {
      if (rootPath) {
        config.output.publicPath = rootPath + "_nuxt/";
        return config;
      }
    },
    node: {
      fs: false,
    },
  },

  router: {
    // try to load base path from branch
    base: rootPath,
    linkActiveClass: "active",
    linkExactActiveClass: "active",
    middleware: [],
  },
};
