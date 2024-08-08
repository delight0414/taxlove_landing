<template>
  <div class="dp-flex solution-head">
    <div>
      <h4>{{ category }}</h4>
      <p>{{ description  }}</p>
    </div>
    <a v-if="link" :href="link" class="link-gray"
    target="_blank"
    >
      바로가기
      <SvgIcon :width="32" :height="32" :viewBox="'0 0 32 32'">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Frame 811566">
            <path id="Vector" d="M16.6154 8.5L24 16L16.6154 23.5M22.9744 16L8 16" stroke="currentColor"
              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </g>
        </svg>
      </SvgIcon>
    </a>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  category:string
  description:string
  link?:string
}>()
props
</script>