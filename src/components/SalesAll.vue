<!-- @format -->

<script setup lang="ts">

import { ref } from 'vue'
import Text from './Text.vue'
import Sale from './Sale.vue'

interface Sale  {
  id: number, 
  title: string
  percent: number
  start_sale: string
  stop_sale: string
  image: string
}

interface SalesObj {
  count: number
  next: string | null
  previous: string | null
  results: Sale[]
}

const dataSales = ref<SalesObj | null>(null)
fetch('https://oliver1ck.pythonanywhere.com/api/get_sales_list/')
  .then(resp => resp.json())
  .then(data => dataSales.value = data)


</script>

<template>
  <section class="sales">
    <div class="sales_wrapper">
      <div class="container">
        <Text class="sales_title" tag="h2" print="title" title="Акции" />
        <div class="cards_wrapper">
          <Sale v-for="sale in dataSales?.results.slice(1, 2)" :id="sale.id" :image="sale.image" :percent="sale.percent" :start_sale="sale.start_sale" :stop_sale="sale.stop_sale" :title="sale.title"/>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.sales_wrapper {
  padding: 30px 5px;
  background-color: var(--bg-default);
  height: 82vh;
}

.cards_wrapper {
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.sales_title {
  margin-bottom: 41px;
}


@media (max-width: 992px) {

.container {
    max-width: 992px;
}

.sales_title {
  padding-top: 26px;
}


.sales_wrapper {
  padding: 0px 5px 56px 5px;
  height: 75vh;
}

.cards_wrapper {
  gap: 15px;
}

}
</style>
