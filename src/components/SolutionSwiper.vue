<template>
  <swiper
    :modules="modules"
    :breakpoints="{
      1024: {
        spaceBetween: 24,
      }
    }"
    :parallax="true"
    :slidesPerView="'auto'"
    :spaceBetween="12"
    :class="className"
    class="solution-swiper"
    :lazy="true"
    :freeMode="{
      enabled: true,
      sticky: true,
      momentumBounce: false,
    }"
  >
    <slot/>
  </swiper>
</template>

<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { FreeMode, Parallax, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/mousewheel';

const props = defineProps<{
  className?: string;
}>();
props

const modules = [FreeMode, Parallax, Mousewheel];
</script>
