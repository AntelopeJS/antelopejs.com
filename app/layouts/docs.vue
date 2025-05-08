<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";

const navigation = inject<Ref<ContentNavigationItem[]>>("navigation");
const route = useRoute();

const mainNavigation = computed(() =>
  navigation?.value.map((item) => ({
    ...item,
    active: route.fullPath.startsWith(item.path),
    children: [],
  }))
);

const activeSubNavigation = computed(() => {
  const activeItem = navigation?.value.find((item) => route.fullPath.startsWith(item.path));
  return activeItem?.children;
});
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UPageAside>
          <UContentNavigation :navigation="mainNavigation" />

          <USeparator class="my-4" />

          <UContentNavigation highlight :navigation="activeSubNavigation" />
        </UPageAside>
      </template>

      <slot />
    </UPage>
  </UContainer>
</template>
