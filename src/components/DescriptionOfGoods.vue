<!-- @format -->

!
<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import Text from './Text.vue'
import QuantityWithPrice from '../components/QuantityWithPrice.vue'

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
  }>(),
  {
    quantity: 1,
  }
)
import Button from './Button.vue'

const route = useRoute()
const countProduct = ref(1)

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
        <Text
          class="card_title"
          tag="h2"
          print="title-goods"
          :title="product.title"
        />
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
              <div class="cost_info">{{ displayPrice }} BYN</div>
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

              <Button class="addProduct" @click="addProduct" kind="primary"
                >Добавить в корзину</Button
              >
              <Button class="buying-click" @click="showModalWindow" kind="buying-click"
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
  </section>
</template>

<style lang="scss" scoped>
.product-description {
  padding: 24px 5px 68px 5px;
  background-color: var(--bg-default);
}

.card_title {
  margin-bottom: 24px;
  max-width: 870px;
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
  gap: 6px;
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



</style>
