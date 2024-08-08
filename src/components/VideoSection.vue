<template>
  <section class="video" data-bg="#fff">
    <div class="content-wrap">
      <div class="bg-wrap">
        <video id="pc-video" class="pc-bg" autoplay muted loop playsinline ref="pcVideo">
          <source src="/video/taxlove-mainVideo.mp4" type="video/mp4">
        </video>

        <video id="mobile-video" class="mobile-bg" autoplay muted loop playsinline ref="mobileVideo">
          <source src="/video/taxlove-mainVideo.mp4" type="video/mp4">
        </video>
          <button id="retry-button" class="retry-video" ref="retryBtn">
            영상 다시보기
            <span class="icon"></span>
          </button>
          <button
            id="muted_button"
            class="muted-button"
            :class="{ on: isMuted }"
            @click="toggleMute"
            ref="mutedBtn"
          >
            {{ isMuted ? '소리 X' : '소리 O' }}
            <span class="icon"></span>
          </button>
        </div>
      </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const retryBtn = ref<HTMLButtonElement | null>(null);
const pcVideo = ref<HTMLVideoElement | null>(null);
const mobileVideo = ref<HTMLVideoElement | null>(null);
const isMuted = ref(true); // Initial mute state

const retryAction = () => {
  if (pcVideo.value) {
    pcVideo.value.currentTime = 0;
    pcVideo.value.play().catch(error => {
      console.error("Error playing PC video:", error);
    });
  }

  if (mobileVideo.value) {
    mobileVideo.value.currentTime = 0;
    mobileVideo.value.play().catch(error => {
      console.error("Error playing mobile video:", error);
    });
  }
}

const toggleMute = () => {
  isMuted.value = !isMuted.value;

  if (pcVideo.value) {
    pcVideo.value.muted = isMuted.value;
  }

  if (mobileVideo.value) {
    mobileVideo.value.muted = isMuted.value;
  }
}

onMounted(() => {
  if (retryBtn.value) {
    retryBtn.value.addEventListener("click", retryAction);
  }
});
</script>
