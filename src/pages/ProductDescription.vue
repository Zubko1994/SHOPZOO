<script setup lang="ts">

import Layout from '../layout/Layout.vue'

import PopularGoods from '../components/PopularGoods.vue'
import ArticleAll from '../components/ArticleAll.vue'
import BuyTogether from '../components/BuyTogether.vue'
import MenuCrumbsProductDescription from '../components/MenuCrumbsProductDescription.vue'
import DescriptionOfGoods from '../components/DescriptionOfGoods.vue'
import { ref } from 'vue';

const searchQuery = ref('')
const emit = defineEmits(['searchProduct']);

const searchProduct = (query: string) => {
  searchQuery.value = query
  emit('searchProduct', searchQuery.value);
  console.log(searchQuery.value)
}


</script>

<template>
 <Layout @searchProduct="searchProduct" :searchQuery="searchQuery">
  <MenuCrumbsProductDescription class="crumbs-menu" link="productdescription" to="/productdescription" title="Каталог"/>
  <DescriptionOfGoods/>

   <PopularGoods/>
   <BuyTogether/>
   <ArticleAll/>
 </Layout>
</template>

<style lang="scss" scoped>



@media (max-width: 992px) {

.crumbs-menu {
  display: block;
  position: relative;
  z-index: 100;
  top: 40px;
  margin-bottom: 24px;
}
}
</style>
