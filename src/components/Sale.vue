<!-- @format -->

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Text from './Text.vue'


const props =  
  defineProps<{
  id: number, 
  title: string
  percent: number
  start_sale: string
  stop_sale: string
  image: string
}>()

</script>

<template>
  <div class="card">
        <Text class="card_title" tag="h3" print="title" :title="props.title" />
        <Text class="card_action" tag="p" print="feedback">Скидка {{ props.percent }} %</Text>
        <img class="card_image" :src="props.image" alt="изображение скидки">
        <Text tag="p" print="feedback">Начало акции: {{ props.start_sale}} </Text>
        <Text tag="p" print="feedback">Конец акции: {{ props.stop_sale}} </Text>
    
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 8px;
  background-color: var(--white);
  border-radius: 5px;
  justify-content: space-between;
  align-items: flex-start;
}

.card_image {
    display: block;
    max-width: 335px;
    height: auto;
}


@media (max-width: 576px) {
  .container {
    max-width: 576px;
  }
  
}
</style>
