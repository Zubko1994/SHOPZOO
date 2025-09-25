<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import SearchDropdown from '../components/SearchDropdown.vue'

const searchQuery = ref('')
const showDropdown = ref(false)

const props = defineProps<{
products: any[]
}>()

const emit = defineEmits(['searchProduct', 'selectProduct']);

const handleSearch = (event: Event) => {
  searchQuery.value = (event.target as HTMLInputElement).value;
   showDropdown.value = searchQuery.value.length > 0;
  emit('searchProduct', searchQuery.value);
  console.log(searchQuery.value) // Отправляем запрос родителю
}

const handleSelectProduct = (product: any) => {
  searchQuery.value = product.title;
  showDropdown.value = false;
  emit('selectProduct', product);
}

const handleCloseDropdown = () => {
  showDropdown.value = false;
}

// Закрываем dropdown при клике вне компонента
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.search-field')) {
    showDropdown.value = false;
  }
}

// Добавляем обработчик клика вне компонента
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

</script>

<template>
   <div class="search-container"> 
  <div class="search-field">
    <label for="search"></label>
    <input class="search" type="text" placeholder="Поиск" :value="searchQuery" @input="handleSearch" @focus="showDropdown = searchQuery.length > 0">
    <img class="magnifier" src="../assets/image/Search.png" alt="иконка лупы">
  </div>
   <SearchDropdown 
   class="search-dropdown"
      :searchQuery="searchQuery"
      :products="products"
      :isVisible="showDropdown"
      @selectProduct="handleSelectProduct"
      @closeDropdown="handleCloseDropdown"
    />
    </div>
</template>

<style lang="scss" scoped>

.search-dropdown {
  max-width: 529px;
  left: 30px;
  top: 44px;
  margin-right: 12px;
}

.search-container {
  position: relative;
  flex: 0 1 500px;
  width: 80%;
}

.search-field {
  display: flex;
  flex: 0 1 500px;
  position: relative;
}

::placeholder, .search {
  color: var(--text-gray);
  font-family: "SFProText";
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  width: 100%;
  border-radius: 4px;
}

.search {
  padding: 8px 12px 8px 30px;
  position: relative;
}

.magnifier {
  position: absolute;
  top: 10px;
  left: 6px;
}

.no-results {
  text-align: center;
  color: var(--white);
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  position: absolute;
}

.no-results_description {
  display: block;
  max-width: 230px;
}

.primary-button {
  margin: 0;
}

.search {
  position: relative;
}

@media(max-width: 1106px){

}


</style>
