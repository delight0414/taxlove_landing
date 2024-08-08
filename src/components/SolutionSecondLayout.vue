<template>
  <section class="solution">
    <div class="dp-col contain" v-for="(solution, solutionIndex) in solutionSecondList" :key="solution.category"  
    :class="{ 'solution-first': solutionIndex === 0, 'solution-second': solutionIndex === 1 }"
    >
    <div class="content-wrap dp-col" :ref="setElementRef">
        <SolutionHead :category="solution.category" :description="solution.categoryDescription" :link="solution.link"
        />
        <div class="solution-body">
          <SolutionSwiper :className="'solution-second-swiper'">
            <swiper-slide v-for="item in solution.list">
              <div class="solution-second-item dp-col" :class="{ 'solution-second-item-bg': solutionIndex === 1 }">
                <div class="solution-second-item-top">
                  <img :src="item.image" alt="solution" />

                </div>
                <div class="solution-second-item-bottom dp-col">
                    <h5>{{ item.title }}</h5>
                    <p>{{ item.description }}</p>
                </div>
              </div>
            </swiper-slide>
          </SolutionSwiper>
        </div>
        <a v-if="solution.link" :href="solution.link" class="link-gray pc_hidden"
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
  </div>
  </section>
</template>
<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue';
import { ref, onMounted, onUnmounted, reactive, type ComponentPublicInstance } from 'vue';
import solutionSecondData from "@/assets/data/solution-second.json";
import { SolutionSecondDataType } from "@/types";
import SolutionSwiper from "@/components/SolutionSwiper.vue";
import SolutionHead from '@/components/SolutionHead.vue';

const solutionSecondList = reactive<SolutionSecondDataType[]>(solutionSecondData);
const elementsRef = ref<HTMLElement[]>([]);

const setElementRef = (el: Element | ComponentPublicInstance | null) => {
  if (el instanceof HTMLElement) elementsRef.value.push(el);
};

// 스크롤 방향을 저장하는 변수

onMounted(() => {

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('ani');
      }
    });
  }, {
    rootMargin: '0px',
    threshold: 0.5
  });

  elementsRef.value.forEach(el => observer.observe(el));

  onUnmounted(() => {
    elementsRef.value.forEach(el => observer.unobserve(el));
  });
});
</script>


<style lang="scss" scoped>
.solution-first {
  background-color: #f5f5f5;
  justify-content: center;
}
.solution-second {
  background-color: #fff;
}

</style>
