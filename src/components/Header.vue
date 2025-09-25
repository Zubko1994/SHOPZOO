<!-- @format -->

<script setup lang="ts">
import Text from './Text.vue'
import Link from './Link.vue'
import Button from './Button.vue'
import LogoHeader from './LogoHeader.vue'
import Navigation from './Navigation.vue'
import Input from './Input.vue'
import FormBackCall from '../components/FormBackCall.vue'
import AcceptRequest from './AcceptRequest.vue'
import { ref, onMounted, onUnmounted, computed } from 'vue'

const showModalWindow = ref(false);
const showAcceptWindow = ref(false);
const products = ref([]); // Добавляем список продуктов для поиска

const showModalOpen = () => {
  showModalWindow.value = !showModalWindow.value
};

const closeForm = () => {
  showModalWindow.value = false
}

const openAccept = () => {
  showModalWindow.value = false
  showAcceptWindow.value = true 
}

const closeAccept = () => {
  showAcceptWindow.value = false
}

const cartCount = ref(0)

const updateCartCount = () => {
  const count = localStorage.getItem('cartCount') || '0'
  cartCount.value = parseInt(count)
  console.log('Cart count updated to:', cartCount.value)
}

const searchQuery = ref('')
const emit = defineEmits(['searchProduct','selectProduct']);

const searchProduct = (query: string) => {
  searchQuery.value = query
  emit('searchProduct', searchQuery.value);
  console.log(searchQuery.value)
}

const selectProduct = (product: any) => {
  emit('selectProduct', product);
  // Можно добавить переход на страницу товара
  console.log('Selected product:', product);
}

interface Cards {
  id: number
  image_prev: string
  title: string
  price: string
  countitemproduct_set: string[]
  animal: { id: number; title: string }[]
  brand: { id: number; name: string; image: string }
  category: { id: number; name: string; parent: number }
  sale: { id: number; image: string; percent: number; title: string }
}

interface CardsObj {
  count: number
  next: string | null
  previous: string | null
  results: Cards[]
}

const pageUrls = [
  `https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create`,
  'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create&page=2',
  'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create&page=3',
  'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create&page=4',
  'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create&page=5',
  'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create&page=6',
  'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create&page=7',
]

const dataCards = ref<CardsObj[] | null>(null)

const allCards = computed(() => {
  return dataCards.value?.flatMap((page) => page.results) || []
})

// Функция для загрузки всех страниц
const loadAllProducts = async () => {
  try {
    console.log('Loading products for search...');
    
    // Загружаем все страницы параллельно
    const promises = pageUrls.map(async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error(`Error loading page ${url}:`, error);
        return { results: [] };
      }
    });

    const allPages = await Promise.all(promises);
    console.log(allPages.values)
    
    // Объединяем все результаты
    const allProducts = allPages.flatMap(page => page.results || []);
    console.log(allProducts)
    
    products.value = allProducts;
    console.log(`Loaded ${allProducts.length} products for search`);
    
  } catch (error) {
    console.error('Error loading products for search:', error);
    products.value = [];
  }
};

// Слушаем события обновления корзины
const handleCartUpdate = () => {
  console.log('Cart update event received')
  updateCartCount()
}

// Загрузите продукты при монтировании
onMounted(() => {
  updateCartCount()
  loadAllProducts() // Важно: вызываем загрузку продуктов
  
  window.addEventListener('cartCountUpdated', handleCartUpdate)
  window.addEventListener('cartUpdated', handleCartUpdate)
})

onUnmounted(() => {
  window.removeEventListener('cartCountUpdated', handleCartUpdate)
  window.removeEventListener('cartUpdated', handleCartUpdate)
})
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <div class="header__info">
          <div class="header__adress">
            <img src="../assets/image/Primary.svg" alt="" />
            <Text tag="p" print="adress" title="Минск, ул. Чюрлёниса, 6." />
          </div>
          <div class="header__metro">
            <img src="../assets/image/metro.svg" alt="" />
            <Text tag="p" print="adress" title="Малиновка" />
          </div>
        </div>
        <div class="header__time">
          <div class="timetable">
            <img src="../assets/image/clock.svg" alt="" />
            <Text tag="p" print="time" title="Пон.-Пят. 10:00-21:00" />
          </div>
          <div class="line"></div>
          <div class="timetable">
            <Text tag="p" print="time" title="Суб.-Вос. 10:00-20:00" />
          </div>
        </div>
        <div class="contacts">
          <div class="contacts__phone">
            <img src="../assets/image/mobile_major.svg" alt="" />
            <Link :is-link="false" class="link" link="tel:+375445010355">
              + 375 (44) 501 03 55
            </Link>
          </div>
          <Link
            :is-link="false"
            link="https://yandex.by/search"
            kind="instagram"
          >
            <img
              class="instagram_image"
              src="../assets/image/instagram-2-1 1.svg"
              alt=""
            />
          </Link>
        </div>
        <Button @click="showModalOpen" kind="backcall">Обратный звонок</Button>
      </div>
      <FormBackCall  class="modal" v-if="showModalWindow" @close="closeForm"  @open-waiting="openAccept"/>
    </div>
    <AcceptRequest  class="modal" v-if="showAcceptWindow" @close="closeAccept" />
    <div class="wrapper-navigation">
      <div class="container">
        <div class="wrapper">
          <LogoHeader/>
          <Input class="search" @searchProduct="searchProduct" @selectProduct="selectProduct"
            :products="products" />
          
          <Navigation color="white" />
          <Button kind="basket">
            <RouterLink to="/basket" :class="['item', `item-${color}`]"
          >
            <div class="wrapper-basket">
              <img src="../assets/svg/basket.svg" alt="иконка корзины" />
              <span>{{ cartCount }}</span>
            </div>
            </RouterLink>
          </Button>
          <div class="burger">
            <button class="burger__menu">
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.container {
  max-width: 1170px;
  margin: 0 auto;
}

.instagram_image {
  width: 14px;
  height: 14px;
  display: block;
}

.header {
  background-color: var(--bg-default);
  position: sticky;
  top: 0;
  z-index: 10;
}

.modal {
  position: fixed;
}

// .logo-header {
//   display: block;
//   text-wrap: nowrap;
// }

// .logo-header_adapt {
//   display: none;
//   text-wrap: nowrap;
// }

.header__wrapper {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  padding: 12px 5px 12px 5px;
}

.header__info {
  display: flex;
  gap: 12px;
}

.header__adress {
  display: flex;
  gap: 10px;
  text-wrap: nowrap;
}

.header__metro {
  display: flex;
  gap: 6px;
  align-items: center;
  text-wrap: nowrap;
}

.header__time {
  display: flex;
  gap: 6px;
  text-wrap: nowrap;
}

.timetable {
  display: flex;
  gap: 4px;
}

.line {
  width: 5px;
  height: 17px;
  background-color: rgb(140, 145, 150);
}

.contacts {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}

.contacts__phone {
  display: flex;
  gap: 10px;
  align-items: center;
  text-wrap: nowrap;
}

.wrapper-navigation {
  background: var(--highlight);
  padding: 8px 5px 8px 5px;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

span {
  /* Mobile/Button */
  color: var(--text-default);
  font-family: 'SFProText';
  font-size: 15px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
}

.wrapper-basket {
  display: flex;
  gap: 5px;
}




@media (max-width: 992px) {

.container {
    max-width: 992px;
}

.header__wrapper {
    display: none;
}

.burger {
    display: block;
}


}


</style>
