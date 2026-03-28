<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useSeoMeta } from '#imports'

useSeoMeta({
  titleTemplate: (titleChunk) => {
    return titleChunk && titleChunk !== 'MustachPhone - On-Site Device Repair' 
      ? `${titleChunk} - MustachPhone` 
      : 'MustachPhone - Fast On-Site Screen Repair'
  },
  ogTitle: 'MustachPhone - Reliable On-Site Screen Repair',
  description: 'MustachPhone provides fast, professional on-site screen, battery, and logic board repair services for iPhones and Samsung galaxies.',
  ogDescription: 'Get your phone fixed at your desk! Fast, reliable on-site screen and battery repair by certified technicians.',
  ogImage: '/images/logo.png',
  twitterCard: 'summary_large_image',
})
</script>
