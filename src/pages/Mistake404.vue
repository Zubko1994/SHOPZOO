!<script setup lang="ts">
import Layout from '../layout/Layout.vue'
import Mistake from '../components/Mistake.vue';
import { ref, onMounted } from 'vue';


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
  <Mistake/>
  </Layout>
</template>

<style lang="scss" scoped>


</style>