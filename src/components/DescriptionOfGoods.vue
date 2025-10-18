<!-- @format -->

!
<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import Text from './Text.vue'
import QuantityWithPrice from '../components/QuantityWithPrice.vue'
import Quantity from '../components/Quantity.vue'
import ModalWindowWaitingOrder from '../components/ModalWindowWaitingOrder.vue'

const props = withDefaults(
  defineProps<{
    id: number
    image_prev: string
    countitemproduct_set: string[]
    title: string
    price: number
    quantity: number
    variant: string
    description: string
    key_features: string
    guaranteed_analysis: string
    nutritional_supplements: string
    sale: {id: number; image: string; percent: number; title: string }
  promotion: string,
  }>(),
  {
    quantity: 1,
    promotion: "Акция",
  }
)
import Button from './Button.vue'

const route = useRoute()
const countProduct = ref(1)
const showModal = ref(false)
const showModalOrder = ref(false)
const buyOneClickModal = ref(false)

const buyOneClick = () => {
buyOneClickModal.value = !buyOneClickModal.value
}

const buyOneClickClose = () => {
  buyOneClickModal.value = false
}

const showModalProductAddBasket = () => {
  showModal.value = !showModal.value
}

const showModalWindowOrder = () => {
  showModalOrder.value = !showModalOrder.value
  buyOneClickModal.value = false
}

const closeModalOrder = () => {
  showModal.value = false
}

const closeAccept = () => {
  showModal.value = false
}

const closeWindow = () => {
showModalOrder.value = false
}

const product = ref({
  id: 0,
  image_prev: '',
  title: '',
  countitemproduct_set: [] as string[],
  price: 0,
  currentCategory: 0,
  animal: '',
  sale: { id: 0, image: '', percent: 0, title: '' },
  promotion: '',
  description: '',
  guaranteed_analysis: '',
  key_features: '',
  nutritional_supplements: '',
})

const selectedQuantity = ref<{ value: string; unit: string } | null>(null)
const totalPrice = ref(0)
const isLoading = ref(true)

// Наблюдатель за изменениями в localStorage
const setupLocalStorageWatcher = () => {
  const originalSetItem = localStorage.setItem
  const originalRemoveItem = localStorage.removeItem

  // Переопределяем setItem для отслеживания изменений
  localStorage.setItem = function (key, value) {
    const event = new Event('localStorageChanged')
    document.dispatchEvent(event)
    originalSetItem.apply(this, [key, value])
  }

  // Переопределяем removeItem для отслеживания изменений
  localStorage.removeItem = function (key) {
    const event = new Event('localStorageChanged')
    document.dispatchEvent(event)
    originalRemoveItem.apply(this, [key])
  }
}

// Слушаем изменения localStorage
const handleStorageChange = () => {
  console.log('LocalStorage changed, reloading product data...')
  loadProductData()
}

onMounted(() => {
  setupLocalStorageWatcher()
  document.addEventListener('localStorageChanged', handleStorageChange)

  // Также слушаем стандартное событие storage (для вкладок/окон)
  window.addEventListener('storage', handleStorageChange)

  loadProductData()
})

onUnmounted(() => {
  document.removeEventListener('localStorageChanged', handleStorageChange)
  window.removeEventListener('storage', handleStorageChange)
})

// Отслеживаем изменение маршрута
watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId && newId !== oldId) {
      console.log('Route changed from', oldId, 'to', newId)
      loadProductData()
    }
  }
)

