<!-- @format -->

<script setup lang="ts">
import Text from '../components/Text.vue'
import Button from './Button.vue'

const props = defineProps<{
user: string
text: string
phone_number: string
pet: string
}>()

</script>

<template>
  <div class="feedback">
    
    <div class="feedback_wrapper">
      <Text
        class="feedback_author"
        tag="p"
        print="author"
        :title="props.user"
      />
      <Text
        tag="p"
        print="feedback"
        :title="props.text"
      />
      <div class="contacts">
        <div class="wrapper_contacts">
          <img
            src="../assets/image/mobile_major.svg"
            alt="изображение телефона"
          />
          <Text tag="p" print="contacts_medium" :title="props.phone_number" />
        </div>
        <Text tag="p" print="contacts_medium" :title="`Питомец: ${props.pet}`" />
      </div>
    </div>
    </div>
</template>

<style lang="scss" scoped>


.feedback_wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0 auto;
  width: 718px;
  flex-wrap: wrap;
  // margin: auto;
  padding: 5px;

}
.feedback_author {
  text-align: center;
  text-wrap: wrap;
}

.contacts,
.wrapper_contacts {
  display: flex;
  gap: 16px;
  margin: 0 auto;
}

.contacts {
  margin-bottom:  22px;
}

@media (max-width: 1080px) {

.container {
    max-width: 1080px;
}
.feedback_wrapper {
  width: 700px;
}

}

@media (max-width: 992px) {

.container {
    max-width: 992px;
}

.contacts {
  flex-direction: column;
  gap: 8px;
}

.feedback_wrapper {
  width: 600px;
}

.wrapper_contacts {
  gap: 7px;
}
}


@media (max-width: 826px) {

.container {
    max-width: 826px;
}

.feedback_wrapper {
  width: 500px;
}
}

@media (max-width: 650px) {

.container {
    max-width: 650px;
}

.feedback_wrapper {
  width: 400px;
}
}

@media (max-width: 500px) {

.container {
    max-width: 500px;
}

.feedback_wrapper {
  width: 340px;
}
}

</style>
