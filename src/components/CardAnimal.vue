<!-- @format -->

<script setup lang="ts">
import Text from '../components/Text.vue'
import { ref, computed } from 'vue'

const props = defineProps<{
  id: number
  image: string
  type: string
  isActive?: boolean
  notIsActive?: boolean
  list?: string[]
}>()


const emit = defineEmits(['customClick'])


// const selectedItem = ref<string | null>(null)


// function quantityHandler (item: string){
//   selectedItem.value = item
//   console.log(item)
//   emit('customClick');
// }

function handleClick() {
  emit('customClick', props.id);
  console.log(props.id) 
}





</script>

<template>
  <div @click="handleClick"  
  :class="['card-animal', { 'card-active': isActive }, { 'card-not-active': notIsActive }]">
    <div>
      <img class="animal-image" :src="props.image" alt="изображение собаки" />
    </div>
    <div class="wrapper-text">
      <Text class="kind-animal" tag="h3" print="title" :title="props.type" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-animal {
  display: flex;
  flex: 0 0 215px;
  align-items: center;
  gap: 16px;
  background-color: var(--white);
  cursor: pointer;
  box-sizing: border-box;
  border: 2px solid var(--white);
}

.card-animal:hover {
  box-shadow: 0px 12px 32px 0px rgba(0, 0, 0, 0.1),
    0px 0px 2px 0px rgba(0, 0, 0, 0.06);

  .kind-animal {
    color: var(--highlight);
  }
}

.card-active {
  box-sizing: border-box;
  border: 2px solid var(--Action-Primar-Default);
  border-radius: 5px;
  background: rgb(255, 255, 255);
  display: flex;
  flex: 0 0 215px;
  align-items: center;
  gap: 16px;
  background-color: var(--white);
  cursor: pointer;
  opacity: 1;
  .animal-image {
    border-radius: 5px;
  }
}

.card-not-active {
  box-sizing: border-box;
  border: 2px solid var(--white);
  border-radius: 5px;
  background: rgb(255, 255, 255);
  display: flex;
  flex: 0 0 215px;
  align-items: center;
  gap: 16px;
  border-radius: 5px;
  background: rgb(255, 255, 255);
  opacity: 0.6;
}

@media (max-width: 992px) {
  .container {
    max-width: 992px;
  }

  .card-animal {
    flex: 0 1 138px;
    font-size: 15px;
    text-align: center;
    padding-right: 19px;
    gap: 8px;
  }
}
</style>
