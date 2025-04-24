<script setup lang="ts">

  const props = defineProps({
  src: {
    type: String,
  },
})

</script>

<template>
  <div :class="'wrapper-image'">
    <img :class="'imageCard'" :src="props.src" alt="">
  </div>
</template>

<style lang="scss" scoped>
.wrapper-image {
  max-height: 130px;
  max-width: 254px;
}

.imageCard {
  max-height: 100%;
  max-width: 100%;
}

</style>
