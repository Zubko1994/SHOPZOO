<!-- @format -->

@format

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import DropdownList from '../components/DropdownList.vue'
import Checkbox from '../components/Checkbox.vue'
import FilterAniml from '../components/FilterAniml.vue'
import BrendsNamesFiltersAll from '../components/BrendsNamesFiltersAll.vue'
import Button from './Button.vue'
import Text from './Text.vue'
import Card from './Card.vue'
import CardsAnimal from '../components/CardsAnimal.vue'
import MenuCrumbs from '../components/MenuCrumbs.vue'
import FilterTypeGoods from '../components/FilterTypeGoods.vue'
import FiltersButton from '../components/FiltersButton.vue'
import { inject } from 'vue';

const sortOrder = ref('date_create')
const currentPage = ref(1)
const totalPages = ref(0)
const isLoading = ref(false)

const pageUrls = [
  `https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create`,
  'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create&page=2',
  'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create&page=3',
  'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create&page=4',
  'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create&page=5',
  'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create&page=6',
  'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create&page=7',
]

// Обработчик изменения сортировки
const handleSortChange = (newSort: string) => {
  sortOrder.value = newSort
  pageNumber.value = 0
}

const selectedAnimalId = ref<number | null>(null)

function handleAnimalSelect(id: number) {
  selectedAnimalId.value = id
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

const dataCards = ref<CardsObj[] | null>(null)
const error = ref<string | null>(null)

const allCards = computed(() => {
  return dataCards.value?.flatMap((page) => page.results) || []
})

const searchBrandQuery = ref('')

onMounted(() => {
  Promise.all(
    pageUrls.map((url) =>
      fetch(url)
        .then((res) => res.json())
        .catch((e) => {
          error.value = `Ошибка загрузки: ${e.message}`
          return { results: [] }
        })
    )
  )
    .then((pages) => {
      dataCards.value = pages
    })
    .catch((e) => {
      error.value = `Критическая ошибка: ${e.message}`
    })
})

const pageNumber = ref(0)

const props = withDefaults(
  defineProps<{
    size?: number
    count?: number
    id?: Number
    brand?: object
    category?: object
    sale?: object
    isFiltersOpen?: boolean
  }>(),
  {
    size: 15,
    count: 1,
  }
)

const pageCount = computed(() => {
  return Math.ceil(filteredCards.value.length / props.size)
})

const paginatedData = computed(() => {
  const start = pageNumber.value * props.size
  const end = start + props.size
  return filteredCards.value.slice(start, end)
})

const showNextPage = () => {
  if (pageNumber.value < pageCount.value - 1) {
    pageNumber.value++
  }
}

const showPrevPage = () => {
  if (pageNumber.value > 0) {
    pageNumber.value--
  }
}

const goToPage = (page: number) => {
  pageNumber.value = page
}

const selectedCategory = ref<number | null>(null)
const updateCategory = (categoryId: number | null) => {
  selectedAnimalId.value = categoryId
  choiceCategory.value = categoryId
}

const choiceCategory = ref<number | null>(null)
const upCategory = (animal: { id: number } | null) => {
  const categoryId = animal?.id || null
  selectedAnimalId.value = categoryId
  choiceCategory.value = categoryId
}

const choiceBrand = ref<number[]>([])
const upBrand = (brands: number[]) => {
  choiceBrand.value = brands
  pageNumber.value = 0
}

const selectedGoodsCategories = ref<number[] | null>(null)
function handleGoodsCategories(categories: number[] | null) {
  selectedGoodsCategories.value = categories
  pageNumber.value = 0
}

const categoryGoods = ref<number[] | null>(null)
const selectedTypeGoods = (category: number[] | null) => {
  categoryGoods.value = category
  pageNumber.value = 0
}

const selectedPromotion = ref(false)
const promotionProducts = () => {
  selectedPromotion.value = !selectedPromotion.value
  console.log(selectedPromotion.value)
}

const emit = defineEmits(['isActive'])
const isActiveWindowFilters = ref(false)

const showFilters = ref(false)


const filterButton = () => {
  console.log('клик по фильтру')
showFilters.value = !showFilters.value
isActiveWindowFilters.value = true
emit('isActive', isActiveWindowFilters.value)
}

const closeFilters = () => {
 showFilters.value = false
 isActiveWindowFilters.value = false;
  emit('isActive', isActiveWindowFilters.value);
}

const openFiltersWindow = ref(false)

const closeFiltersWindow = (openFilters: boolean)=>{
  openFiltersWindow.value = true;
  closeFilters()
}

const handleSearchBrand = (query: string) => {
  searchBrandQuery.value = query;
  pageNumber.value = 0; // Сбрасываем пагинацию при поиске
}

const hasResultBrand = ref(true)

function hasResult (hasResult: boolean) {
  hasResultBrand.value = hasResult
}

// const handleCrossClick = (openFilters: boolean) => {
//   if (!openFilters) {
//     closeFilters();
//   }
// }

const isFiltersOpen = ref(false);

const handleFiltersActive = (isActive: boolean) => {
  isFiltersOpen.value = isActive;
};

// Функция для обработки клика на крестик
const handleCrossClick = (isActive: boolean) => {
  isFiltersOpen.value = isActive;
};


const themeClass = computed(() => (showFilters.value ? 'filters-active' : 'filters'));

const filteredCards = computed(() => {
  let result = allCards.value

  // Применяем фильтры
  if (choiceCategory.value) {
    result = result.filter((card) =>
      card.animal.some((anim) => anim.id === choiceCategory.value)
    )
  } else if (selectedCategory.value) {
    result = result.filter((card) =>
      card.animal.some((anim) => anim.id === selectedCategory.value)
    )
  }

  if (choiceBrand.value.length > 0) {
    result = result.filter((card) => choiceBrand.value.includes(card.brand.id))
  } else if (searchBrandQuery.value) {
    // Если есть поисковый запрос, но нет выбранных брендов
    const query = searchBrandQuery.value.toLowerCase().trim();
    result = result.filter(card => 
      card.brand && card.brand.name.toLowerCase().includes(query)
    )
  }

  if (selectedGoodsCategories.value && selectedGoodsCategories.value.length) {
    result = result.filter((card) =>
      selectedGoodsCategories.value?.includes(card.category.id)
    )
  }

  if (selectedPromotion.value) {
    result = result.filter((card) => card.sale && card.sale.percent > 0)
  }

  if (sortOrder.value === 'price_asc') {
    result = result.slice().sort((a, b) => {
      const priceA = parseFloat(a.price.replace(',', '.').replace(/\s/g, ''))
      const priceB = parseFloat(b.price.replace(',', '.').replace(/\s/g, ''))
      return priceA - priceB
    })
  } else if (sortOrder.value === 'price_desc') {
    result = result.slice().sort((a, b) => {
      const priceA = parseFloat(a.price.replace(',', '.').replace(/\s/g, ''))
      const priceB = parseFloat(b.price.replace(',', '.').replace(/\s/g, ''))
      return priceB - priceA
    })
  } else if (sortOrder.value === 'popularity') {
    result = result.reverse()
  } else if (sortOrder.value === 'title_asc') {
    result = result.slice().sort((a, b) => a.title.localeCompare(b.title, 'ru'))
  } else if (sortOrder.value === 'title_desc') {
    result = result.slice().sort((a, b) => b.title.localeCompare(a.title, 'ru'))
  }

  return result
})

// Наблюдатели для сброса пагинации при изменении фильтров
watch(
  [choiceCategory, selectedCategory, choiceBrand, selectedGoodsCategories],
  () => {
    pageNumber.value = 0
  }
)

watch(choiceCategory, (newVal) => {
  if (newVal) selectedCategory.value = null
})

watch(selectedCategory, (newVal) => {
  if (newVal) choiceCategory.value = null
})

watch(sortOrder, () => {
  pageNumber.value = 0
})

watch(selectedPromotion, () => {
  pageNumber.value = 0
})

watch(() => props.isFiltersOpen, (newVal) => {
  if (newVal !== undefined) {
    showFilters.value = newVal;
    isActiveWindowFilters.value = newVal;
  }
});
</script>

<template>
  <div @click="isOpen = false">
    <MenuCrumbs class="crumbs-menu" />
    <CardsAnimal
      @updateCategory="updateCategory"
      :selectedId="selectedAnimalId"
      :selectedCategory="selectedAnimalId"
      @selectedTypeGoods="handleGoodsCategories"
    />
    <section class="catalog">
      <div class="container">
        <div class="catalog__wrapper">
          <div class="catalog__info">
            <div class="wrapper_title">
              <Text
                class="title"
                tag="h1"
                print="title_catalog"
                title="Каталог товаров"
              />
            </div>
            <div class="wrapper-sort">
              <span class="name-sort">Сортировать по:</span
              ><DropdownList
                @closeDropdownList="closeDropdownList"
                @sort-change="handleSortChange"
              />
            </div>
            <FiltersButton @customclick="filterButton" />
          </div>
          <div>
            <div class="wrapper__goods">
              <div :class="themeClass" class="filters wrapper-filter" @crossClick="handleCrossClick">
                <div class="goods__action">
                  <Checkbox @promotionProducts="promotionProducts" />
                </div>
                <div class="line-active"></div>
                <FilterAniml
                  v-if="selectedAnimalId == null"
                  @selectType="showType"
                  @upCategory="upCategory"
                  @selectAnimal="handleAnimalSelect"
                  :selectedCategory="selectedAnimalId"
                />
                <FilterAniml class="filter-amimal"
                  v-if="selectedAnimalId !== null"
                  @selectType="showType"
                  @upCategory="upCategory"
                  @selectAnimal="handleAnimalSelect"
                  :selectedCategory="selectedAnimalId"
                />
                <FilterTypeGoods
                  v-if="selectedAnimalId !== null"
                  @selectedTypeGoods="handleGoodsCategories"
                ></FilterTypeGoods>
                <div class="line-active"></div>
                <BrendsNamesFiltersAll @hasBrandResult="hasResult" @searchBrand="handleSearchBrand"  class="brends" @upBrand="upBrand" />
                <div class="wrapper-button">
                  <Button @click="closeFilters" class="show-goods" kind="primary" v-if="hasResultBrand"
                    >Применить фильтры</Button
                  >
                </div>
              </div>
              <div>
                <section>
                  <div class="cards-section">
                    <div class="wrapper-cards">
                      <Card
                        v-for="(card, index) in paginatedData"
                        :key="card.id"
                        :image_prev="card.image_prev"
                        :title="card.title"
                        :price="card.price"
                        :countitemproduct_set="card.countitemproduct_set"
                        :animal="card.animal"
                        :brand="card.brand"
                        :category="card.category"
                        :sale="card.sale"
                        :id="id"
                        @updateCategory="updateCategory"
                        @upCategory="upCategory"
                        @upBrand="upBrand"
                        @selectedTypeGoods="selectedTypeGoods"
                        @promotionProducts="promotionProducts"
                      />
                    </div>
                    <div class="slider-wrapper">
                      <div
                        class="indicator-left"
                        :class="{ disabled: pageNumber === 0 }"
                        @click="showPrevPage"
                      >
                        <img
                          class="strela"
                          src="../assets/svg/highlightPointer.svg"
                          alt="указатель влево"
                        />
                        <Button class="navigation" kind="slider"
                          >Предыдущая</Button
                        >
                        <Button
                          class="navigation-hidden"
                          kind="slider"
                        ></Button>
                      </div>
                      <ul class="indicator-number">
                        <li
                          v-for="page in pageCount"
                          :key="page"
                          class="slider-number"
                          :class="{ active: pageNumber === page - 1 }"
                          @click="goToPage(page - 1)"
                        >
                          {{ page }}
                        </li>
                      </ul>
                      <div
                        class="indicator-right"
                        :class="{ disabled: pageNumber === pageCount - 1 }"
                        @click="showNextPage"
                      >
                        <Button class="navigation" kind="slider"
                          >Следующая</Button
                        >
                        <Button
                          class="navigation-hidden"
                          kind="slider"
                        ></Button>
                        <img
                          class="strela"
                          src="../assets/svg/highlightPointerRight.svg"
                          alt="указатель вправо"
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>

// * {
//   box-sizing: border-box;
// }

.filter-amimal {
  display: none;
}

.show-goods {
  display: none;
}
.catalog__wrapper {
  background-color: var(--bg-default);
}
.line-active {
  border-top: 1px solid rgba(140, 145, 150, 1);
  width: 340px;
  margin: 0 auto;
  display: none;
}

.navigation-hidden {
  display: none;
}

.slider-number {
  color: var(--highlight);
  font-family: 'SFProText';
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: center;
  border: none;
  background: none;
  &:hover {
    color: var(--text-gray);
  }
}
.catalog {
  background-color: var(--bg-default);
  padding: 0px 5px 56px 5px;
}

.catalog__info {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.name-sort {
  color: var(--text-default);
  font-family: 'SFProText';
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: right;
  display: block;
}

.wrapper-sort {
  display: flex;
  gap: 9px;
  align-items: center;
}

.goods__action {
  padding: 18px 16px;
  background-color: var(--white);
  border-radius: 5px;
  max-width: 270px;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.filters-active {
  display: block;
  justify-content: center;
}

.wrapper__goods {
  display: flex;
  gap: 30px;
  justify-content: space-between;
  align-items: start;
}

.wrapper-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 колонки по умолчанию */
  gap: 30px;
  margin-bottom: 24px;
  width: 100%;
  min-height: 2120px;
}

.cards-section {
  min-height: 500px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.indicator-left {
  display: flex;
  gap: 8px;
  align-items: baseline;
  text-wrap: nowrap;
  padding-left: 5px;
  cursor: pointer;
}

.strela {
  display: block;
}

.indicator-number {
  display: flex;
  gap: 32px;
  cursor: pointer;
}

.indicator-right {
  display: flex;
  gap: 8px;
  align-items: baseline;
  text-wrap: nowrap;
  padding-right: 5px;
  cursor: pointer;
}

.slider-wrapper {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: baseline;
}

.slider-number.active {
  color: #6d7175;
  font-weight: bold;
}

.indicator-left.disabled,
.indicator-right.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 1200px) {
  .wrapper-cards {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .crumbs-menu {
    display: block;
    position: relative;
    z-index: 100;
    // top: 40px;
  }

  .wrapper__goods {
    gap: 15px;
    // justify-content: space-between;
  }
}

@media (max-width: 1124px) {
  .wrapper-cards {
    gap: 15px;
  }
}

@media (max-width: 1196px) {
  .wrapper-cards {
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    justify-items: center;
    width: 100%;
  }
}

@media (max-width: 1116px) {
  .wrapper-cards {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
  }
}

@media (max-width: 1103px) {
  .wrapper-cards {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    justify-content: flex-start;
    width: 100%;
  }

  .wrapper__goods {
    gap: 50px;
    justify-self: start;
  }
}

@media (max-width: 992px) {
  .container {
    max-width: 992px;
  }

  .goods__action {
    padding: 10px;
    width: 100%;
  }

  .wrapper__goods {
    gap: 10px;
    justify-content: center;
  }

  .crumbs-menu {
    top: 40px;
  }

  .navigation {
    display: none;
  }

  .navigation-hidden {
    display: none;
  }

  .wrapper-cards {
    grid-template-columns: repeat(2, 1fr); /* 2 колонки на планшетах */
    gap: 20px;
    justify-content: center; /* Центрируем содержимое */
  }

  .filters {
    // order: 2;
    margin-top: 10px;
  }
}

@media (max-width: 873px) {
  .wrapper-cards {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .wrapper__goods {
    gap: 10px;
  }
}

@media (max-width: 831px) {
  .wrapper-cards {
    grid-template-columns: repeat(1, 1fr);
    gap: 15px;
  }

  .catalog__info {
    flex-direction: column;
    align-items: start;
    width: 500px;
  }

  .catalog__info {
    width: 100%;
  }

  .wrapper__goods {
    gap: 40px;
  }
}

@media (max-width: 576px) {

  .filter-amimal {
  display: block;
}


  .filters {
  display: none;
}

  .show-goods {
  display: block;
  margin: 0 auto;
  width: 300px;
}
  .goods__action {
    min-width: 340px;
    align-items: center;
    margin: 0 auto;
  }

  .wrapper-sort {
    flex-direction: column;
    align-content: center;
  }

  .line-active {
    display: block;
    z-index: 200;
    margin-top: 2px;
    margin-bottom: 2px;
  }

  .filters-active {
    display: block;
    width: 100vw; // Изменяем с 100vh на 100vw
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0; // Добавляем для растягивания слева
    z-index: 2600;
    top: 40px;
    background-color: var(--white);
    margin: 0; // Убираем центрирование
    max-width: none; 
    min-width: none;
    overflow-y: visible;
    overflow-x: hidden;
    padding: 20px;
  }

  .wrapper__goods {
    flex-direction: column;
    align-items: baseline;
    align-items: center;
    justify-content: baseline;
  }

  .catalog__info {
    flex-direction: column;
    gap: 10px;
    width: 100%;
    width: 80%;
    align-items: baseline;
    align-items: center;
    justify-content: baseline;
    background-color: var(--bg-default);
    max-width: none;
    min-width: none;
  }

  .catalog__info {
    flex-direction: column;
    gap: 10px;
    width: 100%;
    align-items: center; // оставляем центрирование
    justify-content: baseline;
  }

  .catalog__info :first-child {
    align-self: stretch;
    text-align: left;
  }

  .catalog__info {
    margin-bottom: 24px;
    align-content: center;
    align-self: center;
  }
  .wrapper-cards {
    grid-template-columns: 1fr;
    gap: 15px;
    justify-items: center;
  }

  .wrapper-cards > * {
    width: 100%;
    max-width: 340px;
  }

  .slider-wrapper {
    align-items: center;
    gap: 10px;
    align-items: baseline;
  }
  .wrapper-filter {
    width: 100%; // Занимает всю доступную ширину
    max-width: 340px; // Ограничиваем максимальную ширину
    margin: 0 auto; // Центрируем
    text-align: center;
    // padding-bottom: 80px;
    width: calc(100% - 40px);

    // background-color: var(--white);
  }

  .goods__action {
    // min-width: unset; // Убираем фиксированную ширину
    width: 100%; // Занимает всю ширину родителя
  }

  .wrapper__goods {
    align-items: center;
    margin: 0 auto;
    width: 100vw;
    // Центрируем дочерние элементы
  }

  .name-sort {
    align-self: flex-start;
  }

  .title {
    display: block;
    margin: 0 auto;
    max-width: 340px;
    text-align: left;
  }

  .show-goods {
    width: 320px;
    // margin-top: 5px;
    margin: 0 auto;
    text-align: center;
  }

  .wrapper-button {
    display: flex;
    justify-content: center;
    background: var(--white);
    // padding: 10px;
    padding-right: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    margin-top: auto;
    
  }

  .wrapper_title {
    align-self: start;
  }

  // .wrapper__goods {
  //   background-color: var(--white);
  // }

  .cards-section {
    background-color: var(--bg-default);
  }

  .wrapper-filter {
    width: 100%; // Растягиваем на всю ширину
    max-width: none; // Убираем ограничение
    margin: 0; // Убираем отступы
  }

  .goods__action {
    width: 100%; // Растягиваем на всю ширину
    max-width: none; // Убираем ограничение
    border-radius: 0; // Убираем скругление углов для полноэкранного вида
  }

  .show-goods {
    width: 340px;
    justify-self: center; 
  }

  // Дополнительно убедимся, что все внутренние элементы растягиваются правильно
  .line-active {
    width: 100%; // Линия на всю ширину
  }


}

@media (max-width: 360px) {
  .title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .catalog__info {
    align-content: flex-start;
    align-items: start;
    justify-self: start;
    justify-content: flex-start;
  }

  .wrapper_title {
    align-self: start;
  }
}
</style>
