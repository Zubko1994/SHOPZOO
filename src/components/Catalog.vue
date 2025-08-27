@format

<script setup lang="ts">
// import { ref, computed, watch, onMounted } from 'vue'
// import DropdownList from '../components/DropdownList.vue'
// import Checkbox from '../components/Checkbox.vue'
// import FilterAniml from '../components/FilterAniml.vue'
// import BrendsNamesFiltersAll from '../components/BrendsNamesFiltersAll.vue'
// import Button from './Button.vue'
// import Text from './Text.vue'
// import Card from './Card.vue'
// import CardsAnimal from '../components/CardsAnimal.vue'
// import MenuCrumbs from '../components/MenuCrumbs.vue'
// import FilterTypeGoods from '../components/FilterTypeGoods.vue'





// const sortOrder = ref('price_asc')
// const currentPage = ref(1)
// const totalPages = ref(0)
// const isLoading = ref(false)

// // Обработчик изменения сортировки
// const handleSortChange = (newSort: string) => {
//   sortOrder.value = newSort
//   pageNumber.value = 0


// }

// // // Функция загрузки продуктов с сервера
// // const loadProducts = async () => {
// //   isLoading.value = true
// //   try {
// //     const params = new URLSearchParams()
// //     params.append('order', sortOrder.value)
// //     params.append('page', currentPage.value.toString())
    
// //     // Добавьте другие параметры фильтрации
// //     if (selectedAnimalId.value) {
// //       params.append('animal', selectedAnimalId.value.toString())
// //     }
// //     if (choiceBrand.value.length > 0) {
// //       params.append('brands', choiceBrand.value.join(','))
// //     }
// //     if (selectedGoodsCategories.value) {
// //       params.append('categories', selectedGoodsCategories.value.join(','))
// //     }
    
// //     const response = await fetch(`https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=price_desc`)
// //     const data = await response.json()
    
// //     dataCards.value = data.results
// //     console.log(dataCards)
// //     totalPages.value = Math.ceil(data.count / props.size)
// //   } catch (e) {
// //     error.value = `Ошибка загрузки: ${e.message}`
// //   } finally {
// //     isLoading.value = false
// //   }
// // }

// // Загрузите данные при монтировании
// // onMounted(loadProducts)



// const selectedAnimalId = ref<number | null>(null);


// function handleAnimalSelect(id: number) {
//   selectedAnimalId.value = id;
// }

// interface Cards {
//   id: number
//   image_prev: string
//   title: string
//   price: string
//   countitemproduct_set: string[]
//   animal: { id: number; title: string }[]
//   brand:  {id: number; name: string; image: string}
//   category: { id: number; name: string; parent: number}

// }

// interface CardsObj {
//   count: number
//   next: string | null
//   previous: string | null
//   results: Cards[]
  
// }

const pageUrls = [
  `https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create`,
  'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create&page=2',
  'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create&page=3',
  'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create&page=4',
  'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create&page=5',
  'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create&page=6',
  'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=date_create&page=7'
];

// const dataCards = ref<CardsObj[] | null>(null)

// interface CardsObj {
//   results: Cards[]
// }

// const error = ref<string | null>(null);


// const allCards = computed(() => {
//   return dataCards.value?.flatMap(page => page.results) || [];
// });
// console.log(allCards)

// Promise.all(pageUrls.map(url => 
//   fetch(url)
//     .then(res => res.json())
//     .catch(e => { 
//       error.value = `Ошибка загрузки: ${e.message}`;
//       return { results: [] }; 
//     })
// ))
// .then(pages => {
//   dataCards.value = pages;
// })
// .catch(e => {
//   error.value = `Критическая ошибка: ${e.message}`;
// });

// console.log(allCards)

// const pageNumber = ref(0);

//   const props = withDefaults(defineProps<{
//     size?: number,
//     count?: number,
//     id?: Number
//     brand?: object
//     category?: object
    
// }>(), {
//     size: 15,
//     count: 1
// });



// const pageCount = computed(() => {
//     return Math.ceil(filteredCards.value.length / props.size);
// });


