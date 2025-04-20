<!-- @format -->

<script setup lang="ts">
import Quantity from './Quantity.vue'
import ImageCard from './ImageCard.vue'
import Text from './Text.vue'
import Button from './Button.vue'
import Card from "./Card.vue"

const dataCard = [
    {
        img: "/src/assets/image/royalCaninkonserv .png",
        title: "Консервы ROYAL CANIN STERILISED для взрослых кастрированных котов..FRESH STEP CAT LITTER CLAY EXTREME – Фреш Степ наполнитель..",
        quantity: ['85 г.'],
        price: '12',
    },

    {
        img: "/src/assets/image/freshStepCat.png",
        title: "FRESH STEP CAT LITTER CLAY EXTREME – Фреш Степ наполнитель..",
        quantity: ['6 л.', '12 л.', '18 л.', '30 л.'],
        price: '95',
    },

    {
        img: "/src/assets/image/furminatorHair.png",
        title: "FURMINATOR SHORT HAIR LARGE CAT M/L Фурминатор для короткошерстных кошек..",
        quantity: ['1 шт.'],
        price: '95',
    },

    {
        img: "/src/assets/image/royalcaninKorm.png",
        title: "Сухой корм ROYAL CANIN STERILISED 37 для взрослых кастрированных котов и..",
        quantity: ['0,2 кг.', '0,4 кг.', '1,2 кг.', '2 кг.', '4 кг.', '10 кг.', 'Задать вес'],
        price: '5',
    },

]

console.log(dataCard)

const wrap = document.createElement("div");
wrap.classList.add('wrapper-cards')
document.body.append(wrap)
console.log(wrap)

function showGoods(dataCard: any) {
    dataCard.forEach((elems: any) => {
        let item = document.createElement('div');
        item.classList.add('card')
        console.log(elems.title)

        //         item.innerHTML = `
        //     <div class="wrapper-image">
        //       <ImageCard src="${elems.img}" />
        //     </div>
        //     <div class="wrapper-title">
        //       <Text
        //         title="${elems.title}"
        //       />
        //     </div>
        //     <div class="wrapper-quantity">
        //       <Quantity :list="${elems.quantity}" />
        //     </div>
        //     <div class="cost-info">
        //       <span class="cost">${elems.price} BYN</span> <Button title="" kind="basket-adding" />
        //     </div>
        //     <Button kind="buying">Купить в 1 клик</Button>
        //   </div>`;



        wrap.append(item)
    });
    return wrap;
}

let goodsZOO = showGoods(dataCard);
console.log(goodsZOO)


</script>

<template>

</template>

<style lang="scss" scoped></style>
