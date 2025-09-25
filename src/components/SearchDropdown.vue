<!-- @format -->

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Text from '../components/Text.vue'
import Button from './Button.vue'

interface Product {
  id: number
  title: string
  image_prev: string
  price: string
}

const props = defineProps<{
  searchQuery: string
  products: Product[]
  isVisible: boolean
}>()

const emit = defineEmits(['selectProduct', 'closeDropdown'])

const filteredProducts = computed(() => {
  if (!props.searchQuery.trim()) return []

  const query = props.searchQuery.toLowerCase().trim()
  return props.products
    .filter((product) => product.title.toLowerCase().includes(query))
    .slice(0, 5) // Ограничиваем количество результатов
})

const selectProduct = (product: Product) => {
  emit('selectProduct', product)

  emit('closeDropdown')
}
</script>

<template>
  <div
    v-if="isVisible && searchQuery && filteredProducts.length > 0"
    class="search-dropdown"
  >
    <div class="dropdown-content">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="dropdown-item"
        @click="selectProduct(product)"
      >
        <img
          :src="product.image_prev"
          :alt="product.title"
          class="product-image"
        />
        <div class="product-info">
          <span class="product-title">{{ product.title }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="no-results" v-if="filteredProducts.length === 0 && searchQuery">
    <img class="search-image" src="../assets/image/dogsearch.png" alt="изображение собаки" />
    <Text
      class="no-results_description"
      tag="p"
      print="noresult"
      title="По вашему запросу ничего не найдено. Попробуйте изменить запрос или выбрать товары в нашем каталоге"
    />
    <div>
      <Button kind="primary" class="primary-button" 
        ><RouterLink to="/catalog" class="link_button" :class="['item']"
        >Перейти в каталог</RouterLink></Button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 392px;
  overflow-y: auto;
  margin-right: 12px;
  margin-left: 30px;
  top: 44px;
}

.search-dropdown::-webkit-scrollbar {
  width: 0;
}

.dropdown-content {
  padding: 8px 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
}

.product-image {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 3px;
  margin-right: 8px;
}

.product-info {
  display: flex;
  flex-direction: column;
}

.product-title {
  margin-bottom: 2px;
  color: var(--text-default);
  font-family: 'SFProText';
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
}

.product-price {
  font-size: 12px;
  color: #666;
  font-weight: bold;
}

.search-field {
  position: relative;
}

// .search-dropdown {
//   position: absolute;
//   top: 100%;
//   left: 0;
//   right: 0;
//   background: white;
//   border: 1px solid #e0e0e0;
//   border-radius: 8px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   z-index: 1000;
//   max-height: 300px;
//   overflow-y: auto;

// }

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f8f9fa;
  }
}

.product-image {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 12px;
}

.product-info {
  flex: 1;
}

.product-title {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
}

.product-price {
  font-size: 12px;
  color: #007bff;
  font-weight: 600;
}

.no-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 392px;
  overflow-y: hidden;
  margin-right: 12px;
  margin-left: 30px;
  top: 44px;
  padding: 56px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
}

.primary-button {
  margin: 0 auto;
  display: block;
}

.search-image {
  width: 132px;
  height: 132px;
  display: block;
  margin: 0 auto;
}

.link_button {
  color: var(--white);
}
</style>
