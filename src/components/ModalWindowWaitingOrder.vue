<!-- @format -->

<script setup lang="ts">
import Text from './Text.vue'
import Button from './Button.vue'
import { ref } from 'vue'

const emit = defineEmits(['show-accept', 'closeWindow'])


const closeAccept = () => {
  emit('closeWindow')
}
</script>

<template>
  <div class="modal-waiting">
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
          <img class="mark" src="../assets/image/shape.svg" alt="галочка" />
        </div>
        <div class="wrapper__info">
        <Text
          tag="h4"
          print="waiting-order-title"
          title="Заказ оформлен и ожидает вас по адресу:"
          class="waiting__title"
        />
        <div>
          <div class="wrapper__metro-time">
          <div class="info">
            <div class="info__adress">
              <img src="../assets/image/Primary.svg" alt="карта" />
              <Text tag="p" print="adress" title="Минск, ул. Чюрлёниса, 6." />
            </div>
            <div class="info__metro">
              <img src="../assets/image/metro.svg" alt="метро" />
              <Text tag="p" print="adress" title="Малиновка" />
            </div>
          </div>
          <div class="time">
            <div class="time_wrapper">
              <div class="timetable">
                <img src="../assets/image/clock.svg" alt="" />
                <Text tag="p" print="time" title="Пон.-Пят. 10:00-21:00" />
              </div>
              <div class="line"></div>
              <div class="timetable timetable-right">
                <Text tag="p" print="time" title="Суб.-Вос. 10:00-20:00" />
              </div>
            </div>
          </div>
          <div class="waiting_button">
            <Button class="button-send" kind="primary" 
              ><RouterLink to="/articles" class="link_button" :class="['item']"
              >Читать полезные статьи</RouterLink></Button
            >
          </div>
        </div>
        </div>
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
  padding: 0px 56px 24px 56px;
}

.timetable {
  display: flex;
  gap: 6px;
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
  z-index: 900;
}

.wrapper__info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.register__info {
  max-width: 462px;
  min-width: 300px;
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

.time_wrapper {
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: nowrap;
}

.wrapper__metro-time {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.link_button {
  color: var(--white);
}

.time {
  display: flex;
  flex-direction: column;
  gap: 16px;
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

.info {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: nowrap;
}

.info__adress {
  display: flex;
  gap: 10px;
  align-items: center;
  text-wrap: nowrap;
}

.info__metro {
  display: flex;
  gap: 6px;
  align-items: center;
}

.contacts_adress {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 344px;
  padding: 14px 70px 13px 0px;
}

.line {
  width: 5px;
  height: 17px;
  background-color: rgb(140, 145, 150);
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

  .time_wrapper {
    flex-wrap: wrap;
    
  }
}


@media (max-width: 761px) {
 
  .register__wrapper {
  padding: 0px 16px 24px 16px;
}

.timetable {
  flex-wrap: nowrap;
}

.time {
  flex-wrap: nowrap;
  // margin-left: 25px;
}

.waiting__title {
font-size: 21px;
font-weight: 700;
line-height: 28px;
}
.line {
  display: none;
}

.timetable-right {
  margin-left: 19px;
}

}

</style>
