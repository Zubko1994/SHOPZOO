<!-- @format -->

<script setup lang="ts">
import Text from '../components/Text.vue'

const props = defineProps<{
  title: string
  id: number
  checked?: boolean,
}>()

const emit = defineEmits(['giveCategory', 'giveType', 'upTypeCategory']);

 function handleClick() {
   emit('giveCategory', props.id, props.checked); 
   emit('giveType', props.id); 
   emit('upTypeCategory', props.id)
   console.log(props.id)
 }
 
</script>

<template>
  <div class="kind-animal" @click="handleClick" :key="props.id">
    <input class="radio" type="radio" name="animal" :id="`radio-${props.id}`" :checked="props.checked"  />
    <label :for="`radio-${props.id}`"
      ><Text
        tag="p"
        print="crumbs-black"
        class="crumbs-black"
        :title="props.title"
        :key="props.id"
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
