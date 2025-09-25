<!-- @format -->

<script setup lang="ts">

import { ref } from 'vue'
import Text from './Text.vue'
import Brend from './Brend.vue'

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


</script>

<template>
  <section class="brends">
    <div class="brends_wrapper">
      <div class="container">
        <Text class="brends_title" tag="h2" print="title-brends" title="Все бренды" />
        <div class="cards_wrapper">
          <Brend class="brends-item" v-for="brend in dataBrend?.results" :key="brend.id" :src="brend.image"/>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.brends_wrapper {
  padding: 40px 5px 70px 5px;
  background-color: var(--bg-default);
}

.cards_wrapper {
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
  justify-content: center;
}

.brends_title {
  margin-bottom: 40px;
}

.brends-item {
    max-width: 174px;
    height: 115px;
    width: 100%;
}

@media (max-width: 992px) {

.container {
    max-width: 992px;
}

.brends_wrapper {
  padding: 0px 5px 64px 5px;
}

.brends-item {
    max-width: 162px;
    max-height: 107px;
}

.brends_title {
  margin-bottom: 32px;
  padding-top: 32px;
  font-weight: 700;
  font-style: Bold;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: 0px;
}

.cards_wrapper {
  gap: 15px 14px;
}

}
</style>
