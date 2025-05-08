<script setup lang="ts">
import { ModuleProseA } from "#components";
import type { PageLink } from "@nuxt/ui-pro";
import { joinURL } from "ufo";

const Img = (props: any) => h("img", props);

const { toc } = useAppConfig();
const site = useSiteConfig();

const slug = useRoute().params.slug;
const { data } = await useFetch(`/api/modules/${slug}`, {
  key: `module-${slug}`,
});
if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Module not found",
    fatal: true,
  });
}

const links = computed((): PageLink[] =>
  [
    {
      label: "Documentation",
      icon: "i-ph-book-bookmark",
      href: data?.value?.documentation,
      target: "_blank",
    },
    {
      label: "GitHub",
      icon: "i-ph-github-logo",
      href: data?.value?.github,
      target: "_blank",
    },
    {
      label: "NPM",
      icon: "i-ph-package",
      href: `https://www.npmjs.com/package/${data?.value?.npm}`,

      target: "_blank",
    },
  ].filter((x) => x.href)
);

useSeoMeta({
  title: data?.value?.repo,
  description: data?.value?.description,
  ogDescription: data?.value?.description,
  ogTitle: data?.value?.repo,
  ogImage: joinURL(site.url, "/social-card.png"),
  twitterImage: joinURL(site.url, "/social-card.png"),
});
</script>

<template>
  <UMain v-if="data">
    <UContainer>
      <UPageHeader :ui="{ headline: 'mb-8' }" :description="data?.description">
        <template #headline>
          <UButton
            :ui="{ base: 'px-0' }"
            to="/modules"
            label="Other modules"
            icon="i-ph-arrow-left"
            variant="link"
          />
        </template>

        <template #title>
          <div class="flex items-center gap-4">
            <UAvatar :src="data?.icon" :alt="data?.name" :ui="{ root: 'rounded-sm' }" size="lg" />

            <p class="first-letter:uppercase">{{ data?.repo }}</p>
          </div>
        </template>

        <template #links>
          <UBadge v-if="data?.official" label="Official" icon="i-ph-check" variant="subtle" />

          <UBadge
            v-if="data?.sponsor"
            label="Sponsor"
            icon="i-ph-heart"
            color="info"
            variant="subtle"
          />
        </template>
      </UPageHeader>

      <UPage>
        <UPageBody>
          <ContentRenderer
            v-if="data?.readme"
            :value="data.readme"
            :components="{ img: Img, a: ModuleProseA }"
          />
        </UPageBody>

        <template #right>
          <UContentToc :title="toc?.title" :links="data?.readme?.toc?.links">
            <template #top>
              <div class="hidden lg:block">
                <UPageLinks title="Links" :links />

                <USeparator class="my-6" />
              </div>
            </template>
          </UContentToc>
        </template>
      </UPage>
    </UContainer>
  </UMain>
</template>
