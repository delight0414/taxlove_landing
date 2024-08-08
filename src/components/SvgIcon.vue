<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :aria-labelledby="iconName"
  >
    <title :id="iconName" lang="en">{{ iconName }}</title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
  viewBox: string,
  iconName?: string,
  width: number | string,
  height: number | string,
  iconColor?: string
}>(),{
  viewBox: "0 0 24 24",
  // iconName: "",
  width: 18,
  height: 18,
  iconColor: 'currentColor'
}
)
props



</script>