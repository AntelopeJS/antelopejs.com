<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";
import type { NavigationMenuItem } from "@nuxt/ui";

interface Props {
  links?: NavigationMenuItem[];
}

const props = defineProps<Props>();
const navigation = inject<Ref<ContentNavigationItem[]>>("navigation");
const { header } = useAppConfig();
</script>

<template>
  <UHeader :ui="{ center: 'flex-1' }" :to="header?.to || '/'">
    <template #left>
      <NuxtLink class="flex items-center gap-2" :to="header?.to || '/'">
        <UColorModeImage
          v-if="header?.logo?.dark || header?.logo?.light"
          :light="header?.logo?.light!"
          :dark="header?.logo?.dark!"
          :alt="header?.logo?.alt"
          class="h-6 w-auto shrink-0"
        />

        <span v-else-if="header?.title">
          {{ header.title }}
        </span>

      </NuxtLink>
    </template>

    <template #right>
      <UContentSearchButton v-if="header?.search" />

      <UColorModeButton v-if="header?.colorMode" />

      <template v-if="header?.links">
        <UButton
          v-for="(link, index) of header.links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>

    <UNavigationMenu :items="props.links" orientation="horizontal" content-orientation="vertical" />

    <template #body>
      <UNavigationMenu
        :items="props.links"
        orientation="vertical"
        content-orientation="vertical"
        class="pb-8"
      />

      <UContentNavigation highlight :navigation="navigation" />
    </template>
  </UHeader>
</template>
