<template>
  <section class="auto-slide dp-col" id="service"
    data-bg="#fff"
  >
    <div class="dp-col" ref="elementsRef">
      <h2>
        세무사 사랑은 <br>
        세무사를 사랑하는 마음으로 준비한<br>
        세무사 필수 솔루션 모음 입니다.
      </h2>
      <!-- <p>
        세무사사랑을 통해 업무 효율 극대화와 고객사 만족도 증진을 동시에 경험해 보세요!
      </p> -->
    </div>
    <div class="auto-slide-content">

  <swiper
    :modules="[Autoplay]"
    :slidesPerView="'auto'"
    :spaceBetween="12"
    :breakpoints="{
      1024: {
        spaceBetween: 24
      }
    }"
    :loop="true"
    :speed="2500"
    :autoplay="{delay: 0,disableOnInteraction: false}"
    class="mySwiper"

  >
    <swiper-slide v-for="item in slidesData">
      <AutoSlideItem :item="item"/>
    </swiper-slide>
  </swiper>
    </div>
  </section>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import AutoSlideItem from "@/components/AutoSlideItem.vue"
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import autoSlides from "@/assets/data/autoSlides.json"
import { reactive } from "vue"
import 'swiper/css';


const slidesData = reactive(autoSlides)
const elementsRef = ref<HTMLElement|null>(null);

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('ani');
        // 관찰되는 요소가 뷰포트에 들어올 때의 로직
      }
    });
  }, {
    rootMargin: '0px',
    threshold: 1
  });

  if(elementsRef.value) observer.observe(elementsRef.value);

  onUnmounted(() => {
    observer.disconnect()
  });
});


</script>

