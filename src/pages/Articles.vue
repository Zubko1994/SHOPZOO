<script setup lang="ts">

import Layout from '../layout/Layout.vue'
import CardsAnimal from '../components/CardsAnimal.vue'
import MenuCrumbs from '../components/MenuCrumbs.vue'
import Contacts from '../components/Contacts.vue'
import PopularGoods from '../components/PopularGoods.vue'

import { ref } from 'vue';


</script>

<template>
 <Layout>
  <MenuCrumbs class="crumbs-menu" link="articles" to="/articles" title="Статьи"/>
  <CardsAnimal/>
  <PopularGoods/>
  <ArticleAll/>
  
 </Layout>
</template>

<style lang="scss" scoped>
</style>
