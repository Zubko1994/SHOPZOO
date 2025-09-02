<script setup lang="ts">

import Layout from '../layout/Layout.vue'
import CardsAnimal from '../components/CardsAnimal.vue'
import MenuCrumbs from '../components/MenuCrumbs.vue'
import Catalog from '../components/Catalog.vue'
import PopularGoods from '../components/PopularGoods.vue'
import ArticleAll from '../components/ArticleAll.vue'
</script>

<template>
 <Layout>
  <Catalog/>
  <PopularGoods/>
  <ArticleAll/>

 </Layout>
</template>

<style lang="scss" scoped>
</style>
