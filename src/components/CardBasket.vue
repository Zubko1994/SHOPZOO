<!-- @format -->

!
<script setup lang="ts">
import Text from './Text.vue'
import Quantity from './Quantity.vue'
import { ref, computed, watch } from 'vue'

const props = withDefaults(defineProps<{
  id: number
  image_prev: string
  countitemproduct_set: string[]  
  title: string
  price: number
  quantity: number  
  variant: string   
}>(),
{
    quantity: 1,
  }
)


const selectedQuantity = ref<string | null>(null)
const totalPrice = ref(props.price)
const countProduct = ref(1) // ← Используем переданное количество

const emit = defineEmits(['remove-item', 'quantityitem'])

const updateTotalPrice = (quantity: string) => {
  selectedQuantity.value = quantity
  const selectedQty = Number(quantity) || 1
  console.log(quantity.value)
  
  // Пересчитываем totalPrice с учетом выбранного количества и текущего количества товаров
  totalPrice.value = Number((props.price * quantity.value * countProduct.value).toFixed(2))
  console.log(props.price)
  console.log(selectedQty)
  console.log(countProduct.value)

  
  updateCount(countProduct.value)
}
// Функция для обновления количества и сохранения
function updateCount(newQuantity: number) {
  // totalCost = цена * выбранноеКоличество * количество товаров
  const selectedQty = Number(selectedQuantity.value) || 1
  const totalCostValue = (Number(props.price) * selectedQty * newQuantity).toFixed(2)
  
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  const updatedCart = cart.map(item => {
    if (item.id === props.id && item.variant === props.variant && item.title === props.title) {
      return { 
        ...item, 
        quantity: newQuantity, 
        totalCost: totalCostValue,
        selectedQuantity: selectedQuantity.value
      }
    }
    return item
  })
  
  localStorage.setItem('cart', JSON.stringify(updatedCart))
  window.dispatchEvent(new CustomEvent('cartUpdated'))
}

function increaseCount() {
  const newQuantity = countProduct.value + 1
  countProduct.value = newQuantity
  
  // Пересчитываем totalPrice с учетом выбранного количества
  const selectedQty = Number(selectedQuantity.value) || 1
  totalPrice.value = Number((props.price * selectedQty * newQuantity).toFixed(2))
  
  updateCount(newQuantity)

}


function decreaseCount() {
  if (countProduct.value > 1) {
    const newQuantity = countProduct.value - 1
    countProduct.value = newQuantity
    
    // Пересчитываем totalPrice с учетом выбранного количества
    const selectedQty = Number(selectedQuantity.value) || 1
    totalPrice.value = Number((props.price * selectedQty * newQuantity).toFixed(2))
    
    updateCount(newQuantity)
  }
}


  watch(selectedQuantity, (newVal) => {
    if(newVal){
    selectedQuantity.value = newVal
    }
  })


const removeItem = () => {
  emit('remove-item', props.id, props.variant, props.title)
}

watch(totalPrice, (newVal) => {
  console.log('Цена обновлена:', newVal)
})

</script>

<template>
  <div class="wrapper-card">
    <div class="wrapper-card_left">
      <img
        class="card_image"
        :src="props.image_prev"
        alt="Изображение товара"
      />
      <div class="product-info">
        <Text
          class="card_title"
          tag="h3"
          print="basket-title-product"
          :title="props.title"
        />
        <div class="product-info_quantity">
           <Quantity
           
            :list="props.countitemproduct_set || []"
            @updateQuantity="updateTotalPrice"
          />
        </div>
      </div>
    </div>
    <div class="wrapper-card_right">
      <div class="goods_info-wrapper">
        <div class="count">
          <button @click="decreaseCount" class="wrapper_symbol">
            <img src="../assets/image/minus_minor.svg" alt="минус" />
          </button>
          <p class="wrapper_symbol">{{ countProduct }}</p>
          <button @click="increaseCount" class="wrapper_symbol">
            <img src="../assets/image/plus_minor.svg" alt="плюс" />
          </button>
        </div>
        <div class="cost">{{ totalPrice }} BYN</div>
      </div>
      <button @click="removeItem" class="trash-can">
        <img src="../assets/svg/Delete.svg" alt="удалить товар" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-info {
  max-width: 470px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card_title {
  -webkit-line-clamp: 2;
  position: relative;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.card_image {
  width: 56px;
  height: 56px;
  background-color: var(--white);
  mix-blend-mode: multiply;
}

.wrapper-card_left {
  display: flex;
  gap: 16px;
}

.wrapper_symbol {
  width: 36px;
  height: 36px;
  border: 1px solid rgba(186, 191, 195, 1);
  padding: 8px 0px 8px 0px;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.05);
  background: var(--white);
  color: var(--text-default);
  font-family: 'SFProText';
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
display: flex;
justify-content: center;
}

.count {
  display: flex;
  gap: 6px;
}

.goods_info-wrapper {
  display: flex;
  gap: 35px;
}

.wrapper-card {
  display: flex;
  gap: 16px;
  justify-content: space-between;
  min-width: 770px;
  width: 100%;
  padding: 24px 16px 24px 16px;
}

.wrapper-card_right {
  display: flex;
  align-items: flex-start;
  gap: 35px;
}

.trash-can {
  background-color: var(--white);
  mix-blend-mode: multiply;
  margin-top: 6px;
}

.goods_info-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-content: flex-start;
}

.cost {
  color: var(--text-default);
  font-family: 'SFProText';
  font-size: 16px;
  font-weight: 400;
  line-height: 130%;
  letter-spacing: 0px;
  text-align: left;
}


@media (max-width: 820px) {

  .wrapper-card {
    min-width: 600px;
  }

}


@media (max-width: 684px) {
 .wrapper-card{
    min-width: 340px;
    padding: 24px 16px 0px 16px;
    flex-direction: column;
  }
  .wrapper-card_left {
  flex-direction: column;
  align-items: flex-start;
}

}
</style>