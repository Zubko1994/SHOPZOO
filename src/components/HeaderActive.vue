<script setup lang="ts">
import LogoFooter from './LogoFooter.vue'
import Button from './Button.vue'
import { ref, computed } from 'vue';
import BurgerActive from './BurgerActive.vue';

const isActive = ref(false);

const toggleClass = () => {
  isActive.value = !isActive.value;
};

const themeClass = computed(() => (isActive.value ? 'burger-active' : 'burger__menu'));
const showMenu = computed(() => (isActive.value ? 'showMenu' : 'hideMenu'));

</script>

<template>
  <div class="wrapper-navigation">
      <div class="container">
        <div class="side-bar">
        <div class="wrapper">
          <LogoFooter class="logo-active" />
          <div class="wrapper-element">
          <img class="magnifier" src="../assets/image/Search.png" alt="иконка лупы">
          <Button class="basket-button" kind="basket">
            <div class="wrapper-basket">
              <img src="../assets/svg/basket.svg" alt="иконка корзины" />
              <span>0</span>
            </div>
          </Button>
          <div class="burger">
            <button class="burger__menu" :class="themeClass" @click="toggleClass">
              <span></span>
            </button>
          </div>
        </div>
      </div>
      <BurgerActive class="hideMenu" :class="showMenu"/>


        </div>
      </div>
  </div>
</template>

<style lang="scss" scoped>

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


}

</style>
