<script setup lang="ts">
import { RouterView } from "vue-router";
import router from "@/router";
const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <header>
    <div class="container">
      <button v-if="$route.name !== 'home'" @click="goBack">Go back</button>
      <router-link to="/">Stop explorer</router-link>
    </div>
  </header>
  <section class="container">
    <RouterView />
  </section>
</template>
