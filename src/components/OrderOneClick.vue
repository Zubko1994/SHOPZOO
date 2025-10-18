<!-- @format -->

<script setup lang="ts">

import Text from './Text.vue'
import Button from './Button.vue'
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import CardBasket from './CardBasket.vue'

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
  <section class="order">
    <div class="order__wrapper">
    <div class="cross_block">
        <img
          class="cross"
          @click.self="closeAccept"
          src="../assets/image/cross.svg"
          alt="крестик"
        />
      </div>
      <Text tag="h2" print="order-title" title="Оформление заказа в 1 клик" class="order__title" />
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
            <div class="line"> 
           </div>
               <div class="contacts-info">
          <div class="customer-name">
            <label for="name">Имя</label>
            <input id="name" type="text" placeholder="Иванов Иван Иванович" required/>
          </div>
          <div class="customer-phone">
            <label for="name">Номер телефона</label>
            <input id="name" type="text" placeholder="+375 ___-__-__" required />
          </div>
        </div>
        <div class="wrapper-bottom-form">
        <Button @click="showModalWindow" class="button-send" kind="primary" 
          >Заказать</Button
        >
        <Text tag="p" print="personal"
          >Нажимая на кнопку вы даёте согласие на обработку
          <span>персональных данных</span></Text
        >
        </div>
            </div>
  </section>
</template>

<style lang="scss" scoped>

.cards{
  max-width: 563px;
}

.line {
  border-bottom: 1px solid rgba(140, 145, 150, 1);
  margin-bottom: 16px;
}

.goods_choice-basket{
  margin-bottom: 16px;
}

.order {
  padding: 24px;
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background: rgba(83, 84, 85, 0.5);
  position: fixed;
  z-index: 100;
}

.cross_block {
  display: block;
  text-align: right;
}

.cross {
  cursor: pointer;
}

.order__title {
    margin-bottom: 16px;
    font-family: 'SFProDisplay';
    font-weight: 700;
    font-style: Bold;
    font-size: 20px;
    line-height: 28px;
    letter-spacing: 0px;
    text-align: center;
}

.order__wrapper {
  background-color: var(--white);


  border-radius: 8px;

  width: 611px; /* Добавить относительную ширину */
  margin: 20px auto; /* Добавить отступы */

  position: relative; /* Изменить на relative */
  max-height: 90vh; /* Ограничить высоту */
  overflow-y: auto; /* Добавить прокрутку если нужно */
}

label {
  color: var(--text-default);
  font-family: 'SFProText';
  font-weight: 600;
  font-size: 16px;
  line-height: 130%;
  letter-spacing: 0px;
}

::placeholder {
  font-family: 'SFProText';
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: 0px;
  vertical-align: middle;
}

.customer-name,
.customer-phone {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

input {
  padding: 8px 12px;
  width: 100%;
  border: 1px solid #a7acb1;
  display: block;
  border-radius: 4px;
}

.order__wrapper{
    padding: 24px 32px;
    max-width: 421px;
    margin: 0 auto;
    background-color: var(--white);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: var(--white);
  border-radius: 8px;
  // width: 90%; /* Добавить относительную ширину */
  margin: 20px auto; /* Добавить отступы */
  position: relative; /* Изменить на relative */
  max-height: 90vh; /* Ограничить высоту */
  overflow-y: auto; /* Добавить прокрутку если нужно */

}

.button-send {
    margin: 0 auto;
    margin-top: 8px;
}

.contacts-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.wrapper-bottom-form {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

span {
  color: var(--blue-text);
}

.order__info {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-left: 0;
    margin-left: 20px;
}

li {
    list-style: disc;
    
}

.markers li::marker {
	color: rgba(140, 145, 150, 1);
}

.order__cost {
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
}

.list__subtitle {
    font-family: 'SFProText';
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0px;
    vertical-align: middle;
    color: rgba(140, 145, 150, 1);
}

.cost {
    font-family: 'SFProText';
    font-weight: 700;
    font-style: Bold;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0px;
    color: var(--text-default);
}


@media (max-width: 576px ) {
    .order {
  padding-top: 48px;
}

}


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
  max-width: 563px;
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
