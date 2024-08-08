<template>
  <section class="platform" id="platform"
  data-bg=""
  style="background-color: #2b2b2b;"
  >
    <div class="content-wrap dp-col">
      <div class="dp-col" v-for="platform in platformList" :key="platform.category"
      :ref="setElementRef">
        <div class="dp-flex platform-head">
          <div>
            <h4>{{ platform.category }}</h4>
            <p>{{ platform.categoryDescription }}</p>
          </div>
          <a v-if="platform.link" 
          target="_blank"
          :href="platform.link" class="link-black">
            바로가기
            <SvgIcon 
            :width="32"
            :height="32"
            :viewBox="'0 0 32 32'" >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Frame 811566">
                  <path id="Vector" d="M16.6154 8.5L24 16L16.6154 23.5M22.9744 16L8 16" stroke="currentColor"
                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </g>
              </svg>
            </SvgIcon> 
          </a>
        </div>
        <div class="platform-body">
          <PlatformItem v-for="(platformItem, listIndex) in platform.list" :item="platformItem" :key="platformItem.title"
            :listIndex="listIndex" />
        </div>
        <a v-if="platform.link" 
        target="_blank"
        :href="platform.link" class="pc_hidden link-black "
        >
            바로가기
            <SvgIcon 
            :width="32"
            :height="32"
            :viewBox="'0 0 32 32'" >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Frame 811566">
                  <path id="Vector" d="M16.6154 8.5L24 16L16.6154 23.5M22.9744 16L8 16" stroke="currentColor"
                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </g>
              </svg>
            </SvgIcon> 
          </a>

      </div>

    </div>
  </section>
</template>
<script setup lang="ts">
import { ref,onMounted, onUnmounted, reactive} from 'vue'
import platformData from "@/assets/data/platform.json"
import { PlatformDataType } from "@/types"
import PlatformItem from "@/components/PlatformItem.vue"
// import SvgIcon from "@/components/SvgIcon.vue"
import { ComponentPublicInstance } from 'vue';


const platformList = reactive<PlatformDataType[] >(platformData);
const elementsRef = ref<HTMLElement[]>([]);

const setElementRef = (el:Element | ComponentPublicInstance | null) => {
  if (el instanceof HTMLElement) elementsRef.value.push(el);
};

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('ani');
      }
    });
  }, {
    rootMargin: '0px',
    threshold: .2
  });

  elementsRef.value.forEach(el => observer.observe(el));

  onUnmounted(() => {
    elementsRef.value.forEach(el => observer.unobserve(el));
  });
});


</script>
