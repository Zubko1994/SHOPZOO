<!-- @format -->

<script setup lang="ts">
import Text from '../components/Text.vue'

const props = defineProps<{
  image: string
  type: string
}>()
</script>

<template>
  <div class="card-animal">
    <div>
      <img :src="props.image" alt="изображение собаки" />
    </div>
    <div class="wrapper-text">
    <Text tag="h3" print="title" :title="props.type" />
  </div>
  </div>
</template>

<style lang="scss" scoped>

.card-animal {
  display: flex;
  flex: 0 0 215px;
  align-items: center;
  gap: 16px;
  background-color: var(--white);
  cursor: pointer;
}

@media (max-width: 992px) {

.container {
    max-width: 992px;
}

.card-animal {
  flex: 0 1 138px;
  font-size: 15px;
  text-align: center;
  padding-right: 19px;
  gap: 8px;
}

}

</style>
