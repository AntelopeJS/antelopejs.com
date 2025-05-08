import pkg from "./package.json";
import yaml from "@rollup/plugin-yaml";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui-pro",
    "@nuxt/content",
    "nuxt-og-image",
    "nuxt-llms",
    "@vueuse/nuxt",
    // Local modules
    "./modules/modules-sync/module",
  ],

  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    public: {
      version: pkg.version,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://antelopejs.com",
      siteName: "Antelopejs Documentation",
      siteDescription: "Comprehensive documentation for the Antelopejs framework",
      language: "en",
    },
  },

  content: {
    build: {
      markdown: {
        toc: {
          searchDepth: 1,
        },
      },
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-07-11",

  nitro: {
    prerender: {
      routes: ["/"],
      // crawlLinks: true,
    },
  },

  vite: {
    plugins: [yaml()],
  },

  eslint: {
    config: {
      stylistic: {
        semi: true,
        braceStyle: "1tbs",
        quotes: "double",
        commaDangle: "only-multiline",
        quoteProps: "as-needed",
      },
    },
  },

  uiPro: {
    license: process.env.NUXT_UI_PRO_LICENSE,
  },

  icon: {
    customCollections: [
      {
        prefix: "antelope",
        dir: "./app/assets/icons",
        normalizeIconName: true,
      },
    ],
  },

  app: {
    head: {
      titleTemplate: "%s - Antelopejs Documentation",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Comprehensive documentation for the Antelopejs framework",
        },
        { name: "format-detection", content: "telephone=no" },
        { name: "theme-color", content: "#ffffff" },
        // Open Graph
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Antelopejs Documentation" },
        { property: "og:locale", content: "en_US" },
        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@antelopejs" },
        { name: "twitter:creator", content: "@antelopejs" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: process.env.NUXT_PUBLIC_SITE_URL },
      ],
    },
  },

  ogImage: {
    enabled: true,
    fonts: ["Inter:400", "Inter:700"],
    defaults: {
      component: "OgImage",
      width: 1200,
      height: 630,
      cacheMaxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
    },
  },

  llms: {
    domain: "https://antelopejs.com/",
    title: "Antelopejs Documentation",
    description: "Comprehensive documentation for the Antelopejs framework",
    full: {
      title: "Antelopejs Documentation",
      description: "This is the full documentation for the Antelopejs framework",
    },
    sections: [
      {
        title: "Get Started",
        contentCollection: "docs",
        contentFilters: [{ field: "path", operator: "LIKE", value: "/docs/get-started%" }],
      },
      {
        title: "Interfaces",
        contentCollection: "docs",
        contentFilters: [{ field: "path", operator: "LIKE", value: "/docs/interfaces%" }],
      },
      {
        title: "Guides",
        contentCollection: "docs",
        contentFilters: [{ field: "path", operator: "LIKE", value: "/docs/guides%" }],
      },
      {
        title: "CLI",
        contentCollection: "docs",
        contentFilters: [{ field: "path", operator: "LIKE", value: "/docs/cli%" }],
      },
      {
        title: "Community",
        contentCollection: "docs",
        contentFilters: [{ field: "path", operator: "LIKE", value: "/docs/community%" }],
      },
    ],
  },
});
