<script setup lang="ts">
import LogoFooter from './LogoFooter.vue'
import Button from './Button.vue'
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import BurgerActive from './BurgerActive.vue';
import { inject } from 'vue';
import SearchDropdown from './SearchDropdown.vue';

const isMenuOpen = ref(false)

const closeMenu = () => {
  isActiveInternal.value = false
  emit('update:isActive', false)
  console.log('Menu closed from BurgerMenu')
}
// ДОБАВЬТЕ ПРОПСЫ ДЛЯ ПОЛУЧЕНИЯ ПРОДУКТОВ
const props = defineProps<{
  isActive?: boolean
  products?: any[] // ДОБАВЬТЕ ЭТОТ ПРОПС
}>();

const isActiveInternal = ref(props.isActive || false);
const isActive = ref(false);
const closeCatalogFilters = inject('closeCatalogFilters');
const showDropdown = ref(false)

// ДОБАВЬТЕ СОСТОЯНИЯ ДЛЯ МОБИЛЬНОГО ПОИСКА
const showMobileSearch = ref(false)
const searchQuery = ref('')

// ДОБАВЬТЕ ОБРАБОТЧИКИ ДЛЯ ПОИСКА
const openMobileSearch = () => {
  showMobileSearch.value = true
}

const closeMobileSearch = () => {
  showMobileSearch.value = false
  searchQuery.value = ''
  showDropdown.value = false // ДОБАВЬТЕ ЭТУ СТРОЧКУ
}


const handleSearch = (event: Event) => {
  searchQuery.value = (event.target as HTMLInputElement).value
  showDropdown.value = searchQuery.value.length > 0 // ДОБАВЬТЕ ЭТУ СТРОЧКУ
  emit('searchProduct', searchQuery.value)
}

const handleSelectProduct = (product: any) => {
  emit('selectProduct', product)
  closeMobileSearch()
  closeMenu()
}






// const toggleClass = () => {
//   isActive.value = !isActive.value;
//   isActiveInternal.value = !isActiveInternal.value;
  
// };

// const themeClass = computed(() => (isActive.value ? 'burger-active' : 'burger__menu'));
// const showMenu = computed(() => (isActive.value ? 'showMenu' : 'hideMenu'));

// const  themeClassOther = computed(() => (isActiveInternal.value ? 'burger-active' : 'burger__menu'));
// const showMenuOther = computed(() => (isActiveInternal.value ? 'showMenu' : 'hideMenu'));




// // Следим за изменениями props.isActive
// watch(() => props.isActive, (newVal) => {
//   isActiveInternal.value = newVal;
// });

watch(() => props.isActive, (newVal) => {
  isActiveInternal.value = newVal || false;
});

const toggleClass = () => {
  isActiveInternal.value = !isActiveInternal.value;
  emit('update:isActive', isActiveInternal.value);
 
};

const themeClass = computed(() => (isActiveInternal.value ? 'burger-active' : 'burger__menu'));
const showMenu = computed(() => (isActiveInternal.value ? 'showMenu' : 'hideMenu'));



function closeFilters (isActiveWindowFilters: boolean){
  isActive.value = isActiveWindowFilters
  isActiveInternal.value = isActiveWindowFilters;
  toggleClass()
}

const emit = defineEmits(['update:isActive', 'searchProduct', 'selectProduct'])

const openFilters = ref(false)


watch(() => props.isActive, (newVal) => {
  isActiveInternal.value = newVal || false;
});

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

</script>

