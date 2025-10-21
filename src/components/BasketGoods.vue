<!-- @format -->

<script setup lang="ts">
// import Text from './Text.vue'
// import CardBasket from './CardBasket.vue'
// import Quantity from './Quantity.vue'
// import { ref, computed, watch, onMounted } from 'vue'

// interface Cards {
//   id: number
//   image_prev: string
//   title: string
//   price: number
// }

// interface CardsObj {
//   count: number
//   next: string | null
//   previous: string | null
//   results: Cards[]
// }

// const dataCards = ref<CardsObj | null>(null)
// fetch('https://oliver1ck.pythonanywhere.com/api/get_products_list/')
//   .then((resp) => resp.json())
//   .then((data) => (dataCards.value = data))

// const cost = ref(542)



// interface CartItem {
//   id: number
//   image_prev: string
//   title: string
//   price: number
//   quantity: number
//   variant: string
// }

// const cartItems = ref<CartItem[]>([])

// // Функция загрузки корзины из Local Storage
// const loadCart = () => {
//   const cartData = localStorage.getItem('cart')
//   cartItems.value = cartData ? JSON.parse(cartData) : []
// }

// // Функция обновления количества товара
// const updateQuantity = (id: number, variant: string, newQuantity: number) => {
//   if (newQuantity < 1) return
  
//   const updatedCart = cartItems.value.map(item => 
//     item.id === id && item.variant === variant 
//       ? { ...item, quantity: newQuantity } 
//       : item
//   )
  
//   cartItems.value = updatedCart
//   localStorage.setItem('cart', JSON.stringify(updatedCart))
// }

// // Функция удаления товара
// const removeItem = (id: number, variant: string) => {
//   const updatedCart = cartItems.value.filter(
//     item => !(item.id === id && item.variant === variant)
//   )
  
//   cartItems.value = updatedCart
//   localStorage.setItem('cart', JSON.stringify(updatedCart))
// }

// // Вычисляемые свойства для общей стоимости и количества
// const totalCost = computed(() => {
//   return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
// })

// const totalItems = computed(() => {
//   return cartItems.value.reduce((total, item) => total + item.quantity, 0)
// })

// // Загружаем корзину при монтировании и подписываемся на обновления
// onMounted(() => {
//   loadCart()
//   window.addEventListener('cartUpdated', loadCart)
// })

// onMounted(() => {
//   window.removeEventListener('cartUpdated', loadCart)
// })
import Text from './Text.vue'
import CardBasket from './CardBasket.vue'
import Button from './Button.vue'
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import Quantity from './Quantity.vue'

interface CartItem {
  id: number
  image_prev: string
  title: string
  price: number
  quantity: string
  variant: string
  countitemproduct_set: string[],
  totalCost: number
  selectedQuantity?: {value: string, unit: string} // Добавляем опциональное поле
}

const selectedQuantity = ref<number | null>(null)
const cartItems = ref<CartItem[]>([])


const forceUpdate = ref(0)

// Функция загрузки корзины из Local Storage
const loadCart = () => {
  try {
    const cartData = localStorage.getItem('cart')
    cartItems.value = cartData ? JSON.parse(cartData) : []
    // Сохраняем общую стоимость в localStorage
    localStorage.setItem('totalCost', totalCost.value)
  } catch (error) {
    console.error('Error loading cart:', error)
    cartItems.value = []
  }
}

function updateQuantityItem(quantityitem: number) {
selectedQuantity.value = quantityitem
console.log(selectedQuantity.value)
console.log(quantityitem)
console.log(quantityitem.value)

}

const totalCost = computed(() => {
  return cartItems.value.reduce((total, item) => {
    const quantity = Number(item.quantity) || 1
    const price = Number(item.price) || 0
    let selectedQty = 1

    // Получаем значение фасовки из правильного поля
    if (item.selectedQuantity && item.selectedQuantity.value) {
      selectedQty = parseFloat(item.selectedQuantity.value) || 1
    } else if (item.variant && item.variant.value) {
      selectedQty = parseFloat(item.variant.value) || 1
    } else if (typeof item.variant === 'string') {
      const match = item.variant.match(/(\d+\.?\d*)\s*(.*)/)
      selectedQty = match ? parseFloat(match[1]) : 1
    }

    return total + (price * selectedQty * quantity)
  }, 0).toFixed(2)
})
// Функция обновления количества товара
// const updateQuantity = (id: number, variant: string, newQuantity: number) => {
//   if (newQuantity < 1) return
  
