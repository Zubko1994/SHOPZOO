<script setup lang="ts">

  const props = defineProps({
  src: {
    type: String,
  },
})



</script>

<template>
  <div class="brend-image_wrapper">
    <img class="brend-image" :src="props.src" alt="изображение бренда">
  </div>
</template>

<style lang="scss" scoped>

.brend-image_wrapper {
  max-height: 115px;
  max-width: 174px;
  padding: 14px 20px;
  background-color: var(--white);
  border-radius: 4px;
  &:hover {
    cursor: pointer;
  }
}

.brend-image {
  width: 100%;
  height: 100%;
  // display: block;
}

@media (max-width: 992px) {

.container {
    max-width: 992px;
}

.brend-image_wrapper {
  max-height: 58px;
  max-width: 80px;
  padding: 8px;
}




}


</style>
