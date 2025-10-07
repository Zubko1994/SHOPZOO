<!-- @format -->

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'


const route = useRoute()
const card = ref({
  id: 0,
  title: '',
  description: '',
  guaranteed_analysis: '',
  image_prev: '',
  key_features: '', 
  nutritional_supplements: '',
  price: '',

})


const props = defineProps<{
link: string
to: string
title: string
}>()

import Link from './Link.vue'


// Функция для загрузки данных
const loadProductData = () => {
  const storedProduct = localStorage.getItem('currentProduct')
  if (storedProduct) {
    try {
      card.value = JSON.parse(storedProduct)
      console.log('Breadcrumbs: Product data loaded', card.value.title)
    } catch (error) {
      console.error('Breadcrumbs: Error parsing product data', error)
    }
  } else {
    console.warn('Breadcrumbs: No product data found in localStorage')
  }
}

// Обработчик кастомных событий
const handleProductUpdate = (event: CustomEvent) => {
  console.log('Breadcrumbs: Product update event received')
  loadProductData()
}

// Обработчик стандартных событий storage (для межвкладочного взаимодействия)
const handleStorageChange = (event: StorageEvent) => {
  if (event.key === 'currentProduct') {
    console.log('Breadcrumbs: Storage changed in another tab')
    loadProductData()
  }
}

// Наблюдатель с интервалом (альтернативный вариант)
let storageWatchInterval: number | null = null
const lastProductData = ref('')

const startStorageWatcher = () => {
  storageWatchInterval = window.setInterval(() => {
    const currentData = localStorage.getItem('currentProduct') || ''
    if (currentData !== lastProductData.value) {
      console.log('Breadcrumbs: Product data changed in localStorage')
      lastProductData.value = currentData
      loadProductData()
    }
  }, 1000) // Проверяем каждую секунду
}

const stopStorageWatcher = () => {
  if (storageWatchInterval) {
    clearInterval(storageWatchInterval)
    storageWatchInterval = null
  }
}

onMounted(() => {
  // Загружаем данные при монтировании
  loadProductData()
  
  // Способ 1: Слушаем кастомные события
  window.addEventListener('productUpdated', handleProductUpdate as EventListener)
  
  // Способ 2: Слушаем стандартные события storage
  window.addEventListener('storage', handleStorageChange)
  
  // Способ 3: Запускаем наблюдатель с интервалом (раскомментируйте если нужно)
  // startStorageWatcher()
})

onUnmounted(() => {
  // Очищаем слушатели событий
  window.removeEventListener('productUpdated', handleProductUpdate as EventListener)
  window.removeEventListener('storage', handleStorageChange)
  
  // Останавливаем наблюдатель с интервалом
  stopStorageWatcher()
})

// Вычисляемое свойство для безопасного отображения заголовка
const breadcrumbTitle = computed(() => {
  return card.value.title || 'Название товара'
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
        <Link class="link-item" :is-link="true" :to="to" link="catalog" kind="crumbs-black" >
        Каталог
        </Link>
        <div class="wrapper-arrow">
          <img class="arrow" src="../assets/svg/PrimaryFill.svg" />
        </div>
        <Link class="link-item" :is-link="false" :to="to" link="order" kind="crumbs-grey">{{ breadcrumbTitle }}
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
