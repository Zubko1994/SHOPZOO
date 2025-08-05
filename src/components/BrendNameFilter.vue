<!-- @format -->

<script setup lang="ts">
import Text from '../components/Text.vue'
import { ref } from 'vue'

const props = defineProps<{
  title: string
  id: number
  brand: number
  isChecked: boolean
}>()
const isChecked = ref(false)
const emit = defineEmits(['customClick'])

function handleClick() {
  const newValue = !props.isChecked;
  emit('customClick', props.brand, newValue);
}

</script>

<template>
  <div class="action" >
    <input @click="handleClick" class="brand" type="checkbox" :id="'brand-' + id" :checked="isChecked"/>
    <label :for="'brand-' + id"><Text tag="p" print="brand-name" :title="props.title" /></label>
  </div>
</template>

<style lang="scss" scoped>


.brand {
  -webkit-appearance: none;
  appearance: none;
  border: 2px solid rgb(140, 145, 150);
  border-radius: 4px;
  width: 18px;
  height: 18px;
  margin-right: 5px;
}

.brand:checked {
  background: var(--Action-Primar-Default);
    background-image: url('../assets/svg/check.svg');
    background-repeat: no-repeat;
    background-size: 10px 8px;
    background-position: center;
}

// label {
//   display: block;
//   border: 2px solid rgb(140, 145, 150);
//   border-radius: 4px;
//   width: 18px;
//   height: 18px;
//   background-color: var(--white);
//   margin-right: 5px;
//   background-image: url('../assets/svg/check.svg');
//   background-repeat: no-repeat;
//   background-size: 10px 8px;
//   background-position: center;

// }

// input {
//   display: none;
// }
// input:checked + label {
//   background-color: var(--Action-Primar-Default);

// }

// .brand:checked {
//   background: var(--Action-Primar-Default);

// }

// .check-box_title {
//   text-wrap: nowrap;
//   // margin-left: 20px;
// }

.action {
  display: flex;
  gap: 5px;
  align-items: center;
}
</style>
