import type { NuxtConfig } from "@nuxt/types";
import type { Configuration as WebpackConfiguration } from "webpack";
import path from "path";
import Mode from "frontmatter-markdown-loader/mode";

const builtAt = new Date().toISOString();
import ja from "./locales/ja.json";
import en from "./locales/en.json";

const buildLocale = process.env.BUILD_LOCALE || "en";
const productionUrlEn = "https://steftheartist.netlify.app";
const productionUrlJa = "https://haiji.co";

const baseUrl = buildLocale === "en" ? productionUrlEn : productionUrlJa;

const orderedWorks = [
  "projects",
  "clientwork"
].join(",");

const config: NuxtConfig = {
  buildModules: ["@nuxt/typescript-build"],
  target: "static",
  env: {
    baseUrl,
    buildLocale,
    productionUrlEn,
    productionUrlJa,
    orderedWorks
  },
  head: {
    title: "Haiji Haiiro / Namika Hamasaki",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
      },
      { name: "msapplication-TileColor", content: "#ffffff" },
      {
        name: "msapplication-TileImage",
        content: "/favicons/mstile-144x144.png"
      },
      { name: "theme-color", content: "#c1c1c1" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@haiji505" },
      { property: "og:type", content: "profile" },
      { property: "og:updated_time", content: builtAt },
    ],
    link: [
      {
        rel: "icon",
        type: "image/png",
        href: "/favicons/favicon-16x16.png",
        sizes: "16x16"
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/favicons/favicon-32x32.png",
        sizes: "32x32"
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/favicons/favicon-48x48.png",
        sizes: "48x48"
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/favicons/android-chrome-96x96.png",
        sizes: "96x96"
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/favicons/android-chrome-192x192.png",
        sizes: "192x192"
      },
      {
        rel: "apple-touch-icon",
        href: "/favicons/apple-touch-icon-57x57.png",
        sizes: "57x57"
      },
      {
        rel: "apple-touch-icon",
        href: "/favicons/apple-touch-icon-60x60.png",
        sizes: "60x60"
      },
      {
        rel: "apple-touch-icon",
        href: "/favicons/apple-touch-icon-72x72.png",
        sizes: "72x72"
      },
      {
        rel: "apple-touch-icon",
        href: "/favicons/apple-touch-icon-76x76.png",
        sizes: "76x76"
      },
      {
        rel: "apple-touch-icon",
        href: "/favicons/apple-touch-icon-114x114.png",
        sizes: "114x114"
      },
      {
        rel: "apple-touch-icon",
        href: "/favicons/apple-touch-icon-120x120.png",
        sizes: "120x120"
      },
      {
        rel: "apple-touch-icon",
        href: "/favicons/apple-touch-icon-144x144.png",
        sizes: "144x144"
      },
      {
        rel: "apple-touch-icon",
        href: "/favicons/apple-touch-icon-152x152.png",
        sizes: "152x152"
      },
      {
        rel: "apple-touch-icon",
        href: "/favicons/apple-touch-icon-180x180.png",
        sizes: "180x180"
      },
      {
        rel: "mask-icon",
        type: "image/png",
        href: "/favicons/safari-pinned-tab.svg",
        color: "#c1c1c1"
      },
      { rel: "manifest", href: "/manifest.json" }
    ],
    script: [{ src: "https://use.typekit.net/sff2rot.js", defer: true }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#555555" },
  /*
   ** Build configuration
   */
  css: ["node_modules/normalize.css/normalize.css"],
  build: {
    extend (config: WebpackConfiguration): void {
      // remove existing url-loader settings once, for giving svg specific loader
      const rule = config.module.rules.find(r => r.test.toString().includes("(png|jpe?g|gif|svg|webp|avif)"));
      config.module.rules.splice(config.module.rules.indexOf(rule), 1);

      config.module.rules.push(
        {
          test: /\.md$/,
          loader: "frontmatter-markdown-loader",
          include: path.resolve(__dirname, "contents"),
          options: {
            mode: [Mode.HTML, Mode.VUE_COMPONENT],
            vue: {
              root: "dmd"
            }
          }
        },
        {
          ...rule,
          test: /\.(png|jpe?g|gif|webp|avif)$/
        },
        {
          test: /\.svg$/,
          loader: "svg-sprite-loader",
          include: path.resolve(__dirname, "assets/icons")
        }
      );
    },
    postcss: {
      plugins: {
        "postcss-import": {
          resolve (id: string, baseDir: string): string {
            return (/^~/.test(id)) ? path.resolve(__dirname, id.replace("~", ".")) : path.resolve(baseDir, id);
          }
        },
      },
      preset: {
        stage: 0,
        preserve: false,
        importFrom: {
          customProperties: {
            "--skyhai": "#DFE0E0",
            "--soba": "#D8D8D8",
            "--konezumi": "#555555",
            "--nibihai": "#393B44"
          }
        }
      }
    }
  },
  plugins: [
    "~/plugins/lazyload.js",
    "~/plugins/carousel.client.js"
  ],
  modules: [
    [
      "@nuxtjs/google-analytics",
      {
        id: process.env.GOOGLE_ANALYTICS_TRACKING_ID || "UA-XXXXXXXX-X"
      }
    ],
    [
      "nuxt-i18n",
      {
        detectBrowserLanguage: false,
        seo: false,
        parsePages: false,
        locales: [
          { code: "en", domain: "namika.hmsk.co" },
          { code: "ja", domain: "haiji.co" }
        ],
        defaultLocale: buildLocale,
        vueI18n: {
          fallbackLocale: "en",
          messages: {
            en,
            ja
          }
        },
        silentTranslationWarn: true
      }
    ]
  ],
  generate: {
    fallback: true,
    subFolders: false,
    routes: ["/about", "/contact"].concat(orderedWorks.split(",").map(w => `/work/${w}`))
  }
};

export default config;
