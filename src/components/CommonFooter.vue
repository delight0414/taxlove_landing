<template>
  <footer class="footer" ref="footerRef">
    <div class="footer-wrap content-wrap">
      <div class="footer-top dp-flex dp-between">
        <div class="logo"></div>
        <nav class="dp-flex">
          <a href="https://www.bizbee.ne.kr/pages/intro.html" target="_blank">회사소개</a>
          <router-link to="/policy">개인정보처리방침</router-link>
        </nav>
      </div>
      <div class="footer-bottom">
        <ul class="footer-info">
          <li class="dp-flex">
            <span class="font-bold">주식회사 비즈비</span>
            <span>06657 서울특별시 서초구 반포대로21길 3,<br class="pc_hidden"> IWHA B1(서초동, 이화빌딩)</span>
          </li>
          <li class="dp-flex">
            <div class="min-info">
              <span class="font-bold">대표이사</span>
              <span>김태형</span>
            </div>

            <div class="min-info">
              <span class="font-bold">사업자등록번호</span>
              <span>573-81-02048</span>
            </div>
            <div class="min-info hide">
              <span class="font-bold">전화번호</span>
              <span>1533-6091</span>
            </div>
            <div class="min-info">
              <span class="font-bold">이메일</span>
              <span>contact@bizbee.co.kr</span>
            </div>
          </li>
        </ul>
        <p class="footer-copy">
          Copyright © bizbee. All Rights Reserved.
        </p>

      </div>
    </div>
  </footer>
  <div 
  @click="goTop"
  :class="documentScrollTop >80 ? 'on':'off'"
  class="top_button" :style="{bottom : setBottom()}"></div>

</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';


const bodyHeight = ref(0);
const documentScrollTop = ref(0)
const footerRef = ref<HTMLElement | null>(null)

const MARGIN = 30

const updateScroll = () => {
  documentScrollTop.value = window.scrollY || document.documentElement.scrollTop;
};

const goTop = ()=>{
  window.scrollTo({top:0, behavior:'smooth'})
}

const setBottom = ()=>{
  if(!footerRef.value) return
  const documentHeight = Math.max( document.body.scrollHeight, document.body.offsetHeight);

  const footerHeight = footerRef.value.getBoundingClientRect().height
  footerHeight
  const gap = documentHeight - footerHeight - window.innerHeight
  const bottom = documentScrollTop.value - gap 
  if(documentScrollTop.value > gap + MARGIN){
      return bottom + MARGIN + 'px'
    }
    else{
      return MARGIN + 'px'
    }
}

onMounted(() => {
  // 컴포넌트가 마운트된 후에 document.body의 높이를 계산
  bodyHeight.value = document.body.scrollHeight;
  window.addEventListener('scroll', updateScroll);
});
onUnmounted(() => {
  // 컴포넌트가 언마운트되면 스크롤 이벤트 리스너 제거
  window.removeEventListener('scroll', updateScroll);
});
</script>