<script setup lang="ts">
import { reactive } from 'vue'
import Text from '../components/Text.vue'
import RadioButton from './RadioButton.vue';
import { ref, computed, watch } from 'vue'
// interface Animal  {
//   id: number
//   title: string
//   type: string
//   image_prev: string
//   price: number
//   key_features: string
//   animal: string
//   compound: string
//   guaranteed_analysis: string
//   nutritional_supplements: string
//   category: string
//   brand: Brand[]
//   sale: string
//   sales_counter: number
//   countitemproduct_set: string
// }



interface animal {
  id: number
  name: string | null
 title: string | null
  key?: number
}



// interface AnimalObj {
//   count: number
//   next: string | null
//   previous: string | null
//   results: Animal[]
//   key: number
// }

// const dataAnimal = ref<AnimalObj | null>(null)
// fetch('https://oliver1ck.pythonanywhere.com/api/get_products_list/')
//   .then(resp => resp.json())
//   .then(data => dataAnimal.value = data)

let animal = [
    {
        id: 1,
        title: "Собаки",
        name: "animal", 
        
    },

    {
        id: 2,
        title: "Кошки",
        name: "animal",
        
    },

    {
        id: 3,
        title: "Грызуны",
        name: "animal",
       
    },

    {
        id: 4,
        title: "Птицы",
        name: "animal",
        
    },

    {
        id: 5,
        title: "Рыбки",
        name: "animal",
      
    },
    
  ]

  const props = defineProps<{
  id?: number
  title: string
  name: string
  list?: string[]
  checked: boolean,
  selectedCategory?: number | null
}>()


// interface Animal {
//   id: number
//   type: string
//   image: string
// }

// interface AnimalObj {
//   count: number
//   next: string | null
//   previous: string | null
//   results: Animal[]
// }
  const reactArray = reactive(animal)

  const selectedItem = ref<number | null>(props.selectedCategory || null)

const emit = defineEmits(['upCategory', 'selectAnimal']);
watch(() => props.selectedCategory, (newVal) => {
  selectedItem.value = newVal
})


function categoruHandler(item: animal) {
  if (selectedItem.value === item.id) {
    selectedItem.value = null;
    emit('upCategory', null);
  } else {
    selectedItem.value = item.id;
    emit('upCategory', item);
    emit('selectAnimal', item.id);
    // emit('upCategory', item)
    // props.checked == !props.checked
  }
}
  console.log(selectedItem.value)
  console.log(props.checked)


</script>

<template>
  <div class="wrapper-filter">
    <Text
        tag="p"
        print="author"
        title="Выберите животного"
        class="title-filter"
    />
  <div class="filter-animal">
    <RadioButton @giveCategory="categoruHandler(animal)" :checked="selectedItem === animal.id"  v-for="animal in reactArray" :name="animal.name" :id="animal.id" :title="animal.title"  />
  </div>
</div>
</template>

<style lang="scss" scoped>

.wrapper-filter {
background-color: var(--white);
padding: 16px;
max-width: 270px;
}

.filter-animal {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.title-filter {
  margin-bottom: 18px;
}
</style>
