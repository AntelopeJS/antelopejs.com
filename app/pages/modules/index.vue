<script setup lang="ts">
import { joinURL } from "ufo";

const { data: page } = await useAsyncData("modules", () => queryCollection("module").first());
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

/* Search */
const input = useTemplateRef("searchInput");

const {
  q,
  filteredModules,
  categories,
  fetchList,
  selectedOrder,
  selectedSort,
  sorts,
  selectedInterface,
} = useModules();
const router = useRouter();
const route = useRoute();

await fetchList();

defineShortcuts({
  "/": () => {
    input.value?.inputRef?.focus();
  },
});

const ITEMS_PER_PAGE = 9;
const SCROLL_THRESHOLD = 450;
const displayedModules = ref<Module[]>([]);
const isLoading = ref(false);

const { y: scrollY } = useWindowScroll();

const loadMoreModules = () => {
  if (isLoading.value) return;

  const currentLength = displayedModules.value.length;
  if (currentLength >= filteredModules.value.length) return;

  isLoading.value = true;

  setTimeout(() => {
    const nextItems = filteredModules.value.slice(currentLength, currentLength + ITEMS_PER_PAGE);
    displayedModules.value.push(...nextItems);
    isLoading.value = false;
  }, 300);
};

const initializeModules = () => {
  displayedModules.value = filteredModules.value.slice(0, ITEMS_PER_PAGE * 2);
};

const debouncedLoadMore = useDebounceFn(loadMoreModules, 50);

watch(scrollY, (y) => {
  if (window.innerHeight + y >= document.documentElement.scrollHeight - SCROLL_THRESHOLD) {
    debouncedLoadMore();
  }
});

watch(filteredModules, () => {
  isLoading.value = false;
  displayedModules.value = [];
  initializeModules();
});

initializeModules();

// Utils functions
function replaceRoute(name: string, param: string | { key: string } | null) {
  router.replace({
    name: "modules",
    query: {
      ...route.query,
      [name]: typeof param === "string" ? param : param?.key || undefined,
    },
    state: {
      smooth: "#smooth",
    },
  });
}
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

    <UContainer>
      <UPage>
        <template #left>
          <UPageAside :ui="{ root: 'block' }">
            <UInput
              ref="searchInput"
              :model-value="q"
              name="q"
              placeholder="Search a module..."
              class="w-full"
              autofocus
              autocomplete="off"
              @update:model-value="replaceRoute('q', $event as string)"
            >
              <template #trailing>
                <UKbd value="/" />
              </template>
            </UInput>

            <div class="flex w-full gap-2 pt-2">
              <USelectMenu
                :model-value="selectedSort"
                :items="sorts"
                color="neutral"
                class="w-full"
                variant="outline"
                @update:model-value="replaceRoute('sortBy', $event.key as string)"
              />

              <UButton
                :icon="selectedOrder?.icon"
                color="neutral"
                variant="outline"
                @click="replaceRoute('orderBy', selectedOrder?.key === 'desc' ? 'asc' : 'desc')"
              >
                <span class="sr-only">Sort by {{ selectedOrder?.label }}</span>
              </UButton>
            </div>

            <USeparator class="my-4" />

            <UCollapsible :default-open="true" class="mt-4">
              <div class="group flex items-center justify-between">
                <h2 class="pb-2 font-medium">Categories</h2>

                <UIcon
                  name="i-ph-caret-down"
                  class="size-4 transition-transform group-data-[state=open]:rotate-180"
                />
              </div>

              <template #content>
                <UNavigationMenu orientation="vertical" :items="categories" />
              </template>
            </UCollapsible>
          </UPageAside>
        </template>

        <div class="py-8">
          <UAlert
            v-if="selectedInterface"
            :title="selectedInterface.title"
            :description="selectedInterface.description"
            :actions="[
              {
                label: 'Documentation',
                to: selectedInterface.docs,
                icon: 'i-ph-book',
                trailing: true,
                target: '_blank',
                size: 'md',
              },
            ]"
            variant="subtle"
            close
            class="mb-6"
            @update:open="replaceRoute('interface', null)"
          />

          <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <ModuleCard
              v-for="(item, index) in displayedModules"
              :key="`module-${index}`"
              :module="item"
            />

            <template v-if="isLoading">
              <ModuleCardSkeleton
                v-for="index in ITEMS_PER_PAGE"
                :key="`module-skeleton-${index}`"
              />
            </template>
          </div>
        </div>
      </UPage>
    </UContainer>
  </div>
</template>
