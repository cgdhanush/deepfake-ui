<script setup>
import Hero from '@/components/Hero.vue';
import DeepfakeListings from '@/components/DeepfakeListings.vue';
</script>

<template>
  <Hero />
  <DeepfakeListings :limit="3" :showButton="true" />
</template>
