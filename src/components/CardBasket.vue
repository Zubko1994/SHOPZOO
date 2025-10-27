<!-- @format -->

!
<script setup lang="ts">
import Text from './Text.vue'
import Quantity from './Quantity.vue'
import { ref, computed, watch, onMounted } from 'vue'
import { onUnmounted } from 'vue'

const isComponentMounted = ref(true)


const props = withDefaults(defineProps<{
  id: number
  image_prev: string
  countitemproduct_set: string[]  
  title: string
  price: number
  quantity: number  
  variant: string   
  selected: any
}>(),
{
    quantity: 1,
  }
)



// Добавьте вычисляемое свойство для стоимости товара
const itemTotalCost = computed(() => {
  const quantity = Number(props.quantity) || 1
  const price = Number(props.price) || 0
  let selectedQty = 1
console.log(props.variant.value)
  // Получаем значение фасовки
  if (props.variant) {
    if (typeof props.variant === 'string') {
      const match = props.variant.match(/(\d+\.?\d*)\s*(.*)/)
      selectedQty = match ? parseFloat(match[1]) : 1
    } else if (props.variant.value) {
      selectedQty = parseFloat(props.variant.value) || 1
    }
  }

  return (price * selectedQty * quantity).toFixed(2)
})

// Функция для отображения фасовки
const displayVariant = computed(() => {
  if (!props.variant) return ''
  
  if (typeof props.variant === 'string') {
    return props.variant
  } else {
    return `${props.variant.value} ${props.variant.unit}`
  }
})


const selectedQuantity = ref<{value: string, unit: string} | null>(null)
const totalPrice = ref(props.price)
const countProduct = ref(props.quantity) // ← Используем переданное количество

const emit = defineEmits(['remove-item', 'quantityitem', 'update-total'])

const updateTotalPrice = (quantity: any) => {
  selectedQuantity.value = quantity
  recalculateTotalPrice()
  
  // Обновляем корзину с новой фасовкой
  updateCartVariant(quantity)
}

const updateCartVariant = (newVariant: any) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  
  const updatedCart = cart.map((item: any) => {
    if (item.id === props.id && item.title === props.title) {
      const selectedQtyValue = typeof newVariant === 'object' ? 
        parseFloat(newVariant.value) || 1 : 1;
      
      const updatedItem = {
        ...item,
        variant: newVariant,
        selectedQuantity: newVariant,
        totalCost: (Number(props.price) * selectedQtyValue * item.quantity).toFixed(2)
      };
      
      // ДИСПАТЧИМ СОБЫТИЕ ОБНОВЛЕНИЯ
      window.dispatchEvent(new CustomEvent('cartItemUpdated', {
        detail: updatedItem
      }));
      
      return updatedItem;
    }
    return item;
  });
  
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  window.dispatchEvent(new CustomEvent('cartUpdated'));
  
  // ПЕРЕСЧИТЫВАЕМ ОТОБРАЖАЕМУЮ ЦЕНУ
  recalculateTotalPrice();
}
// Функция для обновления количества и сохранения
// Функция для обновления количества и сохранения
function updateCount(newQuantity: number) {
  countProduct.value = newQuantity
  
  // ПЕРЕСЧИТЫВАЕМ С УЧЕТОМ ВЫБРАННОЙ ФАСОВКИ
  const selectedQtyValue = selectedQuantity.value ? 
    (typeof selectedQuantity.value === 'object' ? 
      parseFloat(selectedQuantity.value.value) || 1 : 1) : 1;
  
  const totalCostValue = (Number(props.price) * selectedQtyValue * newQuantity).toFixed(2);
  
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const updatedCart = cart.map((item: any) => {
    // ИСПРАВЛЕННОЕ СРАВНЕНИЕ ДЛЯ НАХОЖДЕНИЯ ТОВАРА
    const isSameItem = item.id === props.id && 
      item.title === props.title &&
      JSON.stringify(item.variant) === JSON.stringify(props.variant);
    
    if (isSameItem) {
      return { 
        ...item, 
        quantity: newQuantity, 
        totalCost: totalCostValue,
        selectedQuantity: selectedQuantity.value
      };
    }
    return item;
  });
  
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  
  // ДИСПАТЧИМ СОБЫТИЕ С ОБНОВЛЕННОЙ КОРЗИНОЙ
  window.dispatchEvent(new CustomEvent('cartUpdated', {
    detail: { cart: updatedCart }
  }));
  
  // Пересчитываем отображаемую цену
  recalculateTotalPrice();
  
  // Уведомляем родительский компонент об изменении стоимости
  emit('update-total');
}

