<!-- @format -->

<script setup lang="ts">

import { ref } from 'vue'
import Text from './Text.vue'
import Brend from './Brend.vue'
import Button from './Button.vue'

interface Brend  {
  id: number
  image: string
}

interface BrendObj {
  count: number
  next: string | null
  previous: string | null
  results: Brend[]
}

const dataBrend = ref<BrendObj | null>(null)
fetch('https://oliver1ck.pythonanywhere.com/api/get_brands_list/')
  .then(resp => resp.json())
  .then(data => dataBrend.value = data)

  const length = ref(18)

const lengthArray = () => {
  length.value = length.value + 6
}


</script>

<template>
  <section class="brends">
    <div class="brends_wrapper">
      <div class="container">
        <Text class="brends_title" tag="h2" print="title" title="Популярные бренды" />
        <div class="cards_wrapper">
          <Brend v-for="brend in dataBrend?.results.slice(0, length)" :key="brend.id" :src="brend.image"/>
        </div>
        <Button @click="lengthArray" class="show-brends" kind="primary">Смотреть больше брендов</Button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.brends_wrapper {
  padding: 56px 5px;
  background-color: var(--bg-default);
}

.cards_wrapper {
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
  margin-bottom: 25px;
  justify-content: center;
}

.brends_title {
  margin-bottom: 24px;
}

.show-brends {
  display: block;
  margin: 0 auto;
}

@media (max-width: 992px) {

.container {
    max-width: 992px;
}

.brends_wrapper {
  padding: 0px 5px 56px 5px;
}

.cards_wrapper {
  gap: 24px 8px;
}

}
</style>
