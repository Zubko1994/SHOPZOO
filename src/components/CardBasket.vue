<!-- @format -->

!
<script setup lang="ts">
import Text from './Text.vue'
import Quantity from './QuantityBasket.vue'
import { ref, computed, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    image_prev: string
    title: string
    countitemproduct_set: string[]
    price: number
    currentCategory?: number
    animal: string[]
    sale: { id: number; image: string; percent: number; title: string }
    promotion: string
  }>(),
  {
    promotion: 'Акция',
  }
)
const selectedQuantity = ref<string | null>(null)

const updateTotalPrice = (quantity: string) => {
  selectedQuantity.value = quantity
  console.log(quantity)
}
const countProduct = ref(1);

function increaseCount() {
    countProduct.value++
    console.log(countProduct)
  }



function decreaseCount() {
  if (countProduct.value != 0) {
    countProduct.value--
    console.log(countProduct)
  }
  return countProduct.value
}
</script>

<template>
  <div class="wrapper-card">
    <div class="wrapper-card_left">
      <img
        class="card_image"
        :src="props.image_prev"
        alt="Изображение товара"
      />
      <div class="product-info">
        <Text
          class="card_title"
          tag="h3"
          print="basket-title-product"
          :title="props.title"
        />
        <div class="product-info_quantity">
          <Quantity
            :list="props.countitemproduct_set || []"
            @updateQuantity="updateTotalPrice"
          />
        </div>
      </div>
    </div>
    <div class="wrapper-card_right">
      <div class="goods_info-wrapper">
        <div class="count">
          <button @click="decreaseCount" class="wrapper_symbol">
            <img src="../assets/image/minus_minor.svg" alt="минус" />
          </button>
          <p class="wrapper_symbol">{{ countProduct }}</p>
          <button @click="increaseCount" class="wrapper_symbol">
            <img src="../assets/image/plus_minor.svg" alt="плюс" />
          </button>
        </div>
        <div class="cost">{{ 12 }} BYN</div>
      </div>
      <button class="trash-can">
        <img src="../assets/svg/Delete.svg" alt="удалить товар" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-info {
  max-width: 470px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card_title {
  -webkit-line-clamp: 2;
  position: relative;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.card_image {
  width: 56px;
  height: 56px;
  background-color: var(--white);
  mix-blend-mode: multiply;
}

.wrapper-card_left {
  display: flex;
  gap: 16px;
}

.wrapper_symbol {
  width: 36px;
  height: 36px;
  border: 1px solid rgba(186, 191, 195, 1);
  padding: 8px 0px 8px 0px;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.05);
  background: var(--white);
  color: var(--text-default);
  font-family: 'SFProText';
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
display: flex;
justify-content: center;
}

.count {
  display: flex;
  gap: 6px;
}

.goods_info-wrapper {
  display: flex;
  gap: 35px;
}

.wrapper-card {
  display: flex;
  gap: 16px;
  justify-content: space-between;
  max-width: 738px;
  width: 100%;
  padding: 24px 16px 24px 16px;
}

.wrapper-card_right {
  display: flex;
  align-items: flex-start;
  gap: 35px;
}

.trash-can {
  background-color: var(--white);
  mix-blend-mode: multiply;
  margin-top: 6px;
}

.goods_info-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-content: flex-start;
}

.cost {
  color: var(--text-default);
  font-family: 'SFProText';
  font-size: 16px;
  font-weight: 400;
  line-height: 130%;
  letter-spacing: 0px;
  text-align: left;
}

@media (max-width: 873px) {
  .wrapper-card{
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    max-width: 640px;
    padding: 24px 16px 0px 16px;
  }

}

@media (max-width: 667px) {
  .wrapper-card{
    max-width: 340px;
  }

  .wrapper-card_left {
  flex-direction: column;
  align-items: flex-start;
}


}

</style>
