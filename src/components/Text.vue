<!-- @format -->

<script setup lang="ts">
import { computed } from 'vue';

type VariantText = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' 
type Kind = 'title' | 'subtitle' | 'title_card' | 'title_adress' | 'title_time' | 'title_phone'

const props = defineProps<{
  title: string
  tag: VariantText
  print: Kind
}>()

const computedClass = computed(() => {
  return [
    {
      [`${props.tag}`]: props.tag
    },
    {
      [`${props.tag}-${props.print}`] : props.print
    }
  ]
})
</script>

<template>
  <component :is="tag" :class="computedClass">{{ title }}</component>
</template>

<style lang="scss" scoped>
.p {
  font-family: 'SFProText';
  font-weight: 600;
  font-size: 16px;
  line-height: 130%;
  color: var(--text-default);
  &_card {
    -webkit-line-clamp: 3;
    position: relative;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  &_adress {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: var(--text-default);
  }

  &_time {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: var(--text-default);
  }
  &_phone {
    color: var(--text-default);
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
  }
}
</style>
