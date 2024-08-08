<template>
  <section class="solution-card"
  data-bg="#fff"
  
  >
    <div class="content-wrap dp-col">
      <div class="dp-col" v-for="card in cardData" :key="card.category"
      :ref="setElementRef" >
        <SolutionHead
        :category="card.category"
        :description="card.categoryDescription"
        :link="card.link"
        />
        <div class="solution-card-body"
          :class="{harf : card.list.length === 4}"
        >
          <CardItem v-for="(cardItem, listIndex) in card.list" :item="cardItem" :key="cardItem.title"
            :listIndex="listIndex" />
        </div>

      </div>

    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from 'vue'
import solutionCardData from "@/assets/data/solution-card.json"
import { CardDataType } from "@/types"
import CardItem from "@/components/CardItem.vue"
import SolutionHead from '@/components/SolutionHead.vue'
import { ComponentPublicInstance } from 'vue';

// const cardData: CardDataType[] = solutionCardData

const cardData = reactive<CardDataType[] >(solutionCardData); // 여기에 v-for로 반복할 데이터 배열
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
    threshold: .5
  });

  elementsRef.value.forEach(el => observer.observe(el));

  onUnmounted(() => {
    elementsRef.value.forEach(el => observer.unobserve(el));
  });
});


</script>
