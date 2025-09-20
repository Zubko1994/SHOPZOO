<!-- @format -->

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'


const route = useRoute()
const article = ref({
  id: 0,
  title: '',
  text: '',
  image: '',
  date_create: '',
  read_time: ''
})


const props = defineProps<{
link: string
to: string
title: string
}>()

import Link from './Link.vue'


onMounted(() => {
  // Получаем данные из localStorage
  const storedArticle = localStorage.getItem('currentArticle')
  if (storedArticle) {
    article.value = JSON.parse(storedArticle)
  }
  
})

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
        <Link class="link-item" :is-link="true" :to="to" link="articles" kind="crumbs-black" >
        Статьи
        </Link>
        <div class="wrapper-arrow">
          <img class="arrow" src="../assets/svg/PrimaryFill.svg" />
        </div>
        <Link class="link-item" :is-link="false" :to="to" link="order" kind="crumbs-grey">{{ article.title }}
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
 column-gap: 15px;
 row-gap: 6px;
 align-items: center;
flex-wrap: wrap;
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

@media(max-width: 992px){
  .crumbs_menu {
margin-bottom: 24px;
}
}
</style>
