<!-- @format -->
<script setup lang="ts">
import { ref } from 'vue';
import Button from './Button.vue';

const selectedItem = ref<string | null>(null)

const props = defineProps<{
  list: string[],
  value: number,
  unit: string[],

}>()

function quantityHandler (item: string){
  console.log(item);
  selectedItem.value = item
}
</script>

<template>
  <div class="wrapper-quantity">
    <Button v-for="item in props.list" @custom-click="quantityHandler(item)" kind="quantity" :isActive="item === selectedItem">
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
