<!-- @format -->

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Quantity from './Quantity.vue'
import ImageCard from './ImageCard.vue'
import Text from './Text.vue'
import Button from './Button.vue'
import OrderOneClick from './OrderOneClick.vue'
import ModalWindowWaitingOrder from './ModalWindowWaitingOrder.vue'
import { useRouter } from 'vue-router'



const props = withDefaults( 
  defineProps<{
  id: number, 
  image_prev: string
  title: string
  countitemproduct_set: string[]
  price: number
  currentCategory?: number 
  animal: string[]
  sale: {id: number; image: string; percent: number; title: string }
  promotion: string,
  description?: string
  key_features: string
  guaranteed_analysis: string
  nutritional_supplements: string
  brand: {id: number; name: string}
}>(),
{
    promotion: "Акция",
  }
)

const selectedQuantity = ref<string | null>(null)
console.log(selectedQuantity.value)
const totalPrice = ref(props.price)
 const quantity = Number(selectedQuantity.value)
  const totalCost = (props.price * quantity).toFixed(2)


const updateTotalPrice = (quantity: string) => {
  selectedQuantity.value = quantity
  console.log(quantity)

  const info = JSON.parse(JSON.stringify(quantity))
  console.log(info.value)
  totalPrice.value = (props.price * info.value).toFixed(2)
  
  watch(totalPrice, (newVal) => {
    if(newVal){
    totalPrice.value = newVal
    }
  })
}

watch(() => props.price, () => {
  selectedQuantity.value = null
  return props.price
})



const emit = defineEmits(['updateCategory', 'addInBasket'])



function addProduct() {
  let selectedQtyValue = 1;
  let selectedQtyUnit = '';

  // Парсим выбранную фасовку
  if (selectedQuantity.value) {
    if (typeof selectedQuantity.value === 'string') {
      const match = selectedQuantity.value.match(/(\d+\.?\d*)\s*(.*)/);
      if (match) {
        selectedQtyValue = parseFloat(match[1]);
        selectedQtyUnit = match[2] || '';
      }
    } else {
      // Если это объект
      selectedQtyValue = parseFloat(selectedQuantity.value.value) || 1;
      selectedQtyUnit = selectedQuantity.value.unit || '';
    }
  }

  const productToAdd = {
    id: props.id,
    image_prev: props.image_prev,
    brand: props.brand.name,
    description: props.description,
    key_features: props.key_features,
    countitemproduct_set: props.countitemproduct_set,
    title: props.title,
    price: Number(props.price),
    quantity: countProduct.value,
    variant: {
      value: selectedQtyValue.toString(),
      unit: selectedQtyUnit
    },
    totalCost: (Number(props.price) * selectedQtyValue * countProduct.value).toFixed(2),
  }

  console.log('Adding product to cart:', productToAdd)

  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  
  const productKey = `${productToAdd.id}-${productToAdd.variant.value}-${productToAdd.variant.unit}-${productToAdd.title}`

  const existingIndex = cart.findIndex(
    (item) => 
      `${item.id}-${item.variant?.value}-${item.variant?.unit}-${item.title}` === productKey
  )

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += productToAdd.quantity
    cart[existingIndex].totalCost = (
      Number(cart[existingIndex].price) *
      (parseFloat(cart[existingIndex].variant?.value) || 1) *
      cart[existingIndex].quantity
    ).toFixed(2)
  } else {
    cart.push(productToAdd)
  }

  localStorage.setItem('cart', JSON.stringify(cart))
  window.dispatchEvent(new CustomEvent('cartUpdated'))

}


const showModal = ref(false)
const showModalOrder = ref(false)

const showModalWindow = ()=> {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const showModalWindowOrder = ()=> {
  showModal.value = false
  showModalOrder.value = true
}

const closeModalOrder = () => {
  showModalOrder.value = false
}





const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && showModal.value) {
    showModal.value = false;
  }
}


