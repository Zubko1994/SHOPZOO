<!-- @format -->

<script setup lang="ts">

import Text from './Text.vue'
import Button from './Button.vue'
import ModalWindowWaitingOrder from './ModalWindowWaitingOrder.vue'
import { ref, onMounted, onUnmounted } from 'vue'

const showModal = ref(false)

const showModalWindow = () => {
showModal.value = true
}

const closeWindow = () => {
  showModal.value = false
}


const cartCount = ref(0)

const updateCartCount = () => {
  const count = localStorage.getItem('cartCount') || '0'
  cartCount.value = parseInt(count)
  console.log('Cart count updated to:', cartCount.value)
}

// Слушаем события обновления корзины
const handleCartUpdate = () => {
  console.log('Cart update event received')
  updateCartCount()
}

onMounted(() => {
  updateCartCount()
  window.addEventListener('cartCountUpdated', handleCartUpdate)
  window.addEventListener('cartUpdated', handleCartUpdate)
})

onUnmounted(() => {
  window.removeEventListener('cartCountUpdated', handleCartUpdate)
  window.removeEventListener('cartUpdated', handleCartUpdate)
})

const totalCost = ref('0.00')

// Единая функция для обновления всех данных корзины
const updateCartData = () => {
  try {
    // Обновляем количество товаров
    const count = localStorage.getItem('cartCount') || '0'
    cartCount.value = parseInt(count)
    
    // Обновляем общую стоимость - ПРАВИЛЬНО получаем значение
    const cost = localStorage.getItem('totalCost')
    console.log('Retrieved totalCost from localStorage:', cost)
    
    if (cost && cost !== 'undefined' && cost !== 'null') {
      totalCost.value = cost
    } else {
      totalCost.value = '0.00'
    }
    
    console.log('Cart data updated - Count:', cartCount.value, 'Cost:', totalCost.value)
  } catch (error) {
    console.error('Error updating cart data:', error)
  }
}

// Обработчик события обновления стоимости
const handleTotalCostUpdate = (event: CustomEvent) => {
  console.log('TotalCostUpdated event received:', event.detail)
  totalCost.value = event.detail
}

onMounted(() => {
  // Первоначальная загрузка данных
  updateCartData()
  
  // Слушаем события обновления
  window.addEventListener('cartCountUpdated', updateCartData)
  window.addEventListener('cartUpdated', updateCartData)
  window.addEventListener('totalCostUpdated', handleTotalCostUpdate as EventListener)
  
  // Также обновляем при фокусе страницы (на случай, если пользователь вернулся)
  window.addEventListener('focus', updateCartData)
})

onUnmounted(() => {
  window.removeEventListener('cartCountUpdated', updateCartData)
  window.removeEventListener('cartUpdated', updateCartData)
  window.removeEventListener('totalCostUpdated', handleTotalCostUpdate as EventListener)
  window.removeEventListener('focus', updateCartData)
})

// Также обновляем данные при монтировании компонента
onMounted(() => {
  // Принудительно обновляем данные через короткую задержку
  setTimeout(updateCartData, 100)
})

</script>

<template>
  <section class="order">
    <div class="container">
    <Text tag="h2" print="order-title" title="Оформление заказа" class="order__title" />
    <div class="order__wrapper">
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
        <div class="order__info">
            <div class="wrapper-list">
                <ul class="list">
                    <li  class="list__item list__subtitle">Самовывоз по адресу: Минск, ул. Чюрлёниса, 6.</li>
                    <li class="list__item list__subtitle">Оплата любым способом при получении</li>
                </ul>
            </div>
            <div class="order__cost">
                <div class="cost">{{ totalCost }} BYN</div>
                <div class="count list__subtitle">Товаров: {{ cartCount }}</div>
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
    </div>
    <ModalWindowWaitingOrder v-if="showModal" @closeWindow="closeWindow"/>
  </section>
</template>

<style lang="scss" scoped>

.order {
  background-color: var(--bg-default);
  padding: 56px 5px 64px 5px;
  height: 100vh;
}

.order__title {
    margin-bottom: 32px;
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



</style>
