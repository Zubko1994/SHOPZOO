<!-- @format -->

<script setup lang="ts">
import Text from './Text.vue'
import Button from './Button.vue'
import { ref } from 'vue'
import AcceptRequest from './AcceptRequest.vue'

// const show = ref(true)

// const closeModal = () => {
//   show.value = !show.value
// }


// const showWaiting = ref(false);

// const showModalWaiting = () => {
//   showWaiting.value = !showWaiting.value
// };

/////////////////////

// defineProps<{
//   show: boolean // Управляется извне
// }>()

const emit = defineEmits(['close', 'open-waiting'])

const closeModal = () => {
  emit('close') // Эмитим событие вместо изменения внутреннего состояния
}

const showModalWaiting = () => {
  emit('open-waiting') // Сообщаем родителю об открытии окна подтверждения
}
</script>

<template>
  <div class="modal" @click.self="closeModal">
    <form class="register__info" action="#">
      <div class="cross_block">
        <img
          class="cross"
          @click.self="closeModal"
          
          src="../assets/image/cross.svg"
          alt="крестик"
        />
      </div>
      <div class="register__wrapper">
        <Text
          tag="h4"
          print="title-backcall"
          title="Перезвоним вам в течение 15 минут"
          class="register__title"
        />
        <div class="contacts-info">
          <div class="customer-name">
            <label for="name">Имя</label>
            <input id="name" type="text" placeholder="Иванов Иван Иванович" required/>
          </div>
          <div class="customer-phone">
            <label for="name">Номер телефона</label>
            <input id="name" type="text" placeholder="+375 ___-__-__" required />
          </div>
        </div>
        <Button class="button-send" kind="primary"  @click="showModalWaiting" 
          >Отправить</Button
        >
        <!-- <AcceptRequest  class="modal" v-if="showWaiting" /> -->
        <Text tag="p" print="personal"
          >Нажимая на кнопку вы даёте согласие на обработку
          <span>персональных данных</span></Text
        >
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
label {
  color: var(--text-default);
  font-family: 'SFProText';
  font-weight: 600;
  font-size: 16px;
  line-height: 130%;
  letter-spacing: 0px;
}

::placeholder {
  font-family: 'SFProText';
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: 0px;
  vertical-align: middle;
}

.customer-name,
.customer-phone {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.register__wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.register__wrapper {
  padding: 4px 35px 16px 48px;
}

.contacts-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

input {
  padding: 8px 12px;
  width: 100%;
  border: 1px solid #a7acb1;
  display: block;
  border-radius: 4px;
}

.button-send {
  margin: 0 auto;
}

.modal {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background: rgba(83, 84, 85, 0.5);
  position: fixed;
}

.register__info {
  max-width: 461px;
  min-width: 340px;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  background: var(--white);
  padding: 8px;
  border-radius: 8px;
  position: fixed;
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