watch(showModal, (newValue) => {
  if (newValue) {
    document.addEventListener('keydown', handleKeydown);
    document.body.style.overflow = 'hidden'; // Блокируем прокрутку body
  } else {
    document.removeEventListener('keydown', handleKeydown);
    document.body.style.overflow = '';
  }
});


const router = useRouter()

const storeProductData = () => {
  const productData = {
    id: props.id,
    title: props.title,
    image_prev: props.image_prev,
    countitemproduct_set: props.countitemproduct_set,
    price: props.price,
    sale: props.sale,
    description: props.description,
    key_features: props.key_features,
    brand: props.brand,
    guaranteed_analysis: props.guaranteed_analysis,
  nutritional_supplements: props.nutritional_supplements
  }
  
  console.log('Saving product data:', productData)
  localStorage.setItem('currentProduct', JSON.stringify(productData))
     // Диспатчим кастомное событие
  const event = new CustomEvent('productUpdated', {
    detail: productData
  })
  window.dispatchEvent(event)
  console.log('Card: Dispatched productUpdated event')

  
  // Переходим на страницу товара
  router.push(`/productdescription/${props.id}`)
}

const countProduct = ref(1)

function updateCount(newQuantity: number) {
  // totalCost = цена * выбранноеКоличество * количество товаров
  countProduct.value = newQuantity
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


</script>

<template>
  <div class="card">
    <div class="wrapper-ceil">
      <div v-if="props.sale && props.sale.percent > 0" class="product-promotion">
{{props.promotion}}
      </div>
      <ImageCard class="image-good" :src="props.image_prev" />
      <div class="wrapper-title">
        <Text class="card_title" tag="h3" print="title" ><RouterLink  @click.prevent="storeProductData"  :to="`/productdescription/${props.id}`" class="product_title" :class="['item']"
          >{{ props.title }}</RouterLink></Text>
      </div>
    </div>
    <div class="wrapper-bottom">
    <div class="wrapper-quantity">
      <Quantity
        :list="props.countitemproduct_set"
        @updateQuantity="updateTotalPrice"
        :selected="selectedQuantity" 
      />
    </div>
    <div class="wrapper-basket">
      <div class="cost-info">
        <div class="wrapper-price">
      <div v-if="props.sale && props.sale.percent > 0" class="total-price">{{(+totalPrice + +(totalPrice*props.sale.percent/100)).toFixed(2)}}BYN</div>
        <span class="cost">{{ totalPrice }} BYN </span>
        </div>
        <Button @click="addProduct" title="" class="basket" kind="basket-adding" />
      </div>
      <Button @click="showModalWindow" kind="buying">Купить в 1 клик</Button>
    </div>
  </div>
  </div>
  


  <section class="order" v-if="showModal">
    <div class="order__wrapper">
      <div class="modal-ceil">
      <div v-if="props.sale && props.sale.percent > 0" class="product-promotion-modal">
{{props.promotion}}
      </div>
    <div class="cross_block">
        <img
          class="cross"
          @click.self="closeModal"
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
        <div class="wrapper-cost">
        <div v-if="props.sale && props.sale.percent > 0" class="total-price">{{(+totalPrice + +(totalPrice*props.sale.percent/100)).toFixed(2)}}BYN</div>
        <div class="cost">{{ totalPrice }} BYN</div>
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
        <Button @click="showModalWindowOrder" class="button-send" kind="primary" 
          >Оформить заказ</Button
        >
        <Text tag="p" print="personal"
          >Нажимая на кнопку вы даёте согласие на обработку
          <span>персональных данных</span></Text
        >
        </div>
            </div>
  </section>
  <ModalWindowWaitingOrder v-if="showModalOrder" @closeWindow="closeModalOrder"/>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
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

.product-promotion {
    position: absolute;
    top: 8px;
    left: 8px;
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

.product_title {
  color: var(--text-default);
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

.wrapper-quantity {
  margin-bottom: 10px;
  align-items: center;
}

.cost-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 9px;

}

.cost {
  display: block;
  font-family: 'SFProText';
font-weight: 700;
font-style: Bold;
font-size: 16px;
line-height: 130%;
letter-spacing: 0px;

  color: var(--text-default);
  text-wrap: nowrap;
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

.wrapper-price {
  display: flex;
  gap: 4px;
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


@media (max-width: 576px) {
  
  .image-good {
    text-align: center;
    width: 100%;
    display: block;
    margin: 0 auto;
  }

  .card_title {
  -webkit-line-clamp: 2;
  position: relative;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
  
}

@media (max-width: 360px) {
  .container {
    max-width: 360px;
  }

 

  .wrapper-bottom {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .card {
    padding: 8px;
    align-content: flex-start;
  }
}







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

.wrapper-cost{
  display: flex;
  align-items: center;
  gap: 6px;
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
    // width: 611px;
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
}    

.button-send {
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
    gap: 17px;
    justify-content: space-between;
    
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
    gap: 6px;
  }
  
  .goods_info-wrapper {
    display: flex;
    gap: 15px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  
  .wrapper-card {
    display: flex;
    gap: 16px;
    justify-content: space-between;
    width: 563px;
    width: 100%;
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
  
  .cost {
    color: var(--text-default);
    font-family: 'SFProText';
    font-size: 16px;
    font-weight: 400;
    line-height: 130%;
    letter-spacing: 0px;
    text-align: left;
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
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto; // Добавляем прокрутку если контент не помещается
}  

.order__wrapper {
  background-color: var(--white);
  // max-width: 611px; // Меняем width на max-width
  max-width: 611px; // Добавляем относительную ширину
  margin: 20px auto; // Добавляем отступы сверху и снизу
  border-radius: 8px;
  position: absolute;
  max-height: 90vh; // Ограничиваем максимальную высоту
  overflow-y: auto; // Добавляем прокрутку внутри модального окна
}
  

@media (max-width: 684px) {

  .order__wrapper{
    padding: 8px;
  }

  .contacts-info{
   width: 340px;
  }
 .wrapper-card{

    flex-direction: column;
  }  
  .wrapper-card_left {
  flex-direction: column;
  align-items: flex-start;
}  

.goods_info-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  // align-content: flex-start!important; 
}  

.count {
  align-self: start;
}

.order {
  padding: 8px;
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
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
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
  margin-bottom: 16px;
}    
  
.order__wrapper {
  background-color: var(--white);
  // max-width: 611px;
  width: 90%;
  margin: 20px auto;
  border-radius: 8px;
  position: absolute;
  max-height: 90vh;
  overflow-y: auto;
}  

// Остальные стили остаются без изменений до медиа-запросов

@media (max-width: 768px) {
  .order {
    padding: 16px;
  }

  .order__wrapper {
    width: 95%;
    margin: 10px auto;
  }

  .product-promotion-modal {
    top: 16px;
    left: 16px;
  }
}

@media (max-width: 684px) {
  .order {
    padding: 8px;

  }

  .order__wrapper {
    width: 98%;
    margin: 5px auto;
    max-height: 95vh;
  }

  .order__title {
    font-size: 18px;
    line-height: 24px;
    padding: 0 16px;
  }

  .contacts-info {
    max-width: 100%;
    padding: 0 16px;
  }

  .wrapper-bottom-form {
    padding: 0 16px 16px;
  }

  .wrapper-card {
    flex-direction: column;
    gap: 12px;
    padding: 0 16px;
  }

  .wrapper-card_left {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .goods_info-wrapper {
    flex-direction: column;
    gap: 12px;
   
  }

  
  .cross_block {
    padding: 8px 8px 0 0;
  }
}

@media (max-width: 360px) {
  .order {
    padding: 4px;
  }

  .order__wrapper {
    width: 99%;
    margin: 2px auto;
  }

  .order__title {
    font-size: 16px;
    padding: 0 12px;
  }

  .contacts-info {
    padding: 0 12px;
  }

  .wrapper-bottom-form {
    padding: 0 12px 12px;
  }

  input {
    font-size: 14px;
  }

  .button-send {
    width: 100%;
  }

  .wrapper-card {
    padding: 0 12px;
  }
}



</style>
