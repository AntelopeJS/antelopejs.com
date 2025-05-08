<script setup lang="ts">
const props = defineProps<{ direction: "top-to-bottom" | "bottom-to-top" }>();

const svgStyle = computed(() =>
  props.direction === "bottom-to-top" ? "transform: scaleY(-1)" : ""
);
const gradientY1 = computed(() => (props.direction === "bottom-to-top" ? "181" : "0"));
const gradientY2 = computed(() => (props.direction === "bottom-to-top" ? "0" : "181"));
const startOpacity = computed(() => (props.direction === "bottom-to-top" ? "0" : "1"));
const endOpacity = computed(() => (props.direction === "bottom-to-top" ? "1" : "0"));
</script>

<template>
  <div>
    <svg
      viewBox="0 0 1440 181"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="pointer-events-none"
      :style="svgStyle"
    >
      <mask id="path-1-inside-1_414_5526" fill="white">
        <path d="M0 0H1440V181H0V0Z" />
      </mask>
      <path d="M0 0H1440V181H0V0Z" fill="url(#paint0_linear_414_5526)" fill-opacity="0.22" />
      <path
        d="M0 2H1440V-2H0V2Z"
        fill="url(#paint1_linear_414_5526)"
        mask="url(#path-1-inside-1_414_5526)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_414_5526"
          x1="720"
          :y1="gradientY1"
          x2="720"
          :y2="gradientY2"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="currentColor" :stop-opacity="startOpacity" />
          <stop offset="1" stop-color="currentColor" :stop-opacity="endOpacity" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_414_5526"
          x1="0"
          y1="90.5"
          x2="1440"
          y2="90.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="currentColor" stop-opacity="0" />
          <stop offset="0.395" stop-color="currentColor" />
          <stop offset="1" stop-color="currentColor" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>
