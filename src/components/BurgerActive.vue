<!-- @format -->

<script setup lang="ts">
import { ref } from 'vue'
import Input from './Input.vue'
import Navigation from './Navigation.vue'
import Button from './Button.vue'
import Link from './Link.vue'
import Text from './Text.vue'
import FormBackCall from '../components/FormBackCall.vue'
import AcceptRequest from './AcceptRequest.vue'

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
        <div class="search-field">
    <label for="search"></label>
    <input class="search field-input" type="text" placeholder="Поиск">
    <img class="magnifier" src="../assets/image/Search.png" alt="иконка лупы">
  </div>
        <Navigation class="navigation" color="black" direction="vertical"/>
        <Button class="basket" kind="basket-big">
          <div class="wrapper-basket">
            <img class="basket_image" src="../assets/svg/basket.svg" alt="иконка корзины" />
            <span>Корзина</span>
          </div>
        </Button>
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


</style>
