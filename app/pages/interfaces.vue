<script setup lang="ts">
import { joinURL } from "ufo";

const { data: page } = await useAsyncData("interfaces", () =>
  queryCollection("interfaces").first()
);
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const title = `${page.value?.title} ${page.value?.title_suffix}`;
const description = page.value?.description;
const site = useSiteConfig();

useSeoMeta({
  titleTemplate: "%s",
  title,
  description,
  ogDescription: description,
  ogTitle: title,
  ogImage: joinURL(site.url, "/social-card.png"),
  twitterImage: joinURL(site.url, "/social-card.png"),
});
</script>

<template>
  <div>
    <div class="relative">
      <HeroBackground
        direction="bottom-to-top"
        class="absolute inset-x-0 bottom-0 z-0 text-(--ui-primary)"
      />

      <UContainer>
        <UPageSection :links="page?.links" :description="page?.description">
          <template #title>
            <span>{{ page?.title }}</span>
            <span class="block text-(--ui-primary)">
              {{ page?.title_suffix }}
            </span>
          </template>
        </UPageSection>
      </UContainer>
    </div>

    <div class="my-16">
      <UPageSection
        v-for="(item, index) in page?.interfaces"
        :key="index"
        :title="item.title"
        :description="item.description"
        :links="item.links"
        :features="item.features"
        :ui="{
          title: 'lg:text-4xl',
          wrapper: 'lg:py-16 lg:pr-16',
          container: 'lg:py-0',
        }"
        orientation="horizontal"
        reverse
      >
        <div class="flex h-full items-center">
          <NuxtImg
            :src="item.thumbnail"
            :alt="`Template ${index} thumbnail`"
            class="h-auto w-full rounded object-cover"
            loading="lazy"
          />
        </div>
      </UPageSection>
    </div>
  </div>
</template>