<template>
  <div class="wrapper-navigation">
      <div class="container">
        <div class="side-bar">


        <div class="wrapper">
          <LogoFooter class="logo-active" />
          <div class="wrapper-element">
            
          <button @click="openMobileSearch" class="mobile-search-toggle">
              <img  src="../assets/image/Search.png" alt="иконка лупы">
            </button>
           
          <RouterLink to="/basket" :class="['item', `item-${color}`]"
        >
          <Button class="basket-button" kind="basket">
            <div class="wrapper-basket">
              <img src="../assets/svg/basket.svg" alt="иконка корзины" />
              <span>{{ cartCount }}</span>
            </div>
          </Button>
          </RouterLink>
        
          <div class="burger">
            <button class="burger__menu" :class="themeClass" @click="toggleClass" @click.self="closeFilters" >
              <span></span>
            </button>
          </div>
        </div>
      </div>

          <!-- МОБИЛЬНОЕ ОКНО ПОИСКА -->
        <div v-if="showMobileSearch" class="mobile-search-overlay">
          <div class="mobile-search-header">
            <button @click="closeMobileSearch" class="back-button">
              <img class="arrow-back" src="../assets/image/arrow-back.svg" alt="Назад" />
            </button>
            <div class="mobile-search-field">
              <label for="search"></label>
              <input 
                class="search field-input" 
                type="text" 
                placeholder="Поиск"
                :value="searchQuery"
                @input="handleSearch"
                autofocus
                @focus="showDropdown = searchQuery.length > 0"
              >
              <img class="magnifier magnifier-search" src="../assets/image/Search.png" alt="иконка лупы">
            </div>
          </div>

          <!-- КОМПОНЕНТ РЕЗУЛЬТАТОВ ПОИСКА -->
          <SearchDropdown 
            class="mobile-search-dropdown"
            :searchQuery="searchQuery"
            :products="products || []"
            :isVisible="showDropdown"
            @selectProduct="handleSelectProduct"
            @closeDropdown="closeMobileSearch"
          />
        </div>
      <BurgerActive @closeMenu="closeMenu" class="hideMenu" :class="showMenu" :products="products" />


        </div>
      </div>
  </div>
</template>

<style lang="scss" scoped>

.wrapper-navigation {
  background-color: var(--white);
}

.arrow-back {
  width: 30px;
  height: 30px;
}

.wrapper {
  display: flex;
  gap: 5px;
  justify-content: space-between;
  align-items: center;
  padding: 8px 5px 8px 5px;
  

}

.wrapper-element {
  display: flex;
  gap: 27px;
  justify-content: space-between;
  align-items: center;
}

.basket-button {
  width: 34px;
  height: 20px;
  border: none;
  padding: 0;
  margin-right: 0px;
}

.wrapper-basket {
  display: flex;
  gap: 5px;
  width: 34px;
  height: 20px;
  align-items: center;
}

.burger__menu {
    width: 20px;
    height: 16px;
    position: relative;
    cursor: pointer;
    background: none;
}

.burger__menu > span {
    width: 100%;
    display: block;
    height: 2px;
    background: black;
    color: #000000;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    transition: all .3s linear;
}

.burger__menu::after,
.burger__menu::before {
    position: absolute;
    content: '';
    display: block;
    width: 20px;
    height: 2px;
    background: black;
    transition: all .3s linear;
}

.burger__menu::after {
    left: 0;
    bottom: 0;
}

.burger__menu::before {
    right: 0;
    top: 0;
}

.burger {
    display: none;
}

.burger-active span {
    opacity: 0;
}

.burger-active::after {
    width: 100%;
    left: 50%;
    top: 50%;
    transform: translateY(-50%) translateX(-50%) rotate(45deg);
    transition: all .3s linear;
}

.burger-active::before {
    width: 100%;
    left: 50%;
    top: 50%;
    transform: translateY(-50%) translateX(-50%) rotate(-45deg);
    transition: all .3s linear;
}




@media (max-width: 992px) {

.container {
    max-width: 992px;
}

.wrapper-navigation {
  position: fixed;
  z-index: 1000;
  width: 100%;
}
.burger {
    display: block;
    z-index: 2;
}

.logo-active {
  z-index: 2;
}

.hideMenu {
  position: fixed;
  top: 0;
  left: -300%;
  z-index: 10001;
  background-color: var(--white);
  width: 100%;
  height: 100%;
  transition: all .3s linear;
  padding: 45px 10px 0px;
}

.showMenu {
  left: 0;
  z-index: 10002;
}

.side-bar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  
}


}

.wrapper-navigation {
  background-color: var(--white);
}

