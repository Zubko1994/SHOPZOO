<!-- @format -->

<script setup lang="ts">
import { ref, computed } from 'vue'
import Quantity from './Quantity.vue'
import ImageCard from './ImageCard.vue'
import Text from './Text.vue'
import Button from './Button.vue'

const props = defineProps<{

  image_prev: string
  title: string
  countitemproduct_set: string[]
  price: number
  currentCategory?: number 
  animal: string[]
}>()


const selectedQuantity = ref<string | null>(null)
console.log(selectedQuantity.value)
const totalPrice = ref(props.price)

const updateTotalPrice = (quantity: string) => {
  selectedQuantity.value = quantity
  console.log(quantity)

  const info = JSON.parse(JSON.stringify(quantity))
  console.log(info.value)
  totalPrice.value = (props.price * info.value).toFixed(2)
  console.log(selectedQuantity.value)
}

// const emit = defineEmits(['updateCategory'])



// function handleCategoryUpdate() {
//   emit('updateCategory', props.countitemproduct_set)
// }

</script>

<template>
  <div class="card">
    <div class="wrapper-ceil">
      <ImageCard class="image-good" :src="props.image_prev" />
      <div class="wrapper-title">
        <Text class="card_title" tag="h3" print="title" :title="props.title" />
      </div>
    </div>
    <div class="wrapper-quantity">
      <Quantity
        :list="props.countitemproduct_set || []"
        @updateQuantity="updateTotalPrice"
      />
    </div>
    <div class="wrapper-basket">
      <div class="cost-info">
        <span class="cost">{{ totalPrice }} BYN </span>
        <Button title="" kind="basket-adding" />
      </div>
      <Button kind="buying">Купить в 1 клик</Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;
  width: 270px;
  min-width: 243px;
  padding: 8px;
  max-height: 392px;
  background-color: var(--white);
  border-radius: 5px;
  align-self: auto;
}

.image-good {
  text-align: center;
}

.card_title {
  -webkit-line-clamp: 3;
  position: relative;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.card_title:hover {
  color: var(--highlight);
  cursor: pointer;
}

// .wrapper-image {
//   margin-bottom: 5px;
// }

// .wrapper-title {
//   margin-bottom: 10px;
// }

.wrapper-quantity {
  // margin-bottom: 10px;
  align-items: center;
}

.cost-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
}

.cost {
  display: block;
  font-family: 'SFProText';
  font-weight: 700;
  font-size: 16px;
  line-height: 130%;
  letter-spacing: 0px;
  color: var(--text-default);
}

.wrapper-basket {
  display: flex;
  flex-direction: column;
  gap: 13px;
}

.wrapper-ceil {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (max-width: 992px) {
  .container {
    max-width: 992px;
  }
}
</style>
