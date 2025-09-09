<!-- @format -->

<script setup lang="ts">
import Text from './Text.vue'
import CardBasket from './CardBasket.vue'
import Quantity from './Quantity.vue'
import { ref, computed, watch, onMounted } from 'vue'

interface Cards {
  id: number
  image_prev: string
  title: string
  price: number
}

interface CardsObj {
  count: number
  next: string | null
  previous: string | null
  results: Cards[]
}

const dataCards = ref<CardsObj | null>(null)
fetch('https://oliver1ck.pythonanywhere.com/api/get_products_list/')
  .then((resp) => resp.json())
  .then((data) => (dataCards.value = data))

const cost = ref(542)
</script>

<template>
  <section>
    <div class="wrapper-basket">
      <div class="container">
        <Text class="title" tag="h2" print="basket-title" title="Моя корзина" />
        <div class="goods_choice">
          <div class="goods_choice-basket">
            <CardBasket
              v-for="card in dataCards?.results"
              :key="card.id"
              :countitemproduct_set="card.countitemproduct_set"
              :title="card.title"
              :image_prev="card.image_prev"
              :price="card.price"
            />
          </div>
          <div class="order-info">
            <div class="wrapper_order">
              <span class="cost">{{ cost }} BYN</span>
              <span class="count-order"
                >Количесво товаров: {{ dataCards?.results.length }}</span
              >
            </div>
            <div class="delivery-method">
              <img src="../assets/image/box.png" alt="коробка" />
              <div class="adress_wrapper">
                <span class="title_delivery">Самовывоз</span>
                <span class="adress">
                  <img
                    class="location"
                    src="../assets/image/location_major.svg"
                    alt="местоположение"
                  />
                  <span class="adress_info">Минск, ул. Чюрлёниса, 6.</span>
                </span>
              </div>
            </div>
            <button class="order-registration">Оформить заказ</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.wrapper-basket {
  padding: 24px 5px 64px 5px;
  background-color: var(--bg-default);
}

.title {
  margin-bottom: 24px;
}

.goods_choice-basket {
  background-color: var(--white);
  max-width: 770px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 8px;
  justify-content: flex-start;
  align-items: flex-start;
  padding-bottom: 24px;
}

.order-info {
  padding: 16px 24px 16px 24px;
  background-color: rgba(0, 128, 96, 1);
  max-width: 371px;
  max-height: 210px;
  border-radius: 8px;
  width: 100%;
  flex-wrap: nowrap;
}

.goods_choice {
  display: flex;
  gap: 30px;
  align-content: flex-start;
  justify-content: center;
  flex-wrap: wrap;
}

.order-registration {
  padding: 13px;
  border-radius: 5px;
  background-color: var(--white);
  color: var(--text-default);
  font-family: 'SFProText';
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: center;
  width: 100%;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.wrapper_order {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}

.cost {
  color: rgba(255, 255, 255, 1);
  font-family: 'SFProDisplay';
  font-size: 28px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0px;
  text-align: left;
}

.count-order {
  color: rgba(255, 255, 255, 1);
  font-family: 'SFProText';
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
}

.adress_info {
  color: rgba(255, 255, 255, 1);
  font-family: 'SFProText';
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
}

.location {
  width: 16px;
  height: 16px;
}

.adress {
  display: flex;
  gap: 8px;
  align-items: center;
}

.adress_wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
}
.delivery-method {
  display: flex;
  gap: 12px;
}

@media (max-width: 873px) {
  .title {
    font-weight: 400;
  }

  .order-info {
    min-width: 340px;
  }

  .goods_choice-basket {
    gap: 16px;
    // padding: 24px 16px 0px 16px;
  }
}

@media (max-width: 360px) {
  .order-info {
    width: 340px;
  }
}
</style>
