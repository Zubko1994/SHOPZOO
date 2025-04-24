<!-- @format -->

<script setup lang="ts">
import Text from './Text.vue'
import Link from './Link.vue'
import Button from './Button.vue';
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <div class="header__info">
        <div class="header__adress">
          <img src="../assets/image/Primary.svg" alt="" />
          <Text tag="p" print="title_adress" title="Минск, ул. Чюрлёниса, 6." />
        </div>
        <div class="header__metro">
          <img src="../assets/image/metro.svg" alt="" />
          <Text tag="p" print="title_adress" title="Малиновка" />
        </div>
      </div>
        <div class="header__time">
          <div class="timetable">
            <img src="../assets/image/clock.svg" alt="" />
            <Text tag="p" print="title_time" title="Пон.-Пят. 10:00-21:00" />
          </div>
          <div class="line"></div>
          <div class="timetable">
            <Text tag="p" class="title_time" title="Суб.-Вос. 10:00-20:00" />
          </div>
        </div>
        <div class="contacts">
          <div class="contacts__phone">
            <img src="../assets/image/mobile_major.svg" alt="" />
            <Link :is-link="false" class="link" link="tel:+375445010355">
              + 375 (44) 501 03 55
            </Link>
          </div>
          <Link kind="instagram">
            <img class="instagram_image" src="../assets/image/instagram-2-1 1.svg" alt="">
          </Link>
        </div>
        <Button kind="backcall">Обратный звонок</Button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.instagram_image {
  width: 14px;
  height: 14px;
  display: block;
}

.header {
  background-color: var(--bg-default);
}

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
}

.header__metro {
  display: flex;
  gap: 6px;
}

.header__time {
  display: flex;
  gap: 6px;
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
  gap: 30px;
}

.contacts__phone {
  display: flex;
  gap: 10px;
}






</style>
