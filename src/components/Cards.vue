<!-- @format -->

<script setup lang="ts">

const dataCard = [
            {
                img: "/src/assets/image/royalCaninkonserv .png",
                title: "Консервы ROYAL CANIN STERILISED для взрослых кастрированных котов..FRESH STEP CAT LITTER CLAY EXTREME – Фреш Степ наполнитель..",
                quantity: ['85 г.'],
                price: '12 BYN',
            },

            {
                img: "/src/assets/image/freshStepCat.png",
                title: "FRESH STEP CAT LITTER CLAY EXTREME – Фреш Степ наполнитель..",
                quantity: ['6 л.', '12 л.', '18 л.', '30 л.'],
                price: '95 BYN',
            },

            {
                img: "/src/assets/image/furminatorHair.png",
                title: "FURMINATOR SHORT HAIR LARGE CAT M/L Фурминатор для короткошерстных кошек..",
                quantity: ['1 шт.'],
                price: '95 BYN',
            },

            {
                img: "/src/assets/image/royalcaninKorm.png",
                title: "Сухой корм ROYAL CANIN STERILISED 37 для взрослых кастрированных котов и..",
                quantity: ['0,2 кг.', '0,4 кг.', '1,2 кг.', '2 кг.', '4 кг.', '10 кг.', 'Задать вес'],
                price: '5 BYN',
            },

          ]

console.log(dataCard)

const elem = document.createElement("div");
elem.classList.add('wrapper-cards')
document.body.append(elem)
console.log(elem)

function showGoods(dataCard:any) {
        dataCard.forEach((elem:any) => {
                let item = document.createElement('div');
                item.classList.add('card')

                item.innerHTML = `<div class="wrapp-delete">
                <div class="delete">&#215;</div>
                </div>
                <img class="foto-goods" src="${elem.img}">
                <p class="title">${elem.title}</p>
                <div class="wrapper-count">
                <div class="ves-active">${elem.quantity}</div>
                </div>
                <div class="price">
                <span>${elem.price} BYN</span>
                <img class="bask" src="./images/Auto layout button.png" alt="">
                </div>
                <button>Купить в 1 клик</button>`;

                elem.append(item)
        });
        return elem;
}

let goodsBasket = showGoods(savedCards);


</script>

<template>
  
</template>

<style lang="scss" scoped></style>
