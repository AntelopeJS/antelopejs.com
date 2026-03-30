<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";
import { mapContentNavigation } from "@nuxt/ui-pro/runtime/utils/content.js";

const { data: navigation } = await useAsyncData("navigation", () =>
  queryCollectionNavigation("docs")
);
const nav = computed<ContentNavigationItem[]>(
  () => mapContentNavigation(navigation.value || []).at(0)?.children as ContentNavigationItem[]
);
provide("navigation", nav);

const links = computed(() => [
  {
    label: "Docs",
    to: "/docs/get-started",
    children: [
      {
        label: "Get Started",
        description: "Introduction to Antelopejs",
        to: "/docs/get-started",
        icon: "i-ph-rocket-launch",
      },
      {
        label: "Concepts",
        description: "Core concepts behind Antelopejs architecture.",
        to: "/docs/concepts",
        icon: "i-ph-lightbulb",
      },
      {
        label: "Module Development",
        description: "Create, test, and publish Antelopejs modules.",
        to: "/docs/module-development",
        icon: "i-ph-hammer",
      },
      {
        label: "Guides",
        description: "Practical guides for building with Antelopejs",
        to: "/docs/guides",
        icon: "i-ph-book-open",
      },
      {
        label: "CLI",
        description: "Command line interface for Antelopejs",
        to: "/docs/cli",
        icon: "i-ph-terminal",
      },
      {
        label: "Community",
        description: "Community and support for Antelopejs",
        to: "/docs/community",
        icon: "i-ph-users",
      },
    ],
    active: false,
  },
  {
    label: "Interfaces",
    to: "/interfaces",
  },
  {
    label: "Modules",
    to: "/modules",
  },
  {
    label: "Releases",
    to: "https://github.com/AntelopeJS/antelopejs/releases",
    target: "_blank",
  },
]);

const { data: files } = useLazyAsyncData("search", () => queryCollectionSearchSections("docs"), {
  server: false,
});

const { seo } = useAppConfig();
const { fetchList } = useModules();

useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en",
  },
});

useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  ogSiteName: seo?.siteName,
  twitterCard: "summary_large_image",
});

onNuxtReady(() => {
  fetchList();
});
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <AppHeader :links />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <LazyAppFooter :links hydrate-never />

    <ClientOnly>
      <LazyUContentSearch :files="files" :navigation="navigation" />
    </ClientOnly>
  </UApp>
</template>
