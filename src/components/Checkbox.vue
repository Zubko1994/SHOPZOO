<script setup lang="ts">
import Text from '../components/Text.vue'

const emit = defineEmits (['promotionProducts'])

 function handleClick() {
   emit('promotionProducts'); 
   console.log('клик есть')
 }

</script>

<template>
  <div class="action">
  <input class="checkbox" type="checkbox" id="checkbox" @click="handleClick"  />
  <label for="checkbox"></label><Text tag="p" print="check-box"  class="check-box_title" title="Только акционные товары" />
</div>
</template>

<style lang="scss" scoped>

label {
  display: block;
  border: 2px solid rgb(140, 145, 150);
  border-radius: 4px;
  width: 18px;
  height: 18px;
  background-color: var(--white);
  margin-right: 5px;
  background-image: url('../assets/svg/check.svg');
  background-repeat: no-repeat;
  background-size: 10px 8px;
  background-position: center;

}

input {
  display: none;
}
input:checked + label {
  background-color: var(--Action-Primar-Default);
 
}

.checkbox:checked {
  background: var(--Action-Primar-Default);
  
}

.check-box_title {
  text-wrap: nowrap;
  // margin-left: 20px;
}

.action {
  display: flex;
  gap: 5px;
  align-items: center;
}

@media (max-width: 576px) {

.action {
  min-width: 340px;
  max-width: 0 auto;
  width: 100%;
}


}
</style>
