<!-- @format -->

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Quantity from './Quantity.vue'
import ImageCard from './ImageCard.vue'
import Text from './Text.vue'
import Button from './Button.vue'


const props = withDefaults( 
  defineProps<{
  image_prev: string
  title: string
  countitemproduct_set: string[]
  price: number
  currentCategory?: number 
  animal: string[]
  sale: {id: number; image: string; percent: number; title: string }
  promotion: string
}>(),
{
    promotion: "Акция",
  }
)

const selectedQuantity = ref<string | null>(null)
console.log(selectedQuantity.value)
const totalPrice = ref(props.price)
const fullCost = ref()
const updateTotalPrice = (quantity: string) => {
  selectedQuantity.value = quantity
  console.log(quantity)

  const info = JSON.parse(JSON.stringify(quantity))
  console.log(info.value)
  totalPrice.value = (props.price * info.value).toFixed(2)
  
  watch(totalPrice, (newVal) => {
    if(newVal){
    newVal = totalPrice
    }
  })
}

// const emit = defineEmits(['updateCategory'])



// function handleCategoryUpdate() {
//   emit('updateCategory', props.countitemproduct_set)
// }


</script>

<template>
  <div class="card">
    <div class="wrapper-ceil">
      <div v-if="props.sale && props.sale.percent > 0" class="product-promotion">
{{props.promotion}}
      </div>
      <ImageCard class="image-good" :src="props.image_prev" />
      <div class="wrapper-title">
        <Text class="card_title" tag="h3" print="title" :title="props.title" />
      </div>
    </div>
    <div class="wrapper-bottom">
    <div class="wrapper-quantity">
      <Quantity
        :list="props.countitemproduct_set || []"
        @updateQuantity="updateTotalPrice"
      />
    </div>
    <div class="wrapper-basket">
      <div class="cost-info">
        <div class="wrapper-price">
      <div v-if="props.sale && props.sale.percent > 0" class="total-price">{{(+totalPrice + +(totalPrice*props.sale.percent/100)).toFixed(2)}}BYN</div>
        <span class="cost">{{ totalPrice }} BYN </span>
        </div>
        <Button title="" kind="basket-adding" />
      </div>
      <Button kind="buying">Купить в 1 клик</Button>
    </div>
  </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;
  width: 270px;
  min-width: 243px;
  padding: 8px;
  max-height: 392px;
  background-color: var(--white);
  border-radius: 5px;
  align-self: auto;
}

.image-good {
  text-align: center;
}

.product-promotion {
    position: absolute;
    top: 8px;
    left: 8px;
    color: rgb(255, 255, 255);
    font-family: "SFProText";
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0px;
    padding: 2px 8px;
    background: rgba(253, 87, 73, 1);
    border-radius: 2px;
    // user-select: none;
}



.card_title {
  -webkit-line-clamp: 3;
  position: relative;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.card_title:hover {
  color: var(--highlight);
  cursor: pointer;
}

// .wrapper-image {
//   margin-bottom: 5px;
// }

// .wrapper-title {
//   margin-bottom: 10px;
// }

.wrapper-quantity {
  margin-bottom: 10px;
  align-items: center;
}

.cost-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 9px;

}

.cost {
  display: block;
  font-family: 'SFProText';
  font-weight: 700;
  font-size: 16px;
  line-height: 130%;
  letter-spacing: 0px;
  color: var(--text-default);
  text-wrap: nowrap;
}

.total-price {
font-family: 'SFProText';
font-weight: 700;
font-style: Bold;
font-size: 16px;
line-height: 130%;
letter-spacing: 0px;
text-decoration: line-through solid rgba(215, 44, 13, 1);
color: rgba(140, 145, 150, 1);

}

.wrapper-price {
  display: flex;
  gap: 4px;
}

.wrapper-basket {
  display: flex;
  flex-direction: column;
  gap: 13px;
}

.wrapper-ceil {
  display: flex;
  flex-direction: column;
  gap: 16px;
}


@media (max-width: 576px) {
  .container {
    max-width: 576px;
  }
  
  .image-good {
    text-align: center;
    width: 100%;
    display: block;
    margin: 0 auto;
  }

  .card_title {
  -webkit-line-clamp: 2;
  position: relative;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
  
}

@media (max-width: 360px) {
  .container {
    max-width: 360px;
  }

  .wrapper-cards {
    width: 340px;
  }

  .wrapper-bottom {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .card {
    // width: 340px;
    padding: 8px;
    align-content: flex-start;
  }
}
</style>
