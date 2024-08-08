<template>
  <header class="header dp-flex">
    <div class="content-wrap dp-flex dp-between">
      <div class="logo" @click="router.push('/')"></div>
      <nav class="dp-flex mobile_hidden">
        <router-link to="/#service">서비스 소개</router-link>
        <router-link to="/#solution">솔루션</router-link>
        <router-link to="/#platform">플랫폼</router-link>
        <router-link to="/#info">이용 안내</router-link>
        <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
      </nav>
      <div class="header-right dp-flex">
        <div class="call-icon"></div>
        <button class="border-button" @click="router.push('contact-us')">문의하기</button>
      </div>
    </div>

  </header>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>