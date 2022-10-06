<template>
  <swiper
    :loop="true"
    navigation="true"
    slides-per-view="2"
    space-between="20"
  >
    <swiper-slide v-for="image of props.images">
      <img :src="createImageFromTopicImage(image)" :alt="image.topic_image_id" />
    </swiper-slide>
  </swiper>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

const props = defineProps({ images: Array });

/**
 * @description
 * @param image
 * @returns {string}
 */
function createImageFromTopicImage(image) {
  return `data:image/jpeg;base64,${image.value}`;
}
</script>
