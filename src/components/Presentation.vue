<script setup lang="ts">
import Text from './Text.vue';
import Button from './Button.vue';

</script>

<template>
  <section class="presentation">
    <div class="container">
      <div class="presentation-wrapper">
        <div class="presentation-info">
          <Text tag="h1" print="title" title="Всё, что нужно вашему питомцу в 9 мин от метро Малиновка" />
          <div class="advantages">
            <div>
              <Text tag="p" print="subtitle"><span>Более 5000 товаров</span> для животных в наличии</Text>
            </div>
            <div>
              <Text tag="p" print="subtitle"><span>Вкусные сюрпризы </span> для ваших питомцев в магазине  </Text>
            </div>
          </div>
          <div>
          <Button kind="primary">Выбрать товар</Button>
        </div>
        </div>
        <div class="presentation-image">
          <img src="../assets/image/goods.png" alt="изображение товаров">
        </div>
      </div>

    </div>

  </section>
</template>

<style lang="scss" scoped>

.presentation-wrapper {
  padding: 33px 5px 40px 5px;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
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
  display: flex;
  gap: 31px;
}

.advantages div {
  border-left: 2px solid var(--border-advantages);
 padding-left: 9px;
}

</style>
