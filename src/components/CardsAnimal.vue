<script setup lang="ts">
import CardAnimal from './CardAnimal.vue';
import { ref } from 'vue'

interface Animal  {
  id: number
  type: string
  image: string
}
interface AnimalObj {
  count: number
  next: string | null
  previous: string | null
  results: Animal[]
}

const dataAnimal = ref<AnimalObj | null>(null)
fetch('https://oliver1ck.pythonanywhere.com/api/get_animals_list/')
  .then(resp => resp.json())
  .then(data => dataAnimal.value = data)

</script>

<template>
  <section class="animal">
    <div class="animal-wrapper">
      <div class="container">
        <div class="wrapper-card">
        <CardAnimal v-for="cardAnimal in dataAnimal?.results" :key="cardAnimal.id" :image="cardAnimal.image" :type="cardAnimal.type" />
       </div>
      </div>
    </div>

  </section>
</template>

<style lang="scss" scoped>
.animal {
  background: var(--bg-default);
}

.animal-wrapper {
  padding: 24px 5px 24px 5px;
}

.wrapper-card {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: space-between;
}

</style>
