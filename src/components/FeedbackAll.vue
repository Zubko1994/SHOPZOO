<script setup lang="ts">
import Feedback from './Feedback.vue'
import Text from './Text.vue'
import Button from './Button.vue'

const dataFeedback = [
    {
        id: 1,
        user: "Меженная Марина Мельников Руслан",
        text: "Мы являемся хозяевами замечательного голден ретривера по кличке Умка. Своего пса мы очень любим, хотим видеть его красивым и здоровым, а потому к выбору корма подошли ответственно: прочитали соответствующую литературу, изучили составы различных кормов, проконсультировались у заводчиков. В результате свой выбор остановили на Акане: это сбалансированный корм с высоким содержанием протеинов, но без «разбухающих» зерновых культур. Сейчас Умке два с половиной года и в течение последних полутора лет мы кормим его «Acana Grasslands» с лососем и ягненком. Да, корм недешевый, но мы ни разу не пожалели о своем выборе: Умка в отличной форме, а главное – он получает все необходимые питательные вещества и микроэлементы в нужном количестве. Аллергических реакций на корм замечено не было. Вобщем, кормом мы довольны!",
        phone_number: "+375 44 672 23 43",
        pet: "собака умка",
    },

    {
      id: 2,
        user: "Галина Багинская",
        text: "Делаю заказ на доставку домой, всегда менеджер перезванивает, подбирают удобное время, могут привезти и в 11 вечера, если нужно. Заказываю уже года полтора, никогда не было вопросов по состоянию товара или качеству. Рекомендую",
        phone_number: "+375 33 672 21 40",
        pet: "кот Рыжик",
    },

    {
      id: 3,
        user: "Андрей Николаев",
        text: "Заказывал грунт для аквариумов в несколько подходов. Ночью стоимость ниже. В первой половине дня приходит уведомление о готовности заказа. Магазину желаю успеха и процветания.",
        phone_number: "+375 44 458 23 55",
        pet: "рыбки",
    },

    {
      id: 4,
        user: "Татьяна Войтехович",
        text: "Отличный интернет магазин, которым постоянно пользуюсь. Большой выбор сухих и влажных кормов, витаминов и ярих игрушек и много других необходимых товаров для моих любих питомцев, ведущих производителей. Сервисное обслуживание!",
        phone_number: "+375 44 149 15 77",
        pet: "собака Грей",
    },

]


</script>

<template>
  <section class="feedback">
    <div class="feedback_wrapper">
      <div class="container">
        <Text class="title" tag="h2" print="title" title="Отзывы о магазине" />
        <div class="reviews">
          <Feedback v-for="feedback in dataFeedback" :key="feedback.id" :user="feedback.user" :text="feedback.text" :phone_number="feedback.phone_number" :pet="feedback.pet" />
        </div>
        <div class="wrapper_button">
      <Button class="button-strela" kind="indicator-left"
              ><img
                class="strela"
                src="../assets/image/Primaryfillleft.svg"
                alt="стрелка влево"
            /></Button>
            <Text tag="p" print="indicator" title="1 из 9" />
            <Button class="button-strela" kind="indicator-right"
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

  .feedback_wrapper {
    padding: 24px 5px 16px 5px;
  }

  .reviews {
    display: flex;
    flex-direction: column;
    gap: 10px;
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


@media (max-width: 992px) {

.container {
    max-width: 992px;
}

.feedback_wrapper {
    padding: 16px 10px 24px 10px;
  }

  .title {
    margin-bottom: 12px;
  }

}

</style>