const loadProductData = () => {
  isLoading.value = true

  const storedProduct = localStorage.getItem('currentProduct')
  console.log('Loading product from localStorage:', storedProduct)

  if (storedProduct) {
    try {
      const parsedProduct = JSON.parse(storedProduct)
      product.value = parsedProduct
      // Не устанавливаем totalPrice здесь, он будет пересчитан в recalculateTotalPrice

      console.log('Successfully loaded product:', parsedProduct)

      // Автоматически выбираем первое значение
      if (
        parsedProduct.countitemproduct_set &&
        parsedProduct.countitemproduct_set.length > 0
      ) {
        const firstItem = parsedProduct.countitemproduct_set[0]

        if (typeof firstItem === 'string') {
          const match = firstItem.match(/(\d+)\s*(.*)/)
          if (match) {
            selectedQuantity.value = {
              value: match[1],
              unit: match[2] || '',
            }
          } else {
            selectedQuantity.value = {
              value: firstItem,
              unit: '',
            }
          }
        } else {
          selectedQuantity.value = firstItem
        }
      }

      // Пересчитываем общую стоимость после загрузки данных
      recalculateTotalPrice()
    } catch (error) {
      console.error('Error parsing product data:', error)
    }
  } else {
    console.warn('No product data found in localStorage')
  }

  isLoading.value = false
}

// Функция для пересчета общей стоимости
const recalculateTotalPrice = () => {
  if (selectedQuantity.value && product.value.price) {
    const quantityNumber = parseFloat(selectedQuantity.value.value) || 1
    totalPrice.value = product.value.price * quantityNumber * countProduct.value
  } else if (product.value.price) {
    // Если нет выбранной фасовки, используем базовую цену
    totalPrice.value = product.value.price * countProduct.value
  }
}

// Обновляем функцию updateTotalPrice
const updateTotalPrice = (quantity: any) => {
  selectedQuantity.value = quantity
  console.log('Quantity selected:', quantity)
  recalculateTotalPrice() // Пересчитываем стоимость при изменении фасовки
}

// Вычисляемые свойства
const safeSelectedQuantity = computed(() => {
  return selectedQuantity.value || { value: '', unit: '' }
})

const displayPrice = computed(() => {
  return totalPrice.value.toFixed(2)
})

function increaseCount() {
  countProduct.value += 1
  recalculateTotalPrice() // Пересчитываем стоимость при увеличении количества
}

function decreaseCount() {
  if (countProduct.value > 1) {
    countProduct.value -= 1
    recalculateTotalPrice() // Пересчитываем стоимость при уменьшении количества
  }
}

function addProduct() {
  // Используем данные из product.value, а не из props
  const productToAdd = {
    id: props.id, // ← Используем ID товара, а не случайный!
    image_prev: product.value.image_prev,
    description: product.value.description,
    key_features: product.value.key_features,
    countitemproduct_set: product.value.countitemproduct_set,
    title: product.value.title,
    price: Number(product.value.price),
    quantity: Number(selectedQuantity.value) || 1, // ← Преобразуем в число
    variant: selectedQuantity.value, // ← Это вариант товара
    totalCost: (
      Number(product.value.price) * (Number(selectedQuantity.value) || 1)
    ).toFixed(2),
  }

  console.log('Adding product to cart:', productToAdd)

  const cart = JSON.parse(localStorage.getItem('cart') || '[]')

  // Ключ для сравнения товаров
  const productKey = `${productToAdd.id}-${productToAdd.variant}-${productToAdd.title}`

  // Проверяем, есть ли уже такой товар
  const existingIndex = cart.findIndex(
    (item) => `${item.id}-${item.variant}-${item.title}` === productKey
  )

  if (existingIndex !== -1) {
    // Если товар уже есть - увеличиваем количество
    cart[existingIndex].quantity += productToAdd.quantity
    cart[existingIndex].totalCost = (
      Number(cart[existingIndex].price) *
      Number(cart[existingIndex].selectedQuantity?.value || 1) *
      cart[existingIndex].quantity
    ).toFixed(2)
  } else {
    // Если нет - добавляем новый товар
    cart.push(productToAdd)
  }

  localStorage.setItem('cart', JSON.stringify(cart))
  window.dispatchEvent(new CustomEvent('cartUpdated'))

  console.log('Cart updated:', cart)
}

// Наблюдатель за изменением selectedQuantity и countProduct для автоматического пересчета
watch(
  [selectedQuantity, countProduct],
  () => {
    recalculateTotalPrice()
  },
  { deep: true }
)
</script>

