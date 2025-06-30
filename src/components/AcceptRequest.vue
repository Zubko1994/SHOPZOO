<script setup lang="ts">
import Text from './Text.vue'
import Button from './Button.vue'
import { ref } from 'vue'



const emit = defineEmits(['show-accept', 'close'])


const openAccept = () => {
  emit('show-accept')
}

const closeAccept = () => {
  emit('close')
}



</script>

<template>
  <div  class="modal-waiting">
    <div class="register__info">
      <div class="cross_block">
        <img
          class="cross"
          @click.self="closeAccept"
          src="../assets/image/cross.svg"
          alt="крестик"
        />
      </div>
      <div class="register__wrapper">
        <div class="checkmark">
          <img
            class="mark"
            src="../assets/image/shape.svg"
            alt="галочка"
          />
        </div>
        <Text
          tag="h4"
          print="title-backcall"
          title="Мы получили вашу заявку"
          class="register__title"
        />
        <Text tag="p" print="waiting" class="waiting"
          >Ожидайте звонка в течение 15 минут</Text
        >
        <div class="waiting_button">
        <Button class="button-send" kind="primary" @click="closeAccept" 
          >Понятно, жду</Button
        >
      </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.checkmark {
  margin: 0 auto;
  text-align: center;
  margin-bottom: 16px;
}

.mark {
  width: 41px;
  height: 41px;
}

.register__title {
  text-align: center;
  margin-bottom: 12px;
}

.register__wrapper {
  padding: 0px 32px 20px 32px;
}

.contacts-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.modal-waiting {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background: rgba(83, 84, 85, 0.5);
  position: fixed;
  z-index: 10;
}

.register__info {
  max-width: 414px;
  min-width: 340px;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  background: var(--white);
  padding: 4px;
  border-radius: 8px;
  position: fixed;
}

.waiting {
  margin-bottom: 13px;
}

.waiting_button {
  margin: 0 auto;
  text-align: center;
}
.cross_block {
  display: block;
  text-align: right;
}

.cross {
  cursor: pointer;
}

span {
  color: var(--blue-text);
}

@media (max-width: 992px) {

.container {
    max-width: 992px;
}

.register__info {
  max-width: 461px;
  min-width: 340px;
}

.register__wrapper {
  padding: 3px 8px 16px 8px;
}

.register__title {
  text-align: center;
}
}
</style>
