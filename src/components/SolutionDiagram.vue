<template>
  <section class="solution diagram" id="solution" data-bg="#fff">
    <div class="dp-col">
      <div class="content-wrap dp-col" ref="contentWrap">
        <div class="d-flex solution-head">
          <h4>세무사 사랑 솔루션 구성도</h4>
        </div>
        <!-- 768초과일때 보이게 -->
        <div class="diagram" v-if="windowWidth > 768">
          <div class="image-container">
            <img :src="imageSrc" alt="Solution Diagram" ref="image">
          </div>
        </div>

        <!-- 768이하일때 보이게 -->
        <div class="diagram_swiper" v-else>
          <swiper :modules="modules" 
          :slidesPerView="'auto'" 
          :spaceBetween="20" 
          :freeMode="{
            enabled: true,
            momentumBounce: false,
          }" class="mySwiper">
            <swiper-slide class="section first">
              <img src="/public/diagram/diagram_mobile_1.svg" alt="Diagram Mobile 1">
            </swiper-slide>
            <swiper-slide class="section second">
              <img src="/public/diagram/diagram_mobile_2.svg" alt="Diagram Mobile 2">
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';

const modules = [FreeMode];

const contentWrap = ref<HTMLElement | null>(null);
const imageSrc = ref<string>('');
const windowWidth = ref<number>(window.innerWidth);

const updateImageSrc = () => {
  imageSrc.value = window.innerWidth <= 1023
    ? './diagram/diagram_tablet.svg'
    : './diagram/diagram_pc.svg';
};

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
  updateImageSrc();
};

onMounted(() => {
  updateImageSrc();

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

  if (contentWrap.value) {
    observer.observe(contentWrap.value);
  }

  window.addEventListener('resize', updateWindowWidth);

  onUnmounted(() => {
    observer.disconnect();
    window.removeEventListener('resize', updateWindowWidth);
  });
});
</script>


<style lang="scss" scoped>
.solution {
  >.dp-col {
    height: 100%;

    >.dp-col {
      height: 100%;
    }
  }
}

.diagram {
  .content-wrap {
    width: 100%;
    height: 100%;
    gap: 64px;
    padding: 0 160px;

    @media only screen and (max-width:1400px) {
      padding: 0 100px;
    }

    @media only screen and (max-width:1023px) {
      padding: 0 28px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .solution-head {
    text-align: center;
  }

}

.diagram_swiper {
  z-index: 1;
  position: relative;
  width: 100%;

  &::after {
      position: absolute;
      content: '';
      right: 0;
      top: -12px;
      z-index: 2;
      width: 40px;
      height: 40px;
      background-image: url(/public/diagram/slide_icon.svg);
      background-size: contain;
  }

  @media only screen and (max-width: 768px) {
    &::after {
      position: absolute;
      content: '';
      right: 0;
      top: -12px;
      z-index: 2;
      width: 40px;
      height: 40px;
      background-image: url(/public/diagram/slide_icon.svg);
      background-size: contain;
      opacity: 1;
      transition: opacity 0.3s ease-in-out;
    }
  }

  .swiper {
    width: 100%;
    overflow: visible;

    .swiper-wrapper {
      justify-content: flex-start;
    }
  }

  .swiper-slide {
    height: 410px;

    &.first {
      width: 516px !important;
    }

    &.second {
      width: 320px !important;
    }

    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
