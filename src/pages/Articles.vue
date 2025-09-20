<script setup lang="ts">

import Layout from '../layout/Layout.vue'
import CardsAnimal from '../components/CardsAnimal.vue'
import MenuCrumbs from '../components/MenuCrumbs.vue'
import Contacts from '../components/Contacts.vue'
import PopularGoods from '../components/PopularGoods.vue'
import ArticleAllWithFilters from '../components/ArticleAllWithFilters.vue'

import { ref } from 'vue';

const currentCategory = ref<number | null>(null)

// Функция для обработки обновления категории
const handleCategoryUpdate = (categoryId: number | null) => {
  currentCategory.value = categoryId
  console.log('Категория обновлена:', categoryId)
}

</script>

<template>
 <Layout>
  <MenuCrumbs class="crumbs-menu" link="articles" to="/articles" title="Статьи"/>
  <CardsAnimal @updateCategory="handleCategoryUpdate"/>
  <ArticleAllWithFilters :selectedCategory="currentCategory" />
  <PopularGoods/>
  <Contacts/>
 </Layout>
</template>

<style lang="scss" scoped>
</style>
