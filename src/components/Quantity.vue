<!-- @format -->
<script setup lang="ts">
import { ref, defineEmits, onMounted, watch, computed } from 'vue';
import Button from './Button.vue';

const selectedItem = ref<string | null>(null)

const handleBlur = (event: FocusEvent) => {
  // НЕ ДЕЛАЕМ НИЧЕГО ПРИ ПОТЕРЕ ФОКУСА - ФАСОВКА ОСТАНЕТСЯ АКТИВНОЙ
  console.log('Blur event, but keeping selection');
}

const props = defineProps<{
  list: string[],
  value: number,
  unit: string[],
  price: number,
  selected?: {value: string, unit: string} | null
}>()

const emit = defineEmits(['updateQuantity']);

// АВТОМАТИЧЕСКИЙ ВЫБОР ПЕРВОЙ ФАСОВКИ
onMounted(() => {
  if (props.list && props.list.length > 0 && !selectedItem.value) {
    selectedItem.value = props.list[0];
    emit('updateQuantity', props.list[0]);
  }
})

// Следим за изменениями props.selected
watch(() => props.selected, (newSelected) => {
  if (newSelected) {
    selectedItem.value = newSelected;
  }
})

const isActive = (item: any) => {
  if (!props.selected) return false;
  
  if (typeof item === 'object' && typeof props.selected === 'object') {
    return item.value === props.selected.value && item.unit === props.selected.unit;
  }
  
  // Для обратной совместимости со строковым форматом
  const itemStr = typeof item === 'object' ? `${item.value} ${item.unit}`.trim() : item;
  const selectedStr = typeof props.selected === 'object' ? 
    `${props.selected.value} ${props.selected.unit}`.trim() : props.selected;
  
  return itemStr === selectedStr;
}

const listItems = computed(() => {
  console.log('List in QuantityWithPrice:', props.list)
  return props.list || []
})


function quantityHandler (item: string){
  selectedItem.value = item
  console.log(item)
  emit('updateQuantity', item);
  
}
</script>

<template>
  <div class="wrapper-quantity">
    <Button v-for="item in props.list" @custom-click="quantityHandler(item)" kind="quantity"  :isActive="isActive(item)"  >
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
