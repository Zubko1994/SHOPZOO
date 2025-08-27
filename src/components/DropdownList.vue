<!-- @format -->

<script setup lang="ts">
import { customRef, ref } from 'vue'

// const props = defineProps<{
//   id: Number
//   item: String
//   isActive: Boolean
// }>()


const toggleClassName = ref (false)

const toggleClass = () => {
 toggleClassName.value = !toggleClassName.value
}

const showContent = ref('дате добавления');

const emit = defineEmits (['sort-change'])


const getSortDisplayName = (value: string) => {
  const displayNames: { [key: string]: string } = {
    'date_create': 'дате добавления',
    'title_asc': 'названию: «от А до Я»',
    'title_desc': 'названию: «от Я до А»',
    'price_asc': 'цене по возр.',
    'price_desc': 'цене по убыв.',
    'popularity': 'популярности'
  }
  console.log(value)
  return displayNames[value] || value
}

const changeSort = (sortValue: String) => {
  showContent.value = getSortDisplayName(sortValue)
  emit('sort-change', sortValue)
  toggleClassName.value = false
  console.log(sortValue)
}

console.log(changeSort)


const changeValue = () => {
  showContent.value = "названию: «от Я до А»"
}

const changeValueDate= () => {
  showContent.value = "дате добавления"
}

const changeValueName= () => {
  showContent.value = "названию: «от А до Я»"
}

const changeValuePrice= () => {
  showContent.value = "цене по возр."
}

const changeValuePriceDown= () => {
  showContent.value = "цене по убыв."
}

const changeValuePopular= () => {
  showContent.value = "популярности"
}


console.log(showContent)
</script>

<template>
  <!-- <span class="name-sort">Сортировать по:</span> -->
  <div class="wrapper_sorting" @click="toggleClass">
    <div class="sorting">
      <span>{{ showContent }}</span>
      <div class="arrow-down" 
      :class="['arrow-down', { 'arrow-down-active': toggleClassName }]"></div>
    </div>
    <ul class="wrapper_item" v-if="toggleClassName">
      <li class="elem"@click="changeSort('date_create')">дате добавления</li>
      <li class="elem" @click="changeSort('title_asc')">названию: «от А до Я»</li>
      <li class="elem" @click="changeSort('title_desc')">названию: «от Я до А»</li>
      <li class="elem" @click="changeSort('price_asc')">цене по возр.</li>
      <li class="elem" @click="changeSort('price_desc')">цене по убыв.</li>
      <li class="elem" @click="changeSort('popularity')">популярности</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
span {
  display: block;
}

.wrapper_sorting {
 width: 270px;
z-index: 50;
  
}

// .name-sort {
//   color: var(--text-default);
// font-family: 'SFProText';
// font-size: 14px;
// font-weight: 500;
// line-height: 20px;
// letter-spacing: 0px;
// text-align: right;
// }

.sorting {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  padding: 8px 12px;
  background-color: var(--white);
  color: var(--text-default);
  font-family: 'SFProText';
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
border-radius: 4px;
box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.05);
border: 	1px solid rgb(186, 191, 195);
margin-bottom: 5px;
}

.wrapper_item {
  border-radius: 8px;
box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1),0px 0px 2px 0px rgba(0, 0, 0, 0.2);
background: rgb(255, 255, 255);
border: 	3px solid rgb(186, 191, 195);
border-radius: 4px;
  padding: 8px 4px;
  background-color: var(--white);
  position: absolute;
  width: 270px;
}



.wrapper_item-active {
  display: block;
  padding: 8px 4px;
  z-index: 5;
  position: absolute;
  width: 100%;
}

.elem {
  color: var(--text-default);
  font-family: 'SFProText';
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  padding: 10px 9px;
  width: 100%;
  border-left: 3px solid var(--white);
}

.elem:hover {
  background-color: var(--surface-selected);
  cursor: pointer;
  border-left: 3px solid var(--interactive-default);
  box-shadow: border-box;
}

.arrow-down {
  background-image: url('../assets/svg/PrimaryArrowDown.svg');
  background-repeat: no-repeat;
  width: 12px;
  height: 7px;
}

.arrow-down-active {
  background-image: url('../assets/svg/PrimaryfillTop.svg');
  background-repeat: no-repeat;

}




</style>
