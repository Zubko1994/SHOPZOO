<script setup lang="ts">
import { reactive } from 'vue'
import Text from '../components/Text.vue'
import RadioButton from './RadioButton.vue';
import { ref, computed, watch } from 'vue'

interface Cards {
  id: number
  image_prev: string
  title: string
  price: number
  countitemproduct_set: string[]
  animal: { id: number; title: string }[]
  brand:  {id: number; name: string; image: string}
  category: { id: number; name: string; parent: number}

}


interface kindGoods {
  id: number
  name: string | null
 title: string | null
  key?: number
}[]

interface Types {
  id: number
  name: string | null
  parent?: number | null
}



interface TypesObj {
  results: Types[]
}

interface Category {
  id: number;
  name: string | null;
  parent: number | null;
}

const dataType = ref<TypesObj | null>(null)
const selectedParent = ref<number | null>(null)
  const selectedChildren = ref<number[]>([])

// Загрузка данных
fetch('https://oliver1ck.pythonanywhere.com/api/get_category_products_list/')
  .then(resp => resp.json())
  .then(data => dataType.value = data)



function emitSelectedCategories() {
  const allSelected = [
    ...(selectedParent.value ? [selectedParent.value] : []),
    ...(selectedChildren.value)
  ];
  watch(selectedParent, (newVal) => {
  if (newVal) allSelected.splice(1, allSelected.length - 1);
});


     
  
  console.log("Emitting categories:", allSelected); // Добавьте лог для отладки
  emit('selectedTypeGoods', allSelected.length ? allSelected : null);

}




  const parentCategories = computed(() => {
  return dataType.value?.results.filter(c => c.parent === null) || []
})

// Получаем подкатегории для выбранного родителя
const childCategories = computed(() => {
  if (!selectedParent.value) return []
  return dataType.value?.results.filter(c => c.parent === selectedParent.value) || []
})

function handleParentSelect(category: Category) {
  if (selectedParent.value === category.id) {
    selectedParent.value = null
    selectedChildren.value = []; // Снимаем выбор при повторном клике
  } else {
    selectedChildren.value = []
    selectedParent.value = category.id
  }
  emitSelectedCategories();
}


function handleChildSelect(childId: number) {

  if (selectedChildren.value.includes(childId)) {
    selectedChildren.value = selectedChildren.value.filter(id => id !== childId);
  } else {
    selectedChildren.value = [...selectedChildren.value, childId];
  }
  emitSelectedCategories(); // Обновляем фильтр
}


console.log(dataType)

  const props = defineProps<{
  id?: number
  title?: string
  name: string
  list?: string[]
  checked?: boolean,
  selectedType?: number | null
}>()



  const selectedItemType = ref<number | null>(null)

const emit = defineEmits(['selectType', 'upType', 'selectedTypeGoods']);


function upTypeCategory (category: number) {
 if(selectedItemType.value === category){
  emit('selectedTypeGoods', category)
 } else {
  console.log(category)
 }
}


</script>

<template>
  <div class="wrapper-filter">
    <Text
        tag="p"
        print="author"
        title="Тип товара"
        class="title-filter"
    />
  <div class="filter-animal">
      <div v-for="category in parentCategories" :key="category.id" class="category-item">
        <!-- Родительская категория -->
        <RadioButton 
          @giveType="handleParentSelect(category)" 
          @upTypeCategory="upTypeCategory"
          :checked="selectedParent === category.id"
          :name="category.name" 
          :id="category.id" 
          :title="category.name"
        />
        
        <!-- Контейнер для дочерних категорий (всегда присутствует) -->
        <div class="child-categories-container">
          <!-- Подкатегории (показываем только если есть дети и выбран родитель) -->
          <div 
            v-if="selectedParent === category.id && childCategories.length > 0" 
            class="child-categories"
          >
            <div v-for="child in childCategories" :key="child.id" class="action">
              <input 
                class="checkbox" 
                type="checkbox" 
                :id="`checkbox-${child.id}`" 
                :checked="selectedChildren.includes(child.id)"
        @change="handleChildSelect(child.id)"
              />
              <label :for="`checkbox-${child.id}`"></label>
              <Text 
                tag="p" 
                print="check-box" 
                class="check-box_title" 
                :title="child.name" 
              />
            </div>
          </div>
          
          <!-- Пустой блок для выравнивания, когда нет детей -->
          <div 
            v-else-if="selectedParent === category.id" 
            class="empty-child-categories"
          ></div>
        </div>
      </div>
     
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

label {
  display: block;
  border: 2px solid rgb(140, 145, 150);
  border-radius: 4px;
  width: 18px;
  height: 18px;
  background-color: var(--white);
  margin-right: 5px;
  background-image: url('../assets/svg/check.svg');
  background-repeat: no-repeat;
  background-size: 10px 8px;
  background-position: center;

}

input {
  display: none;
}
input:checked + label {
  background-color: var(--Action-Primar-Default);
 
}

.checkbox:checked {
  background: var(--Action-Primar-Default);
  
}

.child-categories {
  box-sizing: border-box;
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.check-box_title {
  text-wrap: nowrap;
  // margin-left: 20px;
}

.action {
  display: flex;
  gap: 5px;
  align-items: center;
  margin-left: 20px;
}

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

.category-item {
  display: flex;
  flex-direction: column;
  // gap: 8px;
}

.child-categories-container {
  min-height: 0; // Важно для анимаций
  transition: all 0.3s ease;
}

.child-categories {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.empty-child-categories {
  height: 0;
  visibility: hidden;
}

.action {
  display: flex;
  gap: 8px;
  align-items: center;
}

</style>
