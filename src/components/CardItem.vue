<template>
  <div class="solution-card-item dp-col" 
  >
    <div class="dp-flex dp-between">
      <div class="dp-col solution-card-text">
      <h5>{{item.title}}</h5>
      <p>{{ item.description }}</p>
    </div>
      <!-- <span class="index-circle">{{listIndex + 1}}</span> -->
      <div class="solution-card-icon">
        <img :src="item.icon" alt="solution-card-icon">
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { CardListType } from "@/types"
    
const props = defineProps<{
  item : CardListType
  listIndex : number
}>()
props
</script>