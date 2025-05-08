<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

interface Props {
  links?: NavigationMenuItem[];
}

const props = defineProps<Props>();
const { footer, header } = useAppConfig();
</script>

<template>
  <footer class="relative py-12">
    <HeroBackground
      direction="top-to-bottom"
      class="absolute inset-x-0 top-0 -z-10 text-(--ui-primary)"
    />

    <UContainer>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
        <!-- Logo -->
        <div class="col-span-1">
          <UColorModeImage
            :light="header?.logo?.light!"
            :dark="header?.logo?.dark!"
            :alt="header?.logo?.alt"
            class="h-6 w-auto shrink-0"
          />
        </div>

        <!-- Addresses -->
        <div class="col-span-1">
          <template v-for="address in footer?.addresses" :key="address.name">
            <h3 class="mb-4 font-medium text-(--ui-primary)">
              {{ address.name }}
            </h3>
            <address class="text-(--ui-text-muted) not-italic">
              <p>
                {{ address.street }}
              </p>
              <p>
                {{ address.city }}
              </p>
              <p>VAT : {{ address.vat }}</p>
            </address>
          </template>
        </div>

        <!-- Navigation -->
        <div class="col-span-1">
          <h3 class="mb-4 font-medium text-(--ui-primary)">Navigation</h3>
          <ul class="space-y-2">
            <li v-for="(link, index) in props.links" :key="`navigation-${index}`">
              <ULink
                :to="link.to"
                class="text-(--ui-text-muted) transition-colors hover:text-(--ui-primary)"
              >
                {{ link.label }}
              </ULink>
            </li>
          </ul>
        </div>

        <!-- Socials -->
        <div class="col-span-1">
          <h3 class="mb-4 font-medium text-(--ui-primary)">Socials</h3>
          <ul class="space-y-2">
            <li v-for="link in footer?.links" :key="link.label">
              <ULink :to="link.to" :target="link.target" :aria-label="link.label">
                <div class="flex items-center gap-2">
                  <UIcon :name="link.icon" class="size-4 shrink-0" />
                  {{ link.label }}
                </div>
              </ULink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-12 text-center text-sm text-gray-500">
        {{ footer?.credits }}
      </div>
    </UContainer>
  </footer>
</template>
