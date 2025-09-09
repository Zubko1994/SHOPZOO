<script setup lang="ts">
import BrendNameFilter from './BrendNameFilter.vue';
import { ref, computed, watch } from 'vue'
import Text from '../components/Text.vue'
import Button from './Button.vue'
import { useRouter } from 'vue-router' 


interface Brend  {
  id: number
  name: string
  image: string
}

interface BrendObj {
  count: number
  next: string | null
  previous: string | null
  results: Brend[]
}

const router = useRouter()

const dataBrend = ref<BrendObj | null>(null)
fetch('https://oliver1ck.pythonanywhere.com/api/get_brands_list/')
  .then(resp => resp.json())
  .then(data => dataBrend.value = data)

  const searchQuery = ref('')
  const selectedItems = ref<number[]>([])

const emit = defineEmits(['upBrand', 'searchBrand', 'hasBrandResult']);

const handleSearch = (event: Event) => {
  searchQuery.value = (event.target as HTMLInputElement).value;
  emit('searchBrand', searchQuery.value); // Отправляем запрос родителю
}

function quantityHandler(item: number, isChecked: boolean) {
  if (isChecked) {
    if(!selectedItems.value.includes(item)){
      selectedItems.value.push(item)
    }
  } else {
    selectedItems.value = selectedItems.value.filter(id => id !== item);
    emit('upBrand', null);
   
  }
  emit('upBrand', [...selectedItems.value])
  searchQuery.value = '';
}

const filteredBrands = computed(() => {
  if (!dataBrend.value) return [];
  
  if (!searchQuery.value.trim()) {
    return dataBrend.value.results;
  }
  
  const query = searchQuery.value.toLowerCase().trim();
  return dataBrend.value.results.filter(brand => 
    brand.name.toLowerCase().includes(query)
  );
})

watch(filteredBrands, (newVal) => {
  const hasResult = newVal.length > 0 || searchQuery.value === '';
  emit('hasBrandResult', hasResult);
}, {immediate: true}
)
;
const goToCatalog = () => {
// Сбрасываем внутреннее состояние
searchQuery.value = '';
selectedItems.value = [];
// Сообщаем родителю о сбросе брендов
emit('upBrand', []);
// Также, если родительский компонент использует searchBrand, то сбросим и это
emit('searchBrand', '');
}
</script>

<template>
  <div class="wrapper-brand">
    <Text
        tag="p"
        print="author"
        title="Бренд"
        class="title-filter"
    />
    <div class="brand-list">
      <div class="search-field">
    <label for="search"></label>
    <input class="search" type="text" placeholder="Поиск" :value="searchQuery"
    @input="handleSearch">
    <img class="magnifier" src="../assets/image/Search.png" alt="иконка лупы">
      </div>
  
    <BrendNameFilter @customClick="quantityHandler" :isChecked="selectedItems.includes(brand.id)" name="brand" v-for="brand in filteredBrands" :key="brand.id" :title="brand.name" :brand="brand.id" :id="brand.id"/>
    <div v-if="filteredBrands.length === 0" class="no-results">
        <img src="../assets/image/dogsearch.png" alt="изображение собаки">
        <Text
        class="no-results_description"
        tag="p"
        print="noresult"
        title="По вашему запросу ничего не найдено. Попробуйте изменить запрос или выбрать бренд в нашем каталоге"
    />
    <Button kind="primary" class="primary-button" @click="goToCatalog">Перейти в каталог</Button>
      </div>
  </div>
  </div>
</template>

<style lang="scss" scoped>

.search {
  border: 1px solid rgba(186, 191, 195, 1);
  width: 340px;
  display: none;
}

.search-field {
  display: flex;
  // flex: 0 1 340px;
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
}

.magnifier {
  position: absolute;
  top: 10px;
  left: 6px;
  display: none;
}

.wrapper-brand {
  padding: 16px;
  background-color: var(--white);
  max-width: 270px;
  // max-height: 350px;
}

// .title-filter {
//   margin-bottom: 16px;
// }

.brand-list {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.no-results {
  text-align: center;
  color: var(--white);
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.no-results_description {
  display: block;
  max-width: 230px;
}

.primary-button {
  margin: 0;
}


@media (max-width: 576px) {
  .container {
    max-width: 576px;
  }
  .wrapper-brand {
   min-width: 340px;
   padding-bottom: 90px;
  }

  .search {
  display: block;
}


.magnifier {
  display: block;
}
}
</style>