// Функция для парсинга значения фасовки
const parseQuantityValue = (quantity: string | null): number => {
  if (!quantity) return 1
  
  if (typeof quantity === 'string') {
    const match = quantity.match(/(\d+\.?\d*)\s*(.*)/)
    return match ? parseFloat(match[1]) : 1
  }
  return 1
}


function increaseCount() {
  const newQuantity = countProduct.value + 1;
  updateCount(newQuantity);
}

function decreaseCount() {
  if (countProduct.value > 1) {
    const newQuantity = countProduct.value - 1;
    updateCount(newQuantity);
  }
}
  // watch(selectedQuantity, (newVal) => {
  //   if(newVal){
  //   selectedQuantity.value = newVal
  //   updateCount(countProduct.value)
  //   }
  // })


const removeItem = () => {
  emit('remove-item', props.id, props.variant, props.title)
}

// Инициализируем выбранную фасовку из props
onMounted(() => {
  if (props.variant) {
    if (typeof props.variant === 'string') {
      // Парсим строку в объект
      const match = props.variant.match(/(\d+\.?\d*)\s*(.*)/)
      if (match) {
        selectedQuantity.value = {
          value: match[1],
          unit: match[2] || ''
        }
      }
    } else {
      // Если это уже объект
      selectedQuantity.value = props.variant
    }
  }
  
  // Пересчитываем цену после инициализации
  recalculateTotalPrice()
})


watch(totalPrice, (newVal) => {
  console.log('Цена обновлена:', newVal)
})

watch(countProduct, (newVal) => {
countProduct.value = newVal
})

watch(() => props.variant, (newVariant) => {
  if (newVariant) {
    if (typeof newVariant === 'string') {
      const match = newVariant.match(/(\d+\.?\d*)\s*(.*)/)
      if (match) {
        selectedQuantity.value = {
          value: match[1],
          unit: match[2] || ''
        }
      }
    } else {
      selectedQuantity.value = newVariant
    }
    recalculateTotalPrice()
  }
})

// Останавливаем watch при размонтировании
const stopSelectedQuantityWatch = watch(selectedQuantity, (newVal) => {
  if (!isComponentMounted.value) return
  if(newVal){
    selectedQuantity.value = newVal
    updateCount(countProduct.value)
  }
})

const stopTotalPriceWatch = watch(totalPrice, (newVal) => {
  if (!isComponentMounted.value) return
  console.log('Цена обновлена:', newVal)
})

onUnmounted(() => {
  isComponentMounted.value = false
  stopSelectedQuantityWatch()
  stopTotalPriceWatch()
})
const recalculateTotalPrice = () => {
  if (selectedQuantity.value && props.price) {
    const selectedQtyValue = typeof selectedQuantity.value === 'object' ? 
      parseFloat(selectedQuantity.value.value) || 1 : 1;
    totalPrice.value = props.price * selectedQtyValue * countProduct.value;
  } else {
    totalPrice.value = props.price * countProduct.value;
  }
  
  // УВЕДОМЛЯЕМ РОДИТЕЛЬСКИЙ КОМПОНЕНТ ОБ ИЗМЕНЕНИИ
  emit('update-total');
}

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
          {{ displayVariant }}
           <Quantity
           :list="props.countitemproduct_set"
  @updateQuantity="updateTotalPrice"
  :selected="props.variant"

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
        <div class="cost">{{ (totalPrice).toFixed(2) }} BYN</div>
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