<!-- @format -->
<script setup lang="ts">
import { ref, defineEmits, computed } from 'vue';
import Button from './Button.vue';

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

function quantityHandler (item: string){
  selectedItem.value = item
  console.log(item)
  emit('updateQuantity', item);
  
}
</script>

<template>
  <div class="wrapper-quantity">
    <Button v-for="item in listItems" :key="item" @custom-click="quantityHandler(item)"  kind="quantity-price" :isActive="item === selectedItem">
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

</style>