// const paginatedData = computed(() => {
//   const start = pageNumber.value * props.size;
//   const end = start + props.size;
//   return filteredCards.value.slice(start, end);
// });
// console.log(paginatedData)


// const showNextPage = () => {
//   if (currentPage.value < totalPages.value) {
//     currentPage.value++
    
//   }
// }

// const showPrevPage = () => {
//   if (currentPage.value > 1) {
//     currentPage.value--
    
//   }
// }

// const goToPage = (page: number) => {
//   currentPage.value = page
  
// }

// // const showPrevPage = () => {
// //     if (pageNumber.value > 0) pageNumber.value--;
// // };

// // const showNextPage = () => {
// //     if (pageNumber.value < pageCount.value - 1) pageNumber.value++;
// // };


// // const goToPage = (page: number) => {
// //     pageNumber.value = page;
// // };



// const selectedCategory = ref<number | null>(null)
//   const updateCategory = (categoryId: number | null) => {
//   selectedAnimalId.value = categoryId
//   choiceCategory.value = categoryId // синхронизируем с фильтром
// }

// const choiceCategory = ref<number | null>(null)
// const upCategory = (animal: { id: number } | null) => {
//   const categoryId = animal?.id || null
//   selectedAnimalId.value = categoryId
//   choiceCategory.value = categoryId // синхронизируем с фильтром
// }


// const choiceBrand = ref<number[]>([])

// const upBrand = (brands: number[])    => {
//   choiceBrand.value = brands
//   pageNumber.value = 0;
//   // console.log("Brand filter:", id);
// }


// const selectedGoodsCategories = ref<number[] | null>(null);


// function handleGoodsCategories(categories: number[] | null) {
//   console.log("Received categories:", categories); // Добавьте лог
//   selectedGoodsCategories.value = categories;
//   pageNumber.value = 0; // Сбрасываем пагинацию
// }

// console.log(selectedCategory)
// console.log(choiceCategory)
// console.log(choiceBrand)


// watch([choiceCategory, selectedCategory, choiceBrand, selectedGoodsCategories], () => {
//   pageNumber.value = 0;
// });


// watch(choiceCategory, (newVal) => {
//   if (newVal) selectedCategory.value = null;
// });


// watch(selectedCategory, (newVal) => {
//   if (newVal) choiceCategory.value = null;
// });

// // watch(selectedGoodsCategories, (newVal) => {
//   //   if (newVal) selectedGoodsCategories.value = null;
// // });

// console.log(selectedCategory.value)


// const categoryGoods = ref<number[] | null> (null)


// const selectedTypeGoods = (category: number[] | null) => {
//   categoryGoods.value = category
//   pageNumber.value = 0;
// }

// const filteredCards = computed(() => {
//   let result = allCards.value
//   console.log(result)
//   if (choiceCategory.value) {
//     selectedCategory.value = null
//     result = result.filter(card => 
//       card.animal.some(anim => anim.id === choiceCategory.value)
//     ) 
//   }
//    if (selectedCategory.value) {
//     choiceCategory.value = null
//     result = result.filter(card => 
//       card.animal.some(anim => anim.id === selectedCategory.value)
//   ) 
//   } 
//   if (choiceBrand.value.length > 0) {

//     result = result.filter(card => choiceBrand.value.includes(card.brand.id))
    
//   }
  
//   if (selectedGoodsCategories.value && selectedGoodsCategories.value.length) {
//     result = result.filter(card => selectedGoodsCategories.value?.includes(card.category.id))
    
//   }
//   if (sortOrder.value === 'price_asc') {
//     result = result.slice().sort((a, b) => {
//       const priceA = parseFloat(a.price.replace(',', '.'))
//       const priceB = parseFloat(b.price.replace(',', '.'))
//       return priceA - priceB
//     })
//   }
//   else if (sortOrder.value === 'price_desc') {
//     result = result.slice().sort((a, b) => {
//       const priceA = parseFloat(a.price.replace(',', '.'))
//       const priceB = parseFloat(b.price.replace(',', '.'))
//       return priceB - priceA
//     })
//   }
//    return result
// })
//     // {
//       //   // Проверяем прямое соответствие категории
//       //   if (selectedGoodsCategories.value!.includes(card.category.id)) {
//         //     return true;
//         //   }
        
