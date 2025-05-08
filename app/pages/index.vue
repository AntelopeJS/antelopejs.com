<script setup lang="ts">
import { joinURL } from "ufo";

const { data: page } = await useAsyncData("index", () => queryCollection("landing").first());
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const { filteredModules } = useModules();
const site = useSiteConfig();

const slicedModules = computed(() => filteredModules.value.slice(0, 6));

useSeoMeta({
  title: page.value?.seo?.title,
  titleTemplate: null,
  ogTitle: page.value?.seo?.title,
  description: page.value?.seo?.description,
  ogDescription: page.value?.seo?.description,
  ogImage: joinURL(site.url, "/social-card.png"),
  twitterImage: joinURL(site.url, "/social-card.png"),
});

const md = "npx @antelopejs/core project init <project-name>";
</script>

<template>
  <UMain v-if="page">
    <!-- Hero -->
    <section class="relative overflow-hidden">
      <HeroBackground
        direction="bottom-to-top"
        class="absolute inset-x-0 bottom-0 z-0 text-(--ui-primary)"
      />

      <div class="hidden lg:block">
        <UColorModeImage
          light="/images/light/antelope-code.svg"
          dark="/images/dark/antelope-code.svg"
          alt="Code Illustration"
          class="absolute bottom-0 left-1/2 -z-10 h-[580px] w-auto object-cover object-left-bottom"
        />
      </div>

      <NuxtImg
        src="/meteor.png"
        alt="Meteor"
        class="absolute inset-0 -z-20 size-full object-cover object-bottom opacity-30"
      />

      <UPageHero
        :ui="{
          container: 'relative',
          description: 'text-balance',
        }"
        orientation="horizontal"
      >
        <template #title>
          <span class="block">
            {{ page.hero?.title }}
          </span>
          <span class="block text-(--ui-primary)">
            {{ page.hero?.title_suffix }}
          </span>
        </template>

        <template #description>
          {{ page.hero?.description }}
        </template>

        <template #links>
          <div class="w-full pb-6">
            <UPageFeature
              v-for="(feature, index) in page.hero?.features"
              :key="`feature-${index}`"
              :description="feature?.description"
              :icon="feature?.icon"
              :to="feature?.to"
              :target="feature?.target"
            />
          </div>

          <UButton
            v-for="(link, index) in page.hero?.links"
            :key="`link-${index}`"
            :to="link?.to"
            :icon="link?.icon"
            :label="link?.label"
            :color="index === 0 ? 'primary' : 'neutral'"
            :variant="index === 0 ? 'solid' : 'outline'"
            :target="link?.target"
            size="xl"
          />
        </template>
      </UPageHero>
    </section>

    <UContainer>
      <!-- CLI -->
      <UPageSection :title="page.cli?.title" :description="page.cli?.description">
        <div class="flex flex-col items-center justify-center gap-2">
          <ProsePre :code="md">
            {{ md }}
          </ProsePre>
          <UButton
            label="More commands"
            to="/docs/cli/introduction"
            icon="i-ph-arrow-right"
            variant="subtle"
            trailing
            size="xl"
          />
        </div>
      </UPageSection>
    </UContainer>

    <!-- Features -->
    <UContainer>
      <UPageSection :title="page.features?.title" :description="page.features?.description">
        <div class="grid gap-12 lg:grid-cols-3">
          <div
            v-for="(feature, index) in page.features?.items"
            :key="`feature-${index}`"
            class="flex items-start gap-4 p-4 sm:gap-8 lg:flex-col lg:items-center"
          >
            <div
              class="shadow-primary-500/40 inline-flex items-center justify-center rounded-xl border border-(--ui-border) bg-(--ui-bg-muted) p-4 shadow-lg sm:p-6"
            >
              <UIcon :name="feature?.icon" class="size-6 text-(--ui-primary) sm:size-12" />
            </div>

            <div class="lg:pt-10 lg:text-center">
              <div class="text-base font-semibold text-pretty text-(--ui-text-highlighted)">
                {{ feature?.title }}
              </div>
              <div class="mt-1 text-[15px] text-pretty text-(--ui-text-muted)">
                {{ feature?.description }}
              </div>
            </div>
          </div>
        </div>
      </UPageSection>
    </UContainer>

    <!-- Modules -->
    <div class="relative">
      <HeroBackground
        direction="top-to-bottom"
        class="absolute inset-x-0 top-0 z-0 text-(--ui-primary)"
      />

      <UContainer>
        <UPageSection>
          <template #title>
            <span>{{ page.modules?.title }}</span>
            <span class="block text-(--ui-primary)">
              {{ page.modules?.title_suffix }}
            </span>
          </template>

          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ModuleCard
              v-for="(item, index) in slicedModules"
              :key="`module-${index}`"
              :module="item"
            />
          </div>

          <div class="text-center">
            <UButton
              label="Explore all modules"
              to="/modules"
              size="xl"
              icon="i-ph-arrow-right"
              trailing
            />
          </div>
        </UPageSection>
      </UContainer>
    </div>

    <!-- Roadmap -->
    <UContainer>
      <UPageSection
        id="roadmap"
        :title="page.roadmap?.title"
        :description="page.roadmap?.description"
        class="block w-full"
      >
        <div class="mx-auto flow-root w-full max-w-4xl">
          <ul role="list" class="-mb-8">
            <li
              v-for="(event, index) in page.roadmap?.items"
              :key="`event-${index}`"
              class="relative flex gap-8 pb-8"
            >
              <div class="text-(--ui-bg)">
                <span
                  :class="[
                    {
                      'ring-primary-500/10 bg-(--ui-primary)': event?.status === 'done',
                      'bg-(--ui-bg-inverted) ring-neutral-500/10': event?.status === 'in-progress',
                      'bg-(--ui-bg)/20 text-(--ui-text) ring-neutral-500/10':
                        event?.status === 'upcoming',
                    },
                    'flex size-8 items-center justify-center rounded-full ring-8',
                  ]"
                >
                  <Icon :name="event?.icon" class="size-5" aria-hidden="true" />
                </span>
              </div>

              <div class="flex min-w-0 flex-1 flex-col space-x-4 sm:flex-row sm:justify-between">
                <UCollapsible :default-open="index === 0">
                  <UButton
                    :label="event?.label"
                    variant="link"
                    color="neutral"
                    class="text-sm text-(--ui-text-muted)"
                  />

                  <template #content>
                    <p class="py-6 pl-3 text-sm">{{ event?.content }}</p>
                  </template>
                </UCollapsible>

                <div class="pl-3 text-sm whitespace-nowrap text-(--ui-text-dimmed) sm:text-right">
                  <p>{{ event?.date }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </UPageSection>
    </UContainer>

    <!-- CTA -->
    <UContainer>
      <UPageSection>
        <UPageCTA :description="page.cta?.description" :links="page.cta?.links" variant="subtle">
          <template #title>
            <span>{{ page.cta?.title }}</span>
            <span class="block text-(--ui-primary)">
              {{ page.cta?.title_suffix }}
            </span>
          </template>
        </UPageCTA>
      </UPageSection>
    </UContainer>
  </UMain>
</template>
