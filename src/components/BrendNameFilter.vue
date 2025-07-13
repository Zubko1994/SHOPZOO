<!-- @format -->

<script setup lang="ts">
import Text from '../components/Text.vue'

const props = defineProps<{
  title: string
  id: number
}>()
</script>

<template>
  <div class="action">
    <input class="brand" type="checkbox" id="brand" />
    <label for="brand"><Text tag="p" print="brand-name" :title="props.title" /></label>
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
