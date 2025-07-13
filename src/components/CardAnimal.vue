<!-- @format -->

<script setup lang="ts">
import Text from '../components/Text.vue'

const props = defineProps<{
  image: string
  type: string
}>()
</script>

<template>
  <div class="card-animal">
    <div>
      <img :src="props.image" alt="изображение собаки" />
    </div>
    <div class="wrapper-text">
    <Text class="kind-animal" tag="h3" print="title" :title="props.type" />
  </div>
  </div>
</template>

<style lang="scss" scoped>

.card-animal {
  display: flex;
  flex: 0 0 215px;
  align-items: center;
  gap: 16px;
  background-color: var(--white);
  cursor: pointer;

}

.card-animal:hover {
  box-shadow: 0px 12px 32px 0px rgba(0, 0, 0, 0.1), 0px 0px 2px 0px rgba(0, 0, 0, 0.06);
  
  .kind-animal {
    color: var(--highlight);
  }
}


@media (max-width: 992px) {

.container {
    max-width: 992px;
}

.card-animal {
  flex: 0 1 138px;
  font-size: 15px;
  text-align: center;
  padding-right: 19px;
  gap: 8px;
}

}

</style>
