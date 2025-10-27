<script setup lang="ts">

import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import HeaderActive from '../components/HeaderActive.vue'
import { provide, ref, onMounted } from 'vue'; // ДОБАВЬТЕ onMounted
import { useRouter } from 'vue-router';


const router = useRouter();
const props = defineProps<{
  isActive?: boolean
}>();

const products = ref([]);

const loadAllProducts = async () => {
  try {
    console.log('Loading products for search in Layout...');
    const allProducts = [];
    
    for (let page = 1; page <= 7; page++) {
      const url = `https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create&page=${page}`;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        if (data.results && Array.isArray(data.results)) {
          const validProducts = data.results.filter(product => 
            product && product.id && product.title
          );
          allProducts.push(...validProducts);
        }
      } catch (error) {
        console.error(`Error loading page ${page}:`, error);
      }
    }
    
    products.value = allProducts;
    console.log(`Loaded ${allProducts.length} valid products for search in Layout`);
    
  } catch (error) {
    console.error('Error loading products for search in Layout:', error);
    products.value = [];
  }
};

onMounted(() => {
  loadAllProducts(); // ВЫЗОВИТЕ ЗАГРУЗКУ ПРОДУКТОВ
});

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
  console.log('Product selected in layout:', product);
  // Переход на страницу товара
  if (product && product.id) {
    router.push(`/productdescription/${product.id}`);
  }
  emit('selectProduct', product);
}


</script>
<template>
<div class="layout-wrapper">
  
<Header :products="products" 
    @searchProduct="searchProduct" 
    @selectProduct="selectProduct" 
    class="header" />
<HeaderActive :products="products"
    @searchProduct="searchProduct"
    @selectProduct="selectProduct" 
    :isActive="isActive || isFiltersOpen" 
    class="header-active"   
    @update:isActive="updateHeaderState"
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
