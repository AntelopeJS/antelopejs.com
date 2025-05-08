<script setup lang="ts">
interface Props {
  module: Module;
}

const props = defineProps<Props>();
const { format } = useFormatNumber();
</script>

<template>
  <ULink
    class="shadow-primary-500/20 flex flex-col justify-between rounded-md border border-(--ui-border) bg-(--ui-bg) px-6 py-4 text-left transition-shadow hover:shadow"
    :to="`/modules/${props.module.name}`"
  >
    <div>
      <div class="flex items-start justify-between">
        <UAvatar
          :src="props.module.icon"
          :alt="props.module.name"
          :ui="{ root: 'rounded-sm' }"
          size="lg"
        />

        <UBadge v-if="props.module.official" label="Official" icon="i-ph-check" variant="subtle" />
      </div>

      <h2 class="truncate pt-2 font-bold">{{ props.module.repo }}</h2>

      <p class="text-sm text-(--ui-text-muted)">{{ props.module.description }}</p>
    </div>

    <div>
      <USeparator class="my-3" />
      <div class="flex w-full justify-between">
        <div class="flex gap-2 text-sm text-(--ui-text-muted)">
          <p v-if="props.module.downloads" class="flex items-center gap-1">
            <span class="text-xs">{{ format(props.module.downloads) }}</span>
            <UIcon name="i-ph-arrow-circle-down" class="size-4" />
          </p>

          <p v-if="props.module.stars" class="flex items-center gap-1">
            <span class="text-xs">{{ format(props.module.stars) }}</span>
            <UIcon name="i-ph-star" class="size-4" />
          </p>
        </div>

        <p class="flex items-center gap-1">
          <span class="text-xs">More informations</span>
          <UIcon name="i-ph-arrow-right" class="size-4" />
        </p>
      </div>
    </div>
  </ULink>
</template>
