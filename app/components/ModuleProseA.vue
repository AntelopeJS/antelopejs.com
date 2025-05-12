<template>
  <NuxtLink
    :href="href"
    :target="target"
    class="mr-1 inline-block text-(--ui-primary) hover:text-(--ui-primary)/80"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import { hasProtocol, joinURL } from "ufo";

interface Props {
  href?: string;
  target?: string;
}

const props = withDefaults(defineProps<Props>(), {
  href: "",
  target: undefined,
});

const route = useRoute();
const { data: module } = useNuxtData<Module>(`module-${route.params?.slug}`);

const href = computed(() => {
  if (hasProtocol(props.href) || !module.value?.github) return props.href;
  return joinURL(module.value.github, "blob", "main", props.href);
});
</script>
