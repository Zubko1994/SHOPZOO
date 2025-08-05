<script setup lang="ts">
import BrendNameFilter from './BrendNameFilter.vue';
import { ref } from 'vue'
import Text from '../components/Text.vue'

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

const dataBrend = ref<BrendObj | null>(null)
fetch('https://oliver1ck.pythonanywhere.com/api/get_brands_list/')
  .then(resp => resp.json())
  .then(data => dataBrend.value = data)



  const selectedItems = ref<number[]>([])

const emit = defineEmits(['upBrand']);

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
    <BrendNameFilter @customClick="quantityHandler" :isChecked="selectedItems.includes(brand.id)" name="brand" v-for="brand in dataBrend?.results" :key="brand.id" :title="brand.name" :brand="brand.id" :id="brand.id"/>
    
  </div>
  </div>
</template>

<style lang="scss" scoped>

.wrapper-brand {
  padding: 16px;
  background-color: var(--white);
  max-width: 270px;
}

.title-filter {
  margin-bottom: 16px;
}

.brand-list {
  display: flex;
  flex-direction: column;
  gap: 22px;
}
</style>
