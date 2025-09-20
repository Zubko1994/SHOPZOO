<!-- @format -->

<script setup lang="ts">
import CardAnimal from './CardAnimal.vue'
import { ref, computed, watch } from 'vue'

interface Animal {
  id: number
  type: string
  image: string
}

interface AnimalObj {
  count: number
  next: string | null
  previous: string | null
  results: Animal[]
}

const props = defineProps<{
  selectedId?: number | null, 
  selectedCategory?: number | null
}>();



const dataAnimal = ref<AnimalObj | null>(null)
fetch('https://oliver1ck.pythonanywhere.com/api/get_animals_list/')
  .then((resp) => resp.json())
  .then((data) => (dataAnimal.value = data))


const selectedItem = ref<object | null>(null)



const emit = defineEmits(['updateAnimal', 'updateCategory']);


// function quantityHandler (item: Animal){
//   if (selectedItem.value?.id === item.id) {
//     selectedItem.value = null;
//     emit('updateAnimal', null);
//     emit('updateCategory', null); // Эмитим сброс категории
//   } else {
//     selectedItem.value = item;
//     emit('updateAnimal', item);
//     emit('updateCategory', item.type); // Эмитим выбранную категорию
//   }
// }

watch(() => props.selectedCategory, (newVal) => {
  if (newVal && dataAnimal.value) {
    const animal = dataAnimal.value.results.find(a => a.id === newVal)
    selectedItem.value = animal || null
  } else {
    selectedItem.value = null
  }
}, { immediate: true })

watch(() => props.selectedId, (newId) => {
  if (newId && dataAnimal.value) {
    const animal = dataAnimal.value.results.find(a => a.id === newId);
    if (animal) {
      selectedItem.value = animal;
      emit('updateAnimal', animal);
      emit('updateCategory', animal.id);
    }
  } else {
    selectedItem.value = null;
    emit('updateAnimal', null);
    emit('updateCategory', null);
  }
});

function quantityHandler(item: Animal) {
  if (selectedItem.value?.id === item.id) {
    selectedItem.value = null;
    emit('updateAnimal', null);
    emit('updateCategory', null);
    console.log(selectedItem.value)
  } else {
    selectedItem.value = item;
    emit('updateAnimal', item);
    emit('updateCategory', item.id); 
    console.log(item.id)
  }
  console.log(item.id)
}

</script>

<template>
  <section class="animal">
    <div class="animal-wrapper">
      <div class="container">
        <div class="wrapper-card">
          <CardAnimal 
            @customClick="quantityHandler(cardAnimal)" :isActive="selectedItem?.id === cardAnimal.id"
            :notIsActive="selectedItem !== null && selectedItem.id !== cardAnimal.id"
            :id="cardAnimal.id"
            v-for="cardAnimal in dataAnimal?.results"
            :key="cardAnimal.id"
            :image="cardAnimal.image"
            :type="cardAnimal.type"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.animal {
  background: var(--bg-default);
}

.animal-wrapper {
  padding: 24px 5px 14px 5px;
}

.wrapper-card {
  display: flex;
  gap: 16px;
  // flex-wrap: wrap;
  justify-content: space-between;
  overflow-x: scroll;
}

.wrapper-card::-webkit-scrollbar {
  width: 0px;
}

@media (max-width: 992px) {
  .container {
    max-width: 992px;
  }

  .animal-wrapper {
    padding: 60px 5px 16px 5px;
  }
}


</style>
