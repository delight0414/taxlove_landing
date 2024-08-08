<template>
  <CommonHeader />
  <div class="main-wrap" :style="{ backgroundColor: nowBg }">
    <VideoSection />
    <AutoSlideLayout />
    <section class="full-section dp-col" data-bg="" style="background: #f5f5f5;">
      <div class="dp-col" ref="fullSection">
        <span class="talk-icon"></span>
        <h3>
          세무사사랑 솔루션은 세무사들이 최고의 업무 효율과<br class="mobile_hidden" />
          성과를 낼 수 있도록 최적화되어 있습니다.
        </h3>
      </div>
    </section>
    <SolutionDiagram />
    <!-- Conditional rendering based on screen width -->
    <SolutionLayout v-if="!isWideScreen" />
    <SolutionLayoutStatic v-else />
    <SolutionCardLayout />
    <SolutionSecondLayout v-if="!isWideScreen"/>
    <SolutionSecondLayoutStatic v-else/>
    <PlatformLayout />
    <aside class="wise-n-rich" id="info" ref="infoSection">
      <div class="dp-col">
        <h3>
          WISE & RICH 회원에 가입하시면<br />
          세무사사랑을 무료로 이용할 수 있습니다!
        </h3>
        <p>지금 바로 세무사사랑을 마음껏 이용해 보세요.</p>
      </div>
      <a href="https://www.wisenrich.co.kr/" target="_blank">WISE & RICH 바로가기</a>
    </aside>
  </div>
  <CommonFooter />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import CommonHeader from "@/components/CommonHeader.vue";
import CommonFooter from "@/components/CommonFooter.vue";
import PlatformLayout from "@/components/PlatformLayout.vue";
import VideoSection from "@/components/VideoSection.vue";
import AutoSlideLayout from "@/components/AutoSlideLayout.vue";
import SolutionDiagram from '@/components/SolutionDiagram.vue';
import SolutionLayout from "@/components/SolutionLayout.vue";
import SolutionLayoutStatic from '@/components/SolutionLayoutStatic.vue';
import SolutionCardLayout from "@/components/SolutionCardLayout.vue";
import SolutionSecondLayout from "@/components/SolutionSecondLayout.vue";

import SolutionSecondLayoutStatic from '@/components/SolutionSecondLayoutStatic.vue';

const fullSection = ref<HTMLElement | null>(null);
const infoSection = ref<HTMLElement | null>(null);
const nowBg = ref('#fff');
const isWideScreen = ref(window.innerWidth >= 1200);

const updateScreenSize = () => {
  // Update ref value directly
  isWideScreen.value = window.innerWidth >= 1200;
};

onMounted(() => {
  // Handle initial screen size
  updateScreenSize();

  // Add event listener for window resize
  window.addEventListener('resize', updateScreenSize);

  const sections = document.querySelectorAll('[data-bg]');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bgColor = entry.target.getAttribute('data-bg');
        if (bgColor) {
          nowBg.value = bgColor;
        }
      }
    });
  }, {
    threshold: 0.4
  });
  sections.forEach((v) => sectionObserver.observe(v));

  const infoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('ani');
      }
    });
  }, {
    threshold: 0.9
  });

  if (fullSection.value) infoObserver.observe(fullSection.value);
  if (infoSection.value) infoObserver.observe(infoSection.value);

  onUnmounted(() => {
    // Remove event listener and disconnect observers
    window.removeEventListener('resize', updateScreenSize);
    infoObserver.disconnect();
    sectionObserver.disconnect();
  });
});
</script>