//   const updatedCart = cartItems.value.map(item => 
//     item.id === id && item.variant === variant 
//       ? { ...item, quantity: newQuantity } 
//       : item
//   )
  
//   cartItems.value = updatedCart
//   localStorage.setItem('cart', JSON.stringify(updatedCart))
//   window.dispatchEvent(new CustomEvent('cartUpdated'))
// }


const removeItem = (id: number, variant: any, title: string) => {
  console.log('Removing item:', { id, variant, title })
  
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  
  // Правильно фильтруем товары для удаления
  const updatedCart = cart.filter((item: CartItem) => {
    // Если variant - объект, сравниваем по value и unit
    if (variant && typeof variant === 'object') {
      return !(
        item.id === id && 
        item.title === title &&
        item.variant?.value === variant.value &&
        item.variant?.unit === variant.unit
      )
    } 
    // Если variant - строка, сравниваем как строку
    else {
      return !(
        item.id === id && 
        item.title === title &&
        item.variant === variant
      )
    }
  })
  
  console.log('Cart after removal:', updatedCart)
  
  cartItems.value = updatedCart
  localStorage.setItem('cart', JSON.stringify(updatedCart))
  forceUpdate.value++
  
  // Обновляем счетчик корзины
  const totalCount = updatedCart.reduce((sum: number, item: CartItem) => sum + Number(item.quantity), 0)
  localStorage.setItem('cartCount', totalCount.toString())
  window.dispatchEvent(new CustomEvent('cartCountUpdated', {
    detail: { count: totalCount }
  }))
}

// Вычисляемые свойства для общей стоимости и количества

// const totalCost = computed(() => {
//   forceUpdate.value 
  
//   return cartItems.value.reduce((total, item) => {
//     const quantity = Number(item.quantity) || 1
//     const price = Number(item.price) || 0
//     return total + (price * quantity)
//   }, 0).toFixed(2)
// })



const totalItems = computed(() => {
  return cartItems.value.reduce((total, item) => 
    total + (Number(item.quantity) || 1), 0
  )
})



onMounted(() => {
  loadCart()
  window.addEventListener('cartUpdated', loadCart)
})

onUnmounted(() => {  // Использовать onUnmounted для очистки
  window.removeEventListener('cartUpdated', loadCart)
})

// Функция для исправления totalCost в корзине
const fixAllTotalCosts = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  const fixedCart = cart.map(item => {
    const quantity = Number(item.quantity) || 1
    const price = Number(item.price) || 0
    let selectedQty = 1
    
    if (item.selectedQuantity && !isNaN(Number(item.selectedQuantity.value))) {
      selectedQty = Number(item.selectedQuantity.value)
    } else if (item.countitemproduct_set && item.countitemproduct_set.length > 0) {
      const firstQty = item.countitemproduct_set[0]
      if (firstQty && !isNaN(Number(firstQty))) {
        selectedQty = Number(firstQty)
      }
    }
    
    return {
      ...item,
      totalCost: (price * selectedQty * quantity).toFixed(2)
    }
  })
  
  localStorage.setItem('cart', JSON.stringify(fixedCart))
  loadCart()
}

// // Вызовите эту функцию один раз для исправления существующих данных
// onMounted(() => {
//   fixAllTotalCosts()
// })

watch(cartItems, (newItems) => {
  const totalCount = newItems.reduce((sum, item) => sum + item.quantity, 0)
  
  // Сохраняем в localStorage
  localStorage.setItem('cartCount', totalCount.toString())
  
  // Отправляем событие
  window.dispatchEvent(new CustomEvent('cartCountUpdated', {
    detail: { count: totalCount }
  }))
}, { deep: true })

// При загрузке компонента
onMounted(() => {
  const count = cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  localStorage.setItem('cartCount', count.toString())
  window.dispatchEvent(new CustomEvent('cartCountUpdated', {
    detail: { count }
  }))
})

// Обработчик обновления стоимости отдельного товара
const handleUpdateTotal = () => {
  // Принудительно обновляем вычисляемое свойство totalCost
  forceUpdate.value++
}
 
</script>

