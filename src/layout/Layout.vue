<script setup lang="ts">

import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import HeaderActive from '../components/HeaderActive.vue'
import { provide, ref } from 'vue';

const props = defineProps<{
  isActive?: boolean
}>();

// const isFiltersOpen = ref(false);

const emit = defineEmits(['update:isActive', 'searchProduct', 'selectProduct']);

const isFiltersOpen = ref(props.isActive || false);

const updateHeaderState = (active: boolean) => {
  isFiltersOpen.value = active;
  emit('update:isActive', active);
};

const searchQuery = ref('')

const searchProduct = (query: string) => {
  searchQuery.value = query
  emit('searchProduct', searchQuery.value);
}

const selectProduct = (product: any) => {
  emit('selectProduct', product);
  // Можно добавить логику перехода к товару
  console.log('Product selected in layout:', product);
}



</script>
<template>
<div class="layout-wrapper">
  
<Header @searchProduct="searchProduct" 
    @selectProduct="selectProduct" class="header" />
<HeaderActive :isActive="isActive || isFiltersOpen" class="header-active"   @update:isActive="updateHeaderState"
/>
<main class="main-content">
  <slot :isFiltersOpen="isFiltersOpen" />
</main>
<Footer class="footer" />
</div>
</template>

<style lang="scss" scoped>

.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
}

.main-content {
  flex: 1 0 auto; // Растягивается чтобы занять доступное пространство
  width: 100%;
}

.header-active {
    display: none;
}

.footer {
  flex-shrink: 0; // Не сжимается
}

.header {
    display: block;
}


@media (max-width: 992px) {

.container {
    max-width: 992px;
}

.header-active {
    display: block;
}

.header {
    display: none;
}

}
</style>
