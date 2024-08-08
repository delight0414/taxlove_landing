<template>
  <div class="platform-item dp-col">
    <div class="dp-flex dp-between">
      <span class="index-circle">{{listIndex + 1}}</span>
      <div class="platform-label">{{item.label}}</div>
    </div>
    <div class="dp-col platform-text">
      <h5>{{item.title}}</h5>
      <p>{{ item.description }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PlatformListType } from "@/types"

const props = defineProps<{
  item : PlatformListType
  listIndex : number
}>()
props
</script>