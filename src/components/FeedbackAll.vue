<script setup lang="ts">
import Feedback from './Feedback.vue'
import Text from './Text.vue'
import Button from './Button.vue'
import { ref } from 'vue'
import { reactive } from 'vue'


// interface CardsObj {
//   id: number
//   user: string
//   text: string
//   phone_number: string
//   pet: string
// } 



let dataFeedback = [
    {
        id: "1",
        user: "Меженная Марина Мельников Руслан",
        text: "Мы являемся хозяевами замечательного голден ретривера по кличке Умка. Своего пса мы очень любим, хотим видеть его красивым и здоровым, а потому к выбору корма подошли ответственно: прочитали соответствующую литературу, изучили составы различных кормов, проконсультировались у заводчиков. В результате свой выбор остановили на Акане. Кормом мы довольны!",
        phone_number: "+375 44 672 23 43",
        pet: "собака умка",
    },

    {
      id: "2",
        user: "Галина Багинская",
        text: "Делаю заказ на доставку домой, всегда менеджер перезванивает, подбирают удобное время, могут привезти и в 11 вечера, если нужно. Заказываю уже года полтора, никогда не было вопросов по состоянию товара или качеству. Рекомендую",
        phone_number: "+375 33 672 21 40",
        pet: "кот Рыжик",
    },

    {
      id: "3",
        user: "Андрей Николаев",
        text: "Заказывал грунт для аквариумов в несколько подходов. Ночью стоимость ниже. В первой половине дня приходит уведомление о готовности заказа. Магазину желаю успеха и процветания.",
        phone_number: "+375 44 458 23 55",
        pet: "рыбки",
    },

    {
      id: "4",
        user: "Татьяна Войтехович",
        text: "Отличный интернет магазин, которым постоянно пользуюсь. Большой выбор сухих и влажных кормов, витаминов и ярих игрушек и много других необходимых товаров для моих любих питомцев, ведущих производителей. Сервисное обслуживание!",
        phone_number: "+375 44 149 15 77",
        pet: "собака Грей",
    },
]


const reactArray = reactive(dataFeedback)
console.log(reactArray)

const currentSliderIndex = ref(1); 


const nextSlide = () => { 
  if(currentSliderIndex.value < 4){
    currentSliderIndex.value = currentSliderIndex.value + 1; 
  } else {
    currentSliderIndex.value = 1;
  }
    reactArray.push(reactArray.shift())
    console.log(dataFeedback)

}; 

const prevSlide = () => { 
  if(currentSliderIndex.value > 1){
    currentSliderIndex.value = currentSliderIndex.value - 1;
  } else {
    currentSliderIndex.value = 4;
  }
    reactArray.unshift(reactArray.pop())
}; 


</script>

<template>
  <section class="feedback">
    <div class="feedback_wrapper">
      <div class="container">
      
        <Text class="title" tag="h2" print="title" title="Отзывы о магазине" />
        <div class="reviews">
          <Feedback class="review" v-for="feedback in reactArray" :key="feedback.id" :user="feedback.user" :text="feedback.text" :phone_number="feedback.phone_number" :pet="feedback.pet" />
        </div>
        <div class="wrapper_button">
      <Button @click = "prevSlide" class="button-strela" kind="indicator-left"
              ><img
                class="strela"
                src="../assets/image/Primaryfillleft.svg"
                alt="стрелка влево"
            /></Button>
            <Text tag="p" print="indicator">{{ currentSliderIndex }} из 4</Text>
            <Button @click="nextSlide" class="button-strela" kind="indicator-right"
              ><img
                class="strela"
                src="../assets/image/Primaryfill.svg"
                alt="стрелка вправо"
            /></Button>
      </div>
      </div>
    </div>
  </section>


</template>

<style lang="scss" scoped>



.title {
  text-align: center;
  margin-bottom: 24px;
}

.feedback {
  margin: 0 auto;
}

  .feedback_wrapper {
    padding: 24px 5px 16px 5px;
  }


  .reviews {
    display: flex;
    flex-direction: row;
    transform: translateX(30%);
    justify-content: space-between;
    text-wrap: wrap;
    overflow: hidden;
    max-width: 718px;
    align-items: center;
    gap: 1000px;
  }
  
  
 

  .wrapper_button {
  margin: 0 auto;
  display: flex;
  gap: 10px;
  max-width: 221px;
  align-items: center;
  justify-content: center;
}

.button-strela {
  background-color: var(--bg-default);
  &:hover{
    .strela {
  filter: brightness(0) invert(1);
}
  }
}

@media (max-width: 1080px) {

.container {
    max-width: 1080px;
}


.reviews {
    transform: translateX(25%);
  }

}


@media (max-width: 992px) {

.container {
    max-width: 992px;
}

.feedback_wrapper {
    padding: 16px 10px 24px 10px;
  }

  .title {
    margin-bottom: 12px;
    text-align: center;
  }

  .reviews {
    transform: translateX(25%);
  }
}

@media (max-width: 826px) {

.container {
    max-width: 826px;
}


.reviews {
    transform: translateX(15%);
  }

}

@media (max-width: 650px) {
.container {
    max-width: 650px;
}
.reviews {
    transform: translateX(10%);
  }
}

@media (max-width: 500px) {
.container {
    max-width: 500px;
}
.reviews {
    transform: translateX(0%);
  }
}


</style>