<template>
  <section class="product-description" :key="route.params.id">
    <div class="container">
      <div class="product-description_wrapper">
        <div class="wrapper_ceil">
        <Text
          class="cards_title"
          tag="h2"
          print="title-goods"
          :title="product.title"
        />
        <div v-if="product.sale && product.sale.percent > 0" class="product-promotion">
{{props.promotion}}
      </div>
      </div>
        <div class="product_information">
          <div class="wrapper-image">
            <img
              class="product_information__image"
              :src="product.image_prev"
              alt="изображение товара"
            />
          </div>
          <div class="product_details">
            <div>
              <Text
                class="title-packaging"
                tag="p"
                print="title-packaging"
                title="Варианты фасовки. Выберите удобный вес "
              />
              <QuantityWithPrice
                :list="product.countitemproduct_set"
                :price="product.price"
                @updateQuantity="updateTotalPrice"
                :selected="selectedQuantity"
                class="wrapper-quantity"
              />
            </div>
            <div class="delivery">
              <img
                class="delivery_image"
                src="../assets/image/box.png"
                alt="изображение коробки"
              />
              <div class="delivery_information">
                <Text
                  class="delivery_title"
                  tag="p"
                  print="delivery_title"
                  title="Самовывоз"
                />
                <Text
                  class="delivery_subtitle"
                  tag="p"
                  print="delivery_subtitle"
                  title="В данный момент товар можно забрать только самовывозом из нашего уютного магазина по адресу:"
                />
                <div class="delivery__info">
                  <div class="delivery__adress">
                    <img src="../assets/image/Primary.svg" alt="" />
                    <Text
                      tag="p"
                      print="adress"
                      title="Минск, ул. Чюрлёниса, 6."
                    />
                  </div>
                  <div class="delivery__metro">
                    <img src="../assets/image/metro.svg" alt="" />
                    <Text tag="p" print="adress" title="Малиновка" />
                  </div>
                </div>
              </div>
            </div>
            <div class="cost-quantity">
              <div class="cost_information">
              <div v-if="product.sale && product.sale.percent > 0" class="total-price total-price-big"> {{(totalPrice + (totalPrice*(product.sale.percent / 100))).toFixed(2)}} BYN</div>
              <div class="cost_info">{{ displayPrice }} BYN</div>
            </div>
              <div class="quantity_info">
                Количество:
                {{ (safeSelectedQuantity.value * countProduct).toFixed(1) }}
                {{ safeSelectedQuantity.unit }}
              </div>
            </div>
            <div class="purchase">
              <div class="count">
                <button @click="decreaseCount" class="wrapper_symbol">
                  <img src="../assets/image/minus_minor.svg" alt="минус" />
                </button>
                <p class="wrapper_symbol">{{ countProduct }}</p>
                <button @click="increaseCount" class="wrapper_symbol">
                  <img src="../assets/image/plus_minor.svg" alt="плюс" />
                </button>
              </div>

              <Button class="addProduct" @click="addProduct" @customClick="showModalProductAddBasket" kind="primary"
                >Добавить в корзину</Button
              >
              <Button class="buying-click" @click="buyOneClick" kind="buying-click"
                >Купить в 1 клик</Button
              >
            </div>
          </div>
        </div>
      </div>
      <Text
        class="product-info_title"
        tag="h3"
        print="product-info-title"
        title="Описание"
      />
      <div class="product-info_wrapper">
        <div class="product-info_left">
          <div class="product-info">{{ product.description }}</div>
          <div v-if="product.key_features" class="product-info-feauters">
            <Text
        tag="h4"
        print="title-description"
        title="Ключевые особенности:"
      />
      <div class="product-info">{{ product.key_features }}</div>
          </div>
          <div v-if="product.nutritional_supplements" class="product-info-structure">
            <Text
        tag="h4"
        print="title-description"
        title="Состав:"
      />
      <div class="product-info">{{ product.nutritional_supplements }}</div>
          </div>
        </div>
        <div class="product-info_right">
          <div v-if="product.guaranteed_analysis" class="product-info-analysis">
            <Text
        tag="h4"
        print="title-description"
        title="Гарантированный анализ:"
      />
      <div class="product-info">{{ product.guaranteed_analysis }}</div>
          </div>

      </div>
      </div>
    </div>
    <div v-if="showModal" class="modal-waiting">
      <div class="register__info">
            <div class="cross_block">
              <img
                class="cross"
                @click.self="closeAccept"
                src="../assets/image/cross.svg"
                alt="крестик"
              />
            </div>
            <div class="checkmark">
          <img class="mark" src="../assets/image/shape.svg" alt="галочка" />
          <span class="mark-title">Товар добавлен в корзину</span>
          </div>
          <div class="wrapper-card">
    <div class="wrapper-card_left">
      <img
        class="card_image"
        :src="product.image_prev"
        alt="Изображение товара"
      />
      <div class="product-info">
        <Text
          class="card_title"
          tag="h3"
          print="basket-title-product"
          :title="product.title"
        />
        <div class="product-info_quantity">
           <Quantity
            :list="product.countitemproduct_set || []"
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
        <div>
        <div class="wrapper-cost">
        <div v-if="product.sale && product.sale.percent > 0" class="total-price">{{(totalPrice * (1 - product.sale.percent / 100)).toFixed(2)}} BYN</div>
        <div class="cost">{{ totalPrice.toFixed(2) }} BYN</div>
      </div>
      </div>
      </div>
    </div>
  </div>
