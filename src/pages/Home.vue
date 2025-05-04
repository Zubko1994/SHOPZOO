<!-- @format -->

<script setup lang="ts">
import Layout from '../layout/Layout.vue'
import CardsAnimal from '../components/CardsAnimal.vue'
import Presentation from '../components/Presentation.vue'
import PromotionAll from '../components/PromotionAll.vue'
import PopularGoods from '../components/PopularGoods.vue'
import NewGoods from '../components/NewGoods.vue'
import BrendAll from '../components/BrendAll.vue'
</script>

<template>
  <Layout>
    <CardsAnimal />
    <Presentation />
    <PromotionAll />
    <PopularGoods />
    <NewGoods />
    <BrendAll />
  </Layout>
</template>

<style lang="scss" scoped></style>
