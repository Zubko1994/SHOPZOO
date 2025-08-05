<script setup lang="ts">
import Text from './Text.vue';
import Button from './Button.vue';

</script>

<template>
  <section class="presentation">
    <div class="container">
      <div class="presentation-wrapper">
        <div class="presentation-info">
          <div class="advantages">
            <Text class="presentation_title" tag="h1" print="title" title="Всё, что нужно вашему питомцу в 9 мин от метро Малиновка" />
            <div class="presentation_subtitle">
              <div>
              <Text tag="p" print="subtitle"><span>Более 5000 товаров</span> для животных в наличии</Text>
            </div>
            <div>
              <Text tag="p" print="subtitle"><span>Вкусные сюрпризы </span> для ваших питомцев в магазине  </Text>
            </div>
          </div>
          </div>
          <div>
            <Button kind="primary"><RouterLink to="/catalog" class="link_button" :class="['item']"
          >Выбрать товар</RouterLink></Button>
         
        </div>
        </div>
        <div class="presentation-image">
          <img class="goods" src="../assets/image/goods.png" alt="изображение товаров">
        </div>
      </div>

    </div>

  </section>
</template>

<style lang="scss" scoped>

.link_button {
  color: var(--white);
}

.presentation-wrapper {
  padding: 33px 5px 40px 5px;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}

.presentation_subtitle {
  display: flex;
  gap: 31px;
}

.presentation-info {
  display: flex;
  flex-direction: column;
  gap: 32px;
  flex: 0 1 524px;
  justify-content: space-between;
}

.presentation-image {
  max-width: 573px;
  max-height: 377px;
  // display: flex;
  // flex: 0 0 573px;

}

span {
  font-weight: 700;
}

.advantages {
  max-width: 524px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.presentation_subtitle div {
border-left: 2px solid var(--border-advantages);
 padding-left: 9px;
}

.goods {
  overflow: hidden;
  z-index: 10;
}

@media (max-width: 992px) {

.container {
    max-width: 992px;
}

.presentation-wrapper {
  padding: 24px 10px 24px 10px;
}

.presentation_subtitle {
  flex-direction: column;
  gap: 16px;
}

.presentation_title {
  font-size: 21px;
}

.advantages {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 267px;
}

.goods {
  max-height: 275px;
}


}

</style>