<div class="waiting_button">
            <Button class="button-send" kind="primary" 
              ><RouterLink to="/basket" class="link_button" :class="['item']"
              >Перейти в корзину</RouterLink></Button
            >
            <Button class="button-catalog" kind="primary" 
              ><RouterLink to="/catalog" class="link_button-catalog" :class="['item']"
              >Продолжить покупки</RouterLink></Button
            >
          </div>
      </div>
    </div>
  </section>


  <section v-if="buyOneClickModal" class="order">
    <div class="order__wrapper">
      <div class="modal-ceil">
      <div v-if="product.sale && product.sale.percent > 0" class="product-promotion-modal">
{{props.promotion}}
      </div>
    <div class="cross_block">
        <img
          class="cross"
          @click.self="buyOneClickClose"
          src="../assets/image/cross.svg"
          alt="крестик"
        />
      </div>
      </div>
      <Text tag="h2" print="order-title" title="Оформление заказа в 1 клик" class="order__title" />
      <div class="wrapper-card">
    <div class="wrapper-card_left">
      <img
        class="card_image"
        :src="product.image_prev"
        alt="Изображение товара"
      />
      <div class="product-info">
        <Text
          class="card_title"
          tag="h3"
          print="basket-title-product"
          :title="product.title"
        />
        <div class="product-info_quantity">
           <Quantity
            :list="product.countitemproduct_set || []"
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
        <div class="wrapper-cost">
        <div v-if="product.sale && product.sale.percent > 0" class="total-price"> {{(totalPrice * (1 - product.sale.percent / 100)).toFixed(2)}} BYN</div>
        <div class="cost">{{ totalPrice.toFixed(2) }} BYN</div>
        </div>
      </div>
    </div>
  </div>
            <div class="line"> 
           </div>
           <Text tag="p" print="order-oneclick-subtitle"
          >Заполните данные и нажмите кнопку «Оформить заказ». Товар будет ждать вас по адресу: Минск, ул. Чюрлёниса, 6.</Text
        >

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
        <Button @click="showModalWindowOrder" class="button-send-order" kind="primary" 
          >Оформить заказ</Button
        >
        <Text tag="p" print="personal"
          >Нажимая на кнопку вы даёте согласие на обработку
          <span>персональных данных</span></Text
        >
        </div>
            </div>
  </section>
  <ModalWindowWaitingOrder v-if="showModalOrder" @closeWindow="closeWindow" @click="closeModalOrder"/>
</template>

<style lang="scss" scoped>
.product-description {
  padding: 24px 5px 68px 5px;
  background-color: var(--bg-default);
}

.goods_info-wrapper {
  display: flex;
  gap: 35px;
  align-items: center;
  min-width: 200px; /* Фиксируем минимальную ширину */
}

