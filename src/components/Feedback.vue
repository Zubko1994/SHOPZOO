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
  max-width: 718px;
}

.feedback_author {
  text-align: center;
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




</style>
