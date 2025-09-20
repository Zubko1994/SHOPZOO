<script setup lang="ts">

import Layout from '../layout/Layout.vue'
import MenuCrumbsArticle from '../components/MenuCrumbsArticle.vue'
import Contacts from '../components/Contacts.vue'
import PopularGoods from '../components/PopularGoods.vue'
import ArticleAll from '../components/ArticleAll.vue'
import ArticleWhole from '../components/ArticleWhole.vue'
import { ref } from 'vue';



</script>

<template>
 <Layout>
  <MenuCrumbsArticle class="crumbs-menu" link="articles" to="/articles" title="Статьи"/>
  <ArticleWhole/>

  <ArticleAll/>
  <PopularGoods/>
  <Contacts/>
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
