<!-- @format -->
<script setup lang="ts">
import Button from './Button.vue';
import { ref, defineEmits, computed, onMounted, watch } from 'vue';

const selectedItem = ref<any | null>(null)

const props = defineProps<{
  list?: any[],
  value?: number,
  unit?: string[],
  price?: number,
selected?: string | null
}>()

const emit = defineEmits(['updateQuantity']);

const listItems = computed(() => {
  console.log('List in QuantityWithPrice:', props.list)
  return props.list || []
})

// АВТОМАТИЧЕСКИЙ ВЫБОР ПЕРВОЙ ФАСОВКИ
onMounted(() => {
  if (listItems.value.length > 0 && !selectedItem.value) {
    selectedItem.value = listItems.value[0];
    emit('updateQuantity', listItems.value[0]);
  }
})

// Следим за изменениями списка
watch(listItems, (newList) => {
  if (newList && newList.length > 0 && !selectedItem.value) {
    selectedItem.value = newList[0];
    emit('updateQuantity', newList[0]);
  }
})


function quantityHandler(item: any) {
  selectedItem.value = item
  emit('updateQuantity', item) // передаем объект {value, unit}
}
</script>

<template>
  <div class="wrapper-quantity">
    <Button v-for="item in listItems" :key="item" @custom-click="quantityHandler(item)"  kind="quantity-price" :isActive="item === selectedItem || (!selectedItem && item === listItems[0])">
      <div class="wrapper">
        <div>{{item.value}} {{item.unit}}</div>
        <div class="quantity-price-price">{{(props.price*item.value).toFixed(2)}} BYN</div>
      </div>
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

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: flex-start;
  
}

.quantity-price-price{
  font-weight: 400;
    line-height: 110%;
}

.wrapper-quantity {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 4px;
}

.wrapper-quantity .button {
  width: 100%; /* Занимает всю ширину ячейки grid */
}
</style>
