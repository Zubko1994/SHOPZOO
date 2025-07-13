<!-- @format -->

<script setup lang="ts">

import Link from './Link.vue'
</script>

<template>
  <section class="crumbs">
    <div class="container">
      <div class="crumbs_menu">
        <Link class="link-item" :is-link="false" link="home" to="/home" kind="crumbs-black" >
        Главная
        </Link>
        <div class="wrapper-arrow">
          <img class="arrow" src="../assets/svg/PrimaryFill.svg" />
        </div>
        <Link class="link-item" :is-link="true" to="/catalog" link="catalog" kind="crumbs-grey" >
        Каталог
        </Link>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

.crumbs {
  background-color: var(--bg-default);
  padding: 16px 5px 0px 5px;
}

.crumbs_menu {
 display: flex;
 gap: 15px;
 align-items: center;

}

.wrapper-arrow {
  display: flex;
}

.arrow {
  display: block;
}

.link-item {
  cursor: pointer;
}
</style>
