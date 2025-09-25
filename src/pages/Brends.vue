<script setup lang="ts">

import Layout from '../layout/Layout.vue'
import MenuCrumbs from '../components/MenuCrumbs.vue'
import BrendsAllPage from '../components/BrendsAllPage.vue'
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
  <MenuCrumbs class="crumbs-menu" link="brends" to="/brends" title="Бренды"/>
  <BrendsAllPage/>
 </Layout>
</template>

<style lang="scss" scoped>

@media (max-width: 992px) {

.crumbs-menu {
  display: block;
  position: relative;
  z-index: 100;
  top: 40px;
  margin-bottom: 40px;
}
}

</style>