.wrapper-cost {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 120px; /* Фиксируем ширину для цен */
}

.total-price, .cost {
  white-space: nowrap;
  min-width: 100px; /* Гарантируем одинаковую ширину */
  text-align: left; /* Выравниваем по правому краю */
}
.cards_title{
  max-width: 870px;
  margin-bottom: 24px;
}

.card_title {
  max-width: 355px;
}

.product_information__image {
  display: block;
  max-width: 470px;
  max-height: 392px;
}

.product_information {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  flex-wrap: wrap;
}

.title-packaging {
  margin-bottom: 12px;
}

.wrapper_ceil {
  display: flex;
  gap: 20px;
align-items: flex-start;
  justify-content: space-between;
}

.quantity {
  margin-bottom: 24px;
}

.delivery {
  display: flex;
  gap: 18px;
  align-items: center;
}

.delivery_image {
  display: block;
  width: 40px;
  height: 40px;
}

.delivery_information {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.line-through {
  text-decoration: line-through;
  color: var(--text-gray);
}

.total-price {
font-family: 'SFProText';
font-weight: 700;
font-style: Bold;
font-size: 16px;
line-height: 130%;
letter-spacing: 0px;
text-decoration: line-through solid rgba(215, 44, 13, 1);
color: rgba(140, 145, 150, 1);
}

.product_details {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 501px;
}

.wrapper-image {
  max-width: 578px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
}

.delivery__info {
  display: flex;
  gap: 12px;
  align-items: center;
}

.delivery__adress,
.delivery__metro {
  display: flex;
  gap: 8px;
  align-items: center;
}

.cost-quantity {
  border-radius: 4px;
  background-color: var(--white);
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
}

.cost_info {
  color: var(--text-default);
  font-family: 'SFProDisplay';
  font-size: 28px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0px;
  text-align: left;
}

.button-catalog {
  color: var(--text-default);
  background-color: var(--white);
  border: 1px solid rgba(140, 145, 150, 1);
  border-radius: 4px;
  box-sizing: border-box;
  padding: 11px 23px;
}

.button-catalog:hover {
  .addProduct {
  background-color: var(--highlight);
  color: var(--white);
}

.link_button-catalog{
  color: var(--white);
}
}

.button-send {
  color: var(--text-default);
  background-color: var(--white);
  border: 1px solid rgba(140, 145, 150, 1);
  border-radius: 4px;
  box-sizing: border-box;
  padding: 11px 23px;
}

.link_button {
  color: var(--text-default);
}

.button-send:hover {
  background-color: var(--highlight);

  .link_button {
  color: var(--white);
  
}
}



.addProduct {
  color: var(--text-default);
  background-color: var(--white);
  border: 1px solid rgba(140, 145, 150, 1);
  border-radius: 4px;
  box-sizing: border-box;
  padding: 11px 23px;
}

.addProduct:hover {
  background-color: var(--highlight);
  color: var(--white);
}

.addProduct:active {
  background-color: var(--highlight);
  color: var(--white);
}



.link_button-catalog:hover {
  background-color: var(--highlight);
  color: var(--white);
}

.link_button-catalog:active {
  background-color: var(--highlight);
  color: var(--white);
}



.button-catalog:hover {
  background-color: var(--highlight);
  color: var(--white);
}

.button-catalog:active {
  background-color: var(--highlight);
  color: var(--white);
}

.quantity_info {
  color: var(--text-default);
  font-family: 'SFProText';
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
}

.count {
  display: flex;
  gap: 10px;
}

.waiting_button {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 auto;
  justify-content: center;
  margin-bottom: 24px;
}

.link_button-catalog {
  color: var(--text-default);
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

.addProduct {
  max-width: 189px;
}

.buying {
  border: none;
  background-color: var(--bg-default);
  color: rgba(44, 110, 203, 1);
  font-family: 'SFProText';
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
  padding: 0;
  max-width: 124px;
}

.purchase {
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: space-between;
}

.product-description_wrapper {
  margin-bottom: 64px;
}

.product-info_title {
  margin-bottom: 24px;
}

.product-info {
  color: var(--text-default);
font-family: 'SFProText';
font-size: 14px;
font-weight: 400;
line-height: 20px;
letter-spacing: 0px;
text-align: left;
}

.product-info_wrapper {
  display: flex;
  gap: 30px;
  justify-content: space-between;
}

.product-info_left {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.cost_information {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;
}

.product-info_right {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.product-info-feauters, .product-info-structure, .product-info-analysis {
  display: flex; 
  flex-direction: column;
  gap: 12px;
}

.product-info_left {
  max-width: 670px;
}

.modal-waiting {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background: rgba(83, 84, 85, 0.5);
  position: fixed;
  z-index: 900;
}



.register__info {
  max-width: 611px;
  min-width: 312px;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  background: var(--white);
  padding: 6px;
  border-radius: 8px;
  position: fixed;
  
}

.cross_block {
  display: block;
  text-align: right;
}

.cross {
  cursor: pointer;
}

.mark {
  width: 20px;
  height: 20px;
}

.mark-title {
  font-family: 'SFProDisplay';
  font-weight: 700;
  font-style: Bold;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: center;
  color: var(--text-default);
  
}

.checkmark {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 auto;
 margin-bottom: 48px;
 justify-content: center;
}

.product-info {
  max-width: 355px;
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  gap: 10px;
}

.goods_info-wrapper {
  display: flex;
  gap: 35px;
}

.product-promotion {
    
    color: rgb(255, 255, 255);
    font-family: "SFProText";
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0px;
    padding: 2px 8px;
    background: rgba(253, 87, 73, 1);
    border-radius: 2px;
    // user-select: none;
}

.wrapper-card {
  display: flex;
  gap: 16px;
  justify-content: space-between;
  min-width: 563px;
  width: 100%;
  margin-bottom: 17px;
  padding-left: 18px;
  padding-right: 18px;
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
  text-wrap: nowrap;
}

.wrapper-cost {
  display: flex;
  align-items: center;
  gap: 5px;
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

@media(max-width: 1011px){
  .product_information {
    align-items: center;
    margin: 0 auto;
    justify-content: center;
  }

  .product-info_title {
    text-align: center;
  }

  .product-info_wrapper {
  justify-content: center;
}

.product_information__image {
  width: 276px;
  height: auto;
}

.purchase {
  flex-wrap: wrap;
  gap: 12px;
}


.delivery__info {
  flex-wrap: wrap;
}

.cost_info {
font-size: 20px;
}
.buying-click {
  display: block;
  margin: 0 auto;
}

.product-description_wrapper[data-v-4652f852] {
    margin-bottom: 32px;
}

}



.order {
  padding: 24px;
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background: rgba(83, 84, 85, 0.5);
  position: fixed;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
}  

.product-promotion-modal {
    position: absolute;
    top: 24px;
    left: 24px;
    color: rgb(255, 255, 255);
    font-family: "SFProText";
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0px;
    padding: 2px 8px;
    background: rgba(253, 87, 73, 1);
    border-radius: 2px;
  }    

.cross_block {
  display: block;
  text-align: right;
}  

.cross {
  cursor: pointer;
}  

.order__title {
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
    width: 611px;
    margin: 0 auto;
    border-radius: 8px;
    position: absolute;
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
    padding: 24px;
    margin: 0 auto;
    background-color: var(--white);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 611px;
}    

.button-send-order {
    margin: 0 auto;
    margin-top: 8px;
  }    
  
  .contacts-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 349px; 
    margin: 0 auto;
  }   
  
  .wrapper-bottom-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
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

  .total-price-big {
    font-size: 28px;
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
  
  .count {
    display: flex;
    gap: 10px;
    justify-content: center;
    
  }

  @media(max-width: 656px){

    .order__wrapper {
      width: 99%;
    }

    input {
      width: 90%;
    }
  }
  

  @media(max-width: 360px){
  .wrapper_ceil {
    flex-direction: column-reverse;
    gap:  16px;
    margin-top: 16px;
  }
  }
</style>
