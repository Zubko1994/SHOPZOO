!<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import Button from './Button.vue';

const selectedItem = ref<string | null>(null)

const props = defineProps<{
  list: string[],
  value: number,
  unit: string[],
  price: number,
   selected?: any
}>()

const handleBlur = (event: FocusEvent) => {
  // НЕ ДЕЛАЕМ НИЧЕГО ПРИ ПОТЕРЕ ФОКУСА - ФАСОВКА ОСТАНЕТСЯ АКТИВНОЙ
  console.log('Blur event, but keeping selection');
}
const isActive = (item: any) => {
  if (!props.selected) return false;
  
  // Сравниваем объекты фасовок
  if (typeof item === 'object' && typeof props.selected === 'object') {
    return item.value === props.selected.value && item.unit === props.selected.unit;
  }
  
  // Для обратной совместимости
  const itemStr = typeof item === 'object' ? `${item.value} ${item.unit}`.trim() : item;
  const selectedStr = typeof props.selected === 'object' ? 
    `${props.selected.value} ${props.selected.unit}`.trim() : props.selected;
  
  return itemStr === selectedStr;
}

const emit = defineEmits(['updateQuantity']);

function quantityHandler (item: string){
  selectedItem.value = item
  console.log(item)
  emit('updateQuantity', item);
}


</script>

<template>
<div class="wrapper-quantity">
    <Button v-for="item in props.list" @custom-click="quantityHandler(item)" kind="quantity-basket" :isActive="isActive(item)"  >
      {{ item.value }} {{ item.unit }}
    </Button>
  </div>
</template>

<style lang="scss" scoped>
.wrapper-quantity {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
}
</style>
