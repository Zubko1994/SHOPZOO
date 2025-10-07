<!-- @format -->

<script setup lang="ts">
import Text from './Text.vue'
import Button from './Button.vue'
import { ref } from 'vue'

</script>

<template>
  <section class="mistake">
    <div class="container">
    <div class="mistake_wrapper">
        <div class="mistake_description">
           <Text class="mistake-number"  tag="h1" print="mistake-number" title="404" /> 
           <Text tag="p" print="mistake-title" title="Мрр... Мяу!" /> 
           <Text tag="p" print="mistake-title" title="Страница не найдена" /> 
           <div>
           <Text class="mistake-subtitle" tag="p" print="mistake-subtitle" title="Страничку, которую вы ищите не существует или она была удалена" /> 
           <Text tag="p" print="mistake-subtitle" title="Советуем перейти на главную, там можно найти много интересного для вашего любимого питомца" />
           </div>
           <div>
           <Button kind="primary"><RouterLink to="/" class="link_button" :class="['item']"
          >Перейти на главную</RouterLink></Button>
          </div>
        </div>
        <img class="mistake_image" src="../assets/image/Catmistake.png" alt="изображение кота">
    
    </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.mistake_wrapper {
  padding: 88px 5px 24px 5px;
  display: flex;
//   flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.link_button {
    color: var(--white);
}

.mistake_description {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 435px;
    
}

.mistake-subtitle {
    margin-bottom: 8px;
}



@media (max-width: 1214px) {
.mistake-number {
    font-family: "SFProDisplay";
font-weight: 700;
font-style: Bold;
font-size: 96px;
line-height: 120%;
}

.mistake_wrapper {
  align-items: center;
}

.mistake_description {
 align-self: center;
 margin: 0 auto;
    
}

.mistake_image {
    display: block;
    margin: 0 auto;
    width: 340px;
    height: 230px;
}

}

@media(max-width: 992px) {
    .mistake_wrapper {
  flex-wrap: wrap;
}

}
</style>