//         // Проверяем соответствие родительской категории
//         // Убрали проверку на null, так как в данных товаров parent всегда число
//   //     if (selectedGoodsCategories.value!.includes(card.category.parent)) {
//   //       console.log(card.category.parent)
//   //       return true;
//   //     }
      
//   //     return false;
//   //   });
  
//   watch([selectedAnimalId, choiceBrand, selectedGoodsCategories], () => {
//     currentPage.value = 1

//   })


//   // // console.log(selectedGoodsCategories.value)
//   //  return result 



// watch(paginatedData, (cards) => {
//   if (cards.length > 0) {
//     console.log('Бренды первой карточки:', cards[0].brand);
//     console.log('ID выбранного бренда:', choiceBrand.value);
//     console.log('Id категории товара', categoryGoods.value)
//   }
// }, { immediate: true, deep: true });

// // Временно добавьте эту функцию для тестирования
// const testSorting = async () => {
//   const options = ['price_asc', 'price_desc', 'title_asc', 'title_desc', 'date_create', 'popularity'];
//   console.log(options)
//   const page = [2,3,4,5,6,7]
  
//   for (const option of options) {
//     try {
//       const response = await fetch(`https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=${option}&page=2, https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=${option}&page=3, https://oliver1ck.pythonanywhere.com/api/get_products_filter/?order=${option}&page=4`, 
//     );
//     console.log(response)
//       const data = await response.json();
//       console.log(`Sorting by ${option}:`, data.results.slice(0, 20)); // Первые 3 элемента
//     } catch (error) {
//       console.error(`Failed with ${option}:`, error);
//     }
//   }
// };

// // Вызовите эту функцию при монтировании компонента
// onMounted(() => {
//   testSorting();
// });
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

const sortOrder = ref('date_create')
const currentPage = ref(1)
const totalPages = ref(0)
const isLoading = ref(false)

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
}

interface CardsObj {
  count: number
  next: string | null
  previous: string | null
  results: Cards[]
}

// Загружаем данные без сортировки на сервере
// const pageUrls = [
//   'https://oliver1ck.pythonanywhere.com/api/get_products_filter/',
//   'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?page=2',
//   'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?page=3',
//   'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?page=4',
//   'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?page=5',
//   'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?page=6',
//   'https://oliver1ck.pythonanywhere.com/api/get_products_filter/?page=7'
// ]

const dataCards = ref<CardsObj[] | null>(null)
const error = ref<string | null>(null)

const allCards = computed(() => {
  return dataCards.value?.flatMap(page => page.results) || []
})

// Загружаем данные при монтировании
onMounted(() => {
  Promise.all(pageUrls.map(url => 
    fetch(url)
      .then(res => res.json())
      .catch(e => { 
        error.value = `Ошибка загрузки: ${e.message}`
        return { results: [] }
      })
  ))
  .then(pages => {
    dataCards.value = pages
  })
  .catch(e => {
    error.value = `Критическая ошибка: ${e.message}`
  })
})

const pageNumber = ref(0)

const props = withDefaults(defineProps<{
  size?: number,
  count?: number,
  id?: Number
  brand?: object
  category?: object
}>(), {
  size: 15,
  count: 1
})

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


// Основная функция фильтрации и сортировки
const filteredCards = computed(() => {
  let result = allCards.value
  
  // Применяем фильтры
  if (choiceCategory.value) {
    result = result.filter(card => 
      card.animal.some(anim => anim.id === choiceCategory.value)
    ) 
  }
  else if (selectedCategory.value) {
    result = result.filter(card => 
      card.animal.some(anim => anim.id === selectedCategory.value)
    ) 
  } 
  
  if (choiceBrand.value.length > 0) {
    result = result.filter(card => choiceBrand.value.includes(card.brand.id))
  }
  
  if (selectedGoodsCategories.value && selectedGoodsCategories.value.length) {
    result = result.filter(card => 
      selectedGoodsCategories.value?.includes(card.category.id)
    )
  }
  
  // Применяем сортировку
  if (sortOrder.value === 'price_asc') {
    result = result.slice().sort((a, b) => {
      const priceA = parseFloat(a.price.replace(',', '.').replace(/\s/g, ''));
      const priceB = parseFloat(b.price.replace(',', '.').replace(/\s/g, ''));
      return priceA - priceB;
    });
  }
  else if (sortOrder.value === 'price_desc') {
    result = result.slice().sort((a, b) => {
      const priceA = parseFloat(a.price.replace(',', '.').replace(/\s/g, ''));
      const priceB = parseFloat(b.price.replace(',', '.').replace(/\s/g, ''));
      return priceB - priceA;
    });
  }
  else if(sortOrder.value === 'popularity'){
    result = result.reverse()
  }
  
  return result
})