.wrapper {
  display: flex;
  gap: 5px;
  justify-content: space-between;
  align-items: center;
  padding: 8px 5px 8px 5px;
}

.wrapper-element {
  display: flex;
  gap: 27px;
  justify-content: space-between;
  align-items: center;
}

.basket-button {
  width: 34px;
  height: 20px;
  border: none;
  padding: 0;
  margin-right: 0px;
}

.wrapper-basket {
  display: flex;
  gap: 5px;
  width: 34px;
  height: 20px;
  align-items: center;
}

// ДОБАВЬТЕ СТИЛИ ДЛЯ МОБИЛЬНОГО ПОИСКА
.mobile-search-toggle {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.mobile-search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 10000;
}

.mobile-search-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
  background: white;
}

.back-button {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.mobile-search-field {
  display: flex;
  position: relative;
  flex: 1;
}

.field-input {
  width: 100%;
  padding: 8px 12px 8px 30px;
  border: 1px solid #a7acb1;
  border-radius: 4px;
  font-family: "SFProText";
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  
  &::placeholder {
    color: var(--text-gray);
  }
}

.magnifier {
  position: absolute;
  top: 10px;
  left: 290px;
  z-index: 1;
}

.magnifier-search {
  position: absolute;
  top: 10px;
  left: 9px;
  z-index: 1;
}

.magnifier-mobile {
  position: absolute;
  top: 10px;
  left: 240px;
  z-index: 1;
}

.mobile-search-dropdown {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10001;
}

// СУЩЕСТВУЮЩИЕ СТИЛИ БУРГЕРА
.burger__menu {
    width: 20px;
    height: 16px;
    position: relative;
    cursor: pointer;
    background: none;
}

.burger__menu > span {
    width: 100%;
    display: block;
    height: 2px;
    background: black;
    color: #000000;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    transition: all .3s linear;
}

.burger__menu::after,
.burger__menu::before {
    position: absolute;
    content: '';
    display: block;
    width: 20px;
    height: 2px;
    background: black;
    transition: all .3s linear;
}

.burger__menu::after {
    left: 0;
    bottom: 0;
}

.burger__menu::before {
    right: 0;
    top: 0;
}

.burger {
    display: none;
}

.burger-active span {
    opacity: 0;
}

.burger-active::after {
    width: 100%;
    left: 50%;
    top: 50%;
    transform: translateY(-50%) translateX(-50%) rotate(45deg);
    transition: all .3s linear;
}

.burger-active::before {
    width: 100%;
    left: 50%;
    top: 50%;
    transform: translateY(-50%) translateX(-50%) rotate(-45deg);
    transition: all .3s linear;
}

@media (max-width: 992px) {
  .container {
    max-width: 992px;
  }

  .wrapper-navigation {
    position: fixed;
    z-index: 1000;
    width: 100%;
  }
  
  .burger {
    display: block;
    z-index: 2;
  }

  .logo-active {
    z-index: 2;
  }

  .hideMenu {
    position: fixed;
    top: 0;
    left: -300%;
    z-index: 1;
    background-color: var(--white);
    width: 100%;
    height: 100%;
    transition: all .3s linear;
    padding: 45px 10px 0px;
  }

  .showMenu {
    left: 0;
  }

  .side-bar {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  // АДАПТИРУЙТЕ СТИЛИ ДЛЯ МОБИЛЬНОГО ПОИСКА
  .mobile-search-field .field-input {
    font-size: 16px; // Увеличиваем для мобильных
  }
  
  // СКРЫВАЕМ ОБЫЧНОЕ МЕНЮ ПРИ ОТКРЫТОМ ПОИСКЕ
  .mobile-search-overlay ~ .hideMenu {
    display: none;
  }
}

.mobile-search-dropdown {
  position: fixed !important;
  top: 60px !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  max-height: none !important;
  margin: 0 !important;
  border-radius: 0 !important;
  z-index: 10001;
}

// ДОБАВЬТЕ ЭТОТ СТИЛЬ:
.mobile-search-overlay {
  overflow: hidden; // ДОБАВЬТЕ ЭТУ СТРОЧКУ
}
</style>
