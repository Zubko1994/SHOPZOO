<script setup lang="ts">
import LogoFooter from './LogoFooter.vue'
import Button from './Button.vue'
</script>

<template>
  <div class="wrapper-navigation">
      <div class="container">
        <div class="wrapper">
          <LogoFooter />
          <div class="wrapper-element">
          <img class="magnifier" src="../assets/image/Search.png" alt="иконка лупы">
          <Button class="basket-button" kind="basket">
            <div class="wrapper-basket">
              <img src="../assets/svg/basket.svg" alt="иконка корзины" />
              <span>0</span>
            </div>
          </Button>
          <div class="burger">
            <button class="burger__menu">
              <span></span>
            </button>
          </div>
        </div>
        </div>
      </div>
  </div>
</template>

<style lang="scss" scoped>

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

.burger {
    display: block;
}

}

</style>
