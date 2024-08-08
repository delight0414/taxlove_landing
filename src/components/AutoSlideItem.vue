<template>
  <div class="auto-slide-item" 
  :class="`auto-slide-item${item.id}`"
  :style="{background:item.color}">
    <h5>
      {{item.title}}
    </h5>
    <img :src="(`./slides/auto-${item.id}.png`)" alt="">
  </div>
</template>
<script setup lang="ts">
import { AutoSliderType } from "@/types"

const props = defineProps<{
  item : AutoSliderType
}>()
props
</script>