<template>
  <section>
    <div class="wrapper-basket">
      <div class="container">
        <div v-if="cartItems.length !== 0">
        <Text class="title" tag="h2" print="basket-title" title="Моя корзина" />
        <div  class="goods_choice">
          <div>
          <div  class="goods_choice-basket">
            <CardBasket
              v-for="item in cartItems"
              :key="`${item.id}-${item.variant}`"
              :quantity="item.quantity"
              :title="item.title"
              :image_prev="item.image_prev"
              :price="item.price"
              :id="item.id"
              :variant="item.variant"
             :countitemproduct_set="item.countitemproduct_set"
              @remove-item="removeItem(item.id, item.variant, item.title)"
              @addInBasket="loadCart"
              :totalCosts="item.totalCost"
@quantityitem="updateQuantityItem"
:arrayLength="arrayLength"
@update-total="handleUpdateTotal"
            />
            </div>
          </div>
          <div>
          <div class="order-info">
            <div class="wrapper_order">
              <span class="cost">{{ totalCost }} BYN</span>
              <span class="count-order"
                >Товаров: {{ cartItems.length }}</span
              >
            </div>
            <div class="delivery-method">
              <img src="../assets/image/box.png" alt="коробка" />
              <div class="adress_wrapper">
                <span class="title_delivery">Самовывоз</span>
                <span class="adress">
                  <img
                    class="location"
                    src="../assets/image/location_major.svg"
                    alt="местоположение"
                  />
                  <span class="adress_info">Минск, ул. Чюрлёниса, 6.</span>
                </span>
              </div>
            </div>
            <button class="order-registration">
              <RouterLink to="/order" class="order-registration__link"
          >Оформить заказ
              </RouterLink></button>
          </div>
          </div>
          </div>
        </div>
        <div v-if="cartItems.length === 0" class="empty-cart">
              <img class="cat" src="../assets/image/CatinBasket.png" alt="изображение кота">
              <Text class="empty-cart__basket" tag="p" print="empty-basket" title="В корзине нет товаров. Выберите нужные товары в нашем каталоге" />
              <div>
              <Button kind="primary"><RouterLink to="/catalog" class="link_button" :class="['item']"
          >Перейти в каталог товаров</RouterLink></Button>
              </div>
            </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.wrapper-basket {
  padding: 24px 5px 64px 5px;
  background-color: var(--bg-default);
}

.title {
  margin-bottom: 24px;
}
.empty-cart {
  padding-top: 56px;
  text-align: center;
  color: var(--text-default);
  font-size: 18px;
  background-color: var(--bg-default);
  max-width: 654px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  gap: 32px;
}

.link_button{
  color: var(--white);
}

.cat {
  max-width: 369px;
  display: block;
  margin: 0 auto;
  margin-bottom: 8px;
}

.empty-cart__basket {
  text-wrap: wrap;
 
}

.goods_choice-basket {
  background-color: var(--white);
  max-width: 770px;
 width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 8px;
  justify-content: flex-start;
  align-items: flex-start;
  padding-bottom: 24px;
}

.order-info {
  padding: 16px 24px 16px 24px;
  background-color: rgba(0, 128, 96, 1);
  max-width: 371px;
  border-radius: 8px;
  width: 100%;
  flex-wrap: nowrap;
}

.order-registration__link {
  color: var(--text-default);
}

.goods_choice {
  display: flex;
  gap: 30px;
  align-content: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
}

.order-registration {
  padding: 13px;
  border-radius: 5px;
  background-color: var(--white);
  color: var(--text-default);
  font-family: 'SFProText';
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: center;
  width: 100%;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.wrapper_order {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}

.cost {
  color: rgba(255, 255, 255, 1);
  font-family: 'SFProDisplay';
  font-size: 28px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0px;
  text-align: left;
}

.count-order {
  color: rgba(255, 255, 255, 1);
  font-family: 'SFProText';
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
}

.adress_info {
  color: rgba(255, 255, 255, 1);
  font-family: 'SFProText';
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
}

.location {
  width: 16px;
  height: 16px;
}

.adress {
  display: flex;
  gap: 8px;
  align-items: center;
}

.adress_wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
}
.delivery-method {
  display: flex;
  gap: 12px;
}

@media (max-width: 1146px) {
  .goods_choice {
    justify-content: center;
  }
}


@media (max-width: 873px) {
  .title {
    font-weight: 400;
  }

  .order-info {
    min-width: 340px;
  }

  .goods_choice-basket {
    gap: 16px;
 width: auto;

  }
}

@media (max-width: 360px) {
  .order-info {
    width: 340px;
  }
  
  .cat {
  width: 268px;
}

.empty-cart__basket {
  font-size: 24px;
}

}
</style>