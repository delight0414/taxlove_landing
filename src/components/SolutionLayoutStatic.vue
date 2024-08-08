<template>
  <section class="solution" id="solution"
  data-bg=""
  style="background-color: #f5f5f5;"
  >
    <div :class="`dp-col contain contain${index + 1}`" v-for="(solution, index) in solutionList" :key="solution.category">
      <div class="content-wrap dp-col" :ref="setElementRef" >
        <SolutionHead :category="solution.category" :description="solution.categoryDescription" :link="solution.link" />
      <div class="solution-body">
        <div :class="`card-body card-body-${index + 1}`">
          <div v-for="item in solution.list">
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
          </div>
        </div>
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
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import solutionData from "@/assets/data/solution.json";
import { SolutionDataType } from "@/types";
import SolutionHead from '@/components/SolutionHead.vue';
import { ComponentPublicInstance } from 'vue';

gsap.registerPlugin(ScrollTrigger);

const solutionList = reactive<SolutionDataType[]>(solutionData); // v-for로 반복할 데이터 배열
const elementsRef = ref<HTMLElement[]>([]);

const setElementRef = (el: Element | ComponentPublicInstance | null) => {
  if (el instanceof HTMLElement) {
    elementsRef.value.push(el);
  }
};

onMounted(() => {
for (let i = 1; i <= 4; i++) {
  const horizontalSection = document.querySelector(`.card-body-${i}`);

  if (horizontalSection) {
    gsap.to(`.card-body-${i}`, {
      x: () => horizontalSection.scrollWidth * -1,
      xPercent: 100,
      scrollTrigger: {
        trigger: `.card-body-${i}`,
        start: '100px center',
        end: '+=2000px',
        pin: `.contain${i}`,
        scrub: true,
        invalidateOnRefresh: true
      }
    });
  }
  }

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
.solution {
  > .dp-col {
    padding : 0;
    height: 100dvh;
  }
}
.contain {
  position: sticky;
}
.card-body {
  display: flex;
  gap: 24px;
  .solution-item {
    width: 400px;
  }
}
</style>

