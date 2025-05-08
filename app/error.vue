<script setup lang="ts">
import type { NuxtError } from "#app";
import type { ContentNavigationItem } from "@nuxt/content";
import { mapContentNavigation } from "@nuxt/ui-pro/runtime/utils/content.js";

defineProps<{
  error: NuxtError;
}>();

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
    active: false,
  },
  {
    label: "Modules",
    to: "/modules",
  },
  {
    label: "Roadmap",
    to: "/#roadmap",
    active: false,
  },
  {
    label: "Releases",
    to: "https://github.com/AntelopeJS/antelopejs/releases",
    target: "_blank",
  },
]);

useHead({
  htmlAttrs: {
    lang: "en",
  },
});

useSeoMeta({
  title: "Page not found",
  description: "We are sorry but this page could not be found.",
});

const { data: files } = useLazyAsyncData("search", () => queryCollectionSearchSections("docs"), {
  server: false,
});
</script>

<template>
  <UApp>
    <AppHeader :links />

    <UError :error="error" />

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch :files="files" :navigation="nav" />
    </ClientOnly>
  </UApp>
</template>
