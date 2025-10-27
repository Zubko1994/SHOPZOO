<!-- @format -->

<script setup lang="ts">
import Input from './Input.vue'
import Navigation from './Navigation.vue'
import Button from './Button.vue'
import Link from './Link.vue'
import Text from './Text.vue'
import FormBackCall from '../components/FormBackCall.vue'
import AcceptRequest from './AcceptRequest.vue'
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import SearchDropdown from './SearchDropdown.vue'

const emit = defineEmits(['closeMenu'])

const router = useRouter()

// ДОБАВЬТЕ ПРОПСЫ ДЛЯ ПОЛУЧЕНИЯ ПРОДУКТОВ
const props = defineProps<{
  products?: any[]
}>()

// ДОБАВЬТЕ СОСТОЯНИЯ ДЛЯ ПОИСКА
const searchQuery = ref('')
const showDropdown = ref(false)

// ДОБАВЬТЕ ОБРАБОТЧИКИ ДЛЯ ПОИСКА
const handleSearch = (event: Event) => {
  searchQuery.value = (event.target as HTMLInputElement).value
  showDropdown.value = searchQuery.value.length > 0
}
const isMenuOpen = ref(false)

const closeMenu = () => {
  isMenuOpen.value = false
}


const handleSelectProduct = (product: any) => {
  console.log('Product selected in BurgerActive:', product?.id)
  
  // ДОБАВЬТЕ ПРОВЕРКУ И ПЕРЕХОД НА СТРАНИЦУ ТОВАРА
  if (product && product.id) {
    console.log('Navigating from BurgerActive to product:', product.id)
    localStorage.setItem('currentProduct', JSON.stringify(product))
    emit('closeMenu')
    closeMenu()
    router.push(`/productdescription/${product.id}`)
  }
  
  searchQuery.value = ''
  showDropdown.value = false
}

const handleCloseDropdown = () => {
  showDropdown.value = false
}

// Закрываем dropdown при клике вне компонента
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.search-container')) { 
    showDropdown.value = false;
  }
}

// Добавляем обработчик клика вне компонента
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
const showMobileSearch = ref(false)


// Функции для управления мобильным поиском
const openMobileSearch = () => {
  showMobileSearch.value = true
}

const closeMobileSearch = () => {
  showMobileSearch.value = false
  searchQuery.value = ''
}





const show = ref(false);

const showModal = () => {
  show.value = !show.value
};

const showModalWindow = ref(false);
const showAcceptWindow = ref(false);


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


</script>

<template>
  <div class="menu">
    <div class="container">
      <div class="menu__wrapper">
        <div class="search-container">
        <div class="search-field">
    <label for="search"></label>
    <input class="search field-input" type="text" placeholder="Поиск" :value="searchQuery"
          @input="handleSearch"
          @focus="showDropdown = searchQuery.length > 0">
    <img class="magnifier" src="../assets/image/Search.png" alt="иконка лупы">
  </div>
  <SearchDropdown 
        class="search-dropdown"
        :searchQuery="searchQuery"
        :products="products || []"
        :isVisible="showDropdown"
        @selectProduct="handleSelectProduct"
        @closeDropdown="handleCloseDropdown"
      />
      </div>
        <Navigation class="navigation" color="black" direction="vertical"/>
        <RouterLink to="/basket" :class="['item', `item-${color}`]"
        >
        <Button class="basket" kind="basket-big">
          <div class="wrapper-basket">
            <img class="basket_image" src="../assets/svg/basket.svg" alt="иконка корзины" />
            <span>Корзина</span>
          </div>
        </Button>
        </RouterLink>
        <div class="info__wrapper">
          <div class="menu__info">
            <div class="menu__adress">
              <img src="../assets/image/Primary.svg" alt="" />
              <Text tag="p" print="adress" title="Минск, ул. Чюрлёниса, 6." />
            </div>
            <div class="menu__metro">
              <img src="../assets/image/metro.svg" alt="" />
              <Text tag="p" print="adress" title="Малиновка" />
            </div>
          </div>
          <div class="menu__time">
              <Text tag="p" print="time" title="Пон.-Пят. 10:00-21:00" />
              <Text tag="p" print="time" title="Суб.-Вос. 10:00-20:00" />
          </div>
        
            <div class="contacts__phone">
              <img src="../assets/image/mobile_major.svg" alt="" />
              <Link :is-link="false" class="link" link="tel:+375445010355">
                + 375 (44) 501 03 55
              </Link>
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
        
          <Button class="backcall" @custom-click="showModal"  @click="showModalOpen" kind="backcall">Обратный звонок</Button>
          <FormBackCall  class="modal" v-if="showModalWindow" @close="closeForm"  @open-waiting="openAccept" />
          <AcceptRequest  class="modal" v-if="showAcceptWindow" @close="closeAccept" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.menu {
  padding: 0px 10px 24px 10px;
  background: var(--white);
  z-index: 5;
}

.backcall {
  background: none;
}

.field-input {
  border-radius: 4px;
  border: 1px solid rgb(167, 172, 177);
  padding: 8px 2px;
  margin: 0 auto;
}


.mobile-search-dropdown {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  max-height: none !important;
  margin: 0 !important;
  border-radius: 0 !important;
  z-index: 10001;
}


.search-dropdown {
  position: absolute;
  top: 100%; /* Располагается сразу под полем поиска */
  left: 0;
  right: 0;
  z-index: 1000;
  margin-top: 4px; /* Небольшой отступ от поля поиска */
}
// АДАПТИРУЙТЕ СТИЛИ ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ
@media (max-width: 992px) {
  .mobile-search-container {
    padding: 16px;
  }
  
  .field-input {
    font-size: 16px; // Увеличиваем для мобильных
  }
}

.search-field {
  display: flex;
  flex: 0 1 500px;
  position: relative;
  margin-bottom: 48px;
}

::placeholder, .search {
  color: var(--text-gray);
  font-family: "SFProText";
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  width: 100%;
  border-radius: 4px;
}

.search {
  padding: 8px 12px 8px 30px;
}

.magnifier {
  position: absolute;
  top: 10px;
  left: 6px;
}

.navigation {
  margin-bottom: 50px;
}

.wrapper-basket {
  width: 100%;
}

.basket {
  margin-bottom: 34px;
}

.basket_image {
  margin-right: 5px;
}

.menu__info {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
}

.menu__adress {
  display: flex;
  gap: 10px;
  align-items: center;
}

.menu__metro {
  display: flex;
  gap: 10px;
  align-items: center;
}

.menu__time {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.info__wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
}

.contacts__phone {
  display: flex;
  gap: 10px;
  justify-content: center;
}

/* Адаптация для мобильных устройств */
@media (max-width: 992px) {
  .search-container {
    flex: 1 1 auto;
  }
  
  .search-dropdown {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10001;
    margin-top: 0;
  }
}

.search-container {
  position: relative;
}
</style>
