<template>
  <section class="solution" id="solution"
  data-bg=""
  style="background-color: #f5f5f5;"
  >
    <div class="dp-col contain" v-for="solution in solutionList" :key="solution.category" >
      <div class="content-wrap dp-col" :ref="setElementRef" >
        <SolutionHead :category="solution.category" :description="solution.categoryDescription" :link="solution.link" />
      <div class="solution-body" >
        <SolutionSwiper
        >
          <swiper-slide v-for="item in solution.list">
            <div class="solution-item">
              <div class="solution-item-top" :style="{ backgroundColor: item.color ? item.color : 'none' }">
                <img :src="item.image" alt="solution" :class="item.color && 'is-color'" loading="lazy" />

              </div>
              <div class="solution-item-bottom dp-col">
                <span class="solution-item-label">
                  {{ item.label }}
                </span>
                <div class="dp-col text-wrap">
                  <h5>{{ item.title }}</h5>
                  <p>{{ item.description }}</p>
                </div>
              </div>
            </div>
          </swiper-slide>
        </SolutionSwiper>
      </div>

      <a v-if="solution.link" :href="solution.link" class="link-gray pc_hidden" target="_blank">
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from 'vue';
import solutionData from "@/assets/data/solution.json";
import { SolutionDataType } from "@/types";
import SolutionSwiper from "@/components/SolutionSwiper.vue";
import SolutionHead from '@/components/SolutionHead.vue';
import { SwiperSlide } from 'swiper/vue';
import { ComponentPublicInstance } from 'vue';

const solutionList = reactive<SolutionDataType[]>(solutionData); // v-for로 반복할 데이터 배열
const elementsRef = ref<HTMLElement[]>([]);

const setElementRef = (el: Element | ComponentPublicInstance | null) => {
  if (el instanceof HTMLElement) {
    elementsRef.value.push(el);
  }
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
    threshold: .5
  });

  elementsRef.value.forEach(el => observer.observe(el));

  onUnmounted(() => {
    elementsRef.value.forEach(el => observer.unobserve(el));
  });
});
</script>

<style lang="scss" scoped>
.solution {
  > .dp-col {
    padding : 0;
    height: 100dvh;
  }
}
@media only screen and (max-width : 1023px){
  .solution {
    > .dp-col {
      padding : 0;
    }
  }
}
@media only screen and (max-width : 768px){
  .solution {
    > .dp-col {
      height: 60dvh;
    }
  }
}

</style>

