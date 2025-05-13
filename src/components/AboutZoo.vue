<!-- @format -->

<script setup lang="ts">
import Text from './Text.vue'
</script>

<template>
  <section class="information">
    <div class="information_wrapper">
      <div class="container">
        <div class="advantages">
          <div class="advantages_left">
            <Text
              class="title"
              tag="h2"
              print="title"
              title="Здравствуйте, счастливый хозяин любимого питомца!"
            />
            <Text
              class="subtitle"
              tag="p"
              print="advanteges-description"
              title="Меня зовут Ирина, 2 года назад моя бесконечная любовь к животным трансформировалась в магазин «Территория ZOO». 
Место, главная цель которого —  забота о полноценной жизни питомцев, здоровой, долгой, радостной и гармоничной. Наш долг — создавать лучшее предложение для ваших домашних любимцев."
            />
            <div class="advantages_wrapper">
              <div class="advantages_block">
                <Text
                  tag="p"
                  print="advanteges-title"
                  title="За 7 минут соберем заказ"
                />
                <Text
                  tag="p"
                  print="advanteges-description"
                  title="Выбирайте товары на сайте, забирайте в удобное время в нашем магазине. Уже через 30 минут собранный и упакованный заказ будет ждать вас."
                />
              </div>
              <div class="advantages_block">
                <Text
                  tag="p"
                  print="advanteges-title"
                  title="Поможем с выбором товаров"
                />
                <Text
                  tag="p"
                  print="advanteges-description"
                  title="Задавайте вопросы профессионалам, получайте консультации по кормлению и содержанию питомца."
                />
              </div>
              <div class="advantages_block">
                <Text
                  tag="p"
                  print="advanteges-title"
                  title="Поставим товар на заказ!"
                />
                <Text
                  tag="p"
                  print="advanteges-description"
                  title="Мы работаем с лучшими поставщиками сертифитированного товара для животных. Если нужного Вам товара не будет в наличии мы в кратчайшие сроки договоримся о его поставке и сообщим Вам."
                />
              </div>
            </div>
          </div>
          <img src="../assets/image/Zooshop.png" alt="фото магазина" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.title {
  margin-bottom: 12px;
}

.subtitle {
  margin-bottom: 24px;
}

.advantages {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}

.advantages_block {
  padding-left: 13px;
  border-left: var(--border-highlight-subdued);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.advantages_wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