// Наблюдатели для сброса пагинации при изменении фильтров
watch([choiceCategory, selectedCategory, choiceBrand, selectedGoodsCategories], () => {
  pageNumber.value = 0
})

watch(choiceCategory, (newVal) => {
  if (newVal) selectedCategory.value = null
})

watch(selectedCategory, (newVal) => {
  if (newVal) choiceCategory.value = null
})
// Добавляем наблюдатель для сортировки
watch(sortOrder, () => {
  pageNumber.value = 0
})
</script>

<template>
  <MenuCrumbs/>
  <CardsAnimal @updateCategory="updateCategory" :selectedId="selectedAnimalId" :selectedCategory="selectedAnimalId" @selectedTypeGoods="handleGoodsCategories" />
  <section class="catalog">
    <div class="container">
      <div class="catalog__wrapper">
        <div class="catalog__info">
          <Text tag="h1" print="title_catalog" title="Каталог товаров" />
          <div class="wrapper-sort">
            <span class="name-sort">Сортировать по:</span><DropdownList @sort-change="handleSortChange" />
          </div>
        </div>
        <div class="wrapper__goods">
          <div class="filters">
            <div class="goods__action">
              <Checkbox />
            </div>
            <FilterAniml v-if="selectedAnimalId == null" @selectType="showType" @upCategory="upCategory" @selectAnimal="handleAnimalSelect" :selectedCategory="selectedAnimalId" />
            <FilterTypeGoods  v-if="selectedAnimalId !== null"  @selectedTypeGoods="handleGoodsCategories"></FilterTypeGoods>
            <BrendsNamesFiltersAll @upBrand="upBrand" />
          </div>
          <div>
            <div class="cards-section">
            <div class="wrapper-cards">
              <Card
                v-for="(card, index) in paginatedData"
                :key="sortOrder"
                :image_prev="card.image_prev"
                :title="card.title"
                :price="card.price"
                :countitemproduct_set="card.countitemproduct_set" 
                :animal="card.animal"
                :brand="card.brand"
                :category="card.category"
                :id="id"
                @updateCategory="updateCategory"
                @upCategory="upCategory"
                @upBrand="upBrand"
                @selectedTypeGoods="selectedTypeGoods"
              />
              
            </div>
            <div class="slider-wrapper">
    <div class="indicator-left" :class="{ disabled: pageNumber === 0 }"
    @click="showPrevPage">
  <img class="strela" src="../assets/svg/highlightPointer.svg" alt="указатель влево">
    <Button kind="slider">Предыдущая</Button>
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
    <div class="indicator-right" :class="{ disabled: pageNumber === pageCount - 1 }"
    @click="showNextPage">
      <Button kind="slider">Следующая</Button>
      <img class="strela" src="../assets/svg/highlightPointerRight.svg" alt="указатель вправо">
</div>
</div>
</div>
          </div>
        </div>
      </div>
    </div>
    
  </section>
</template>

<style lang="scss" scoped>

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

.wrapper__goods {
  display: flex;
  gap: 30px;
  justify-content: space-between;
}

.wrapper-cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
  flex-wrap: wrap;
  margin-bottom: 24px;
  justify-content: space-between;
  overflow: hidden;
  transform: translateX(0);
  // height: 1980px;
  // align-items: start;
}

.cards-section {
  height: 2100px;
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
  display: block ;
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
  color: #6D7175;
  font-weight: bold;
}

.indicator-left.disabled,
.indicator-right.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>


