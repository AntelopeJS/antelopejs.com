<template>
  <div class="rounded-md border border-(--ui-border) bg-(--ui-bg) px-6 py-4">
    <USkeleton class="size-8" />

    <h2 class="truncate pt-2 font-bold">
      <USkeleton class="h-4 w-28" />
    </h2>

    <div class="space-y-1 pt-2 text-sm text-(--ui-text-muted)">
      <USkeleton class="h-4 w-full" />
      <USkeleton class="h-4 w-20" />
    </div>

    <USeparator class="my-3" />

    <div class="flex w-full justify-between">
      <USkeleton class="h-3 w-16" />

      <USkeleton class="h-3 w-10" />
    </div>
  </div>
</template>
