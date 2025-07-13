<!-- @format -->

<script setup lang="ts">
import Text from '../components/Text.vue'

const props = defineProps<{
  title: string
}>()
</script>

<template>
  <div class="kind-animal">
    <input class="radio" type="radio" name="animal" id="radio" />
    <label for="radio"
      ><Text
        tag="p"
        print="crumbs-black"
        class="crumbs-black"
        :title="props.title"
    /></label>
  </div>
</template>

<style lang="scss" scoped>
// label {
//   display: block;
//   border: 2px solid rgb(140, 145, 150);
//   width: 18px;
//   height: 18px;
//   border-radius: 50%;
//   background-color: var(--white);
//   margin-right: 5px;

// }

// input {
//   display: none;
// }

// input:checked + label {
//   background-color: var(--white);
//   background-image: url('../assets/svg/CheckCircle.svg');
//   background-repeat: no-repeat;
//   background-size: 10px 10px;
//   background-position: center;
// }
// label:checked{

//   background-image: url('../assets/svg/CheckCircle.svg');
//   background-repeat: no-repeat;
//   background-size: 10px 10px;
//   background-position: center;
// }

// #radio:checked {

//   background-image: url('../assets/svg/CheckCircle.svg');
//   background-repeat: no-repeat;
//   background-size: 10px 10px;
//   background-position: center;
// }

.kind-animal {
  display: flex;
  gap: 12px;
  align-items: center;
}

.radio {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  display: block;
  border: 2px solid rgb(140, 145, 150);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--white);
  margin-right: 5px;
}

.radio:checked {
  background-image: url('../assets/svg/CheckCircle.svg');
  background-repeat: no-repeat;
  background-size: 10px 10px;
  background-position: center;
}
</style>
