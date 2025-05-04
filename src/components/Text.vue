<!-- @format -->

<script setup lang="ts">
import { computed } from 'vue'

type VariantText = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
type Kind =
  | 'title'
  | 'subtitle'
  | 'card'
  | 'adress'
  | 'time'
  | 'phone'
  | 'title'
  | 'contacts_medium'
  | 'author'
  | 'feedback'

const props = defineProps<{
  title?: string
  tag: VariantText
  print: Kind
}>()

const computedClass = computed(() => {
  return [
    {
      [`${props.tag}`]: props.tag,
    },
    {
      [`${props.tag}-${props.print}`]: props.print,
    },
  ]
})
</script>

<template>
  <component :is="tag" :class="computedClass"
    >{{ title }}<slot></slot
  ></component>
</template>

<style lang="scss" scoped>
.p {
  font-family: 'SFProText';
  font-weight: 600;
  font-size: 16px;
  line-height: 130%;
  color: var(--text-default);
  &-card {
    -webkit-line-clamp: 3;
    position: relative;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  &-adress {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: var(--text-default);
  }

  &-time {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: var(--text-default);
  }
  &-phone {
    color: var(--text-default);
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
  }

  &-contacts_medium {
    color: rgb(109, 113, 117);
    font-family: 'SFProText';
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: center;
  }
  &-subtitle {
    color: var(--text-default);
    font-family: 'SFProText';
    font-size: 16px;
    font-weight: 400;
    line-height: 130%;
    letter-spacing: 0px;
    text-align: left;
    &-bold {
      font-weight: 700;
    }
  }
  &-author {
    color: var(--text-default);
    font-family: 'SFProText';
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
  }
  &-feedback {
    color: var(--text-default);
    font-family: 'SFProText';
    font-size: 14px;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: 0px;
    text-align: center;
  }
}

h1 {
  color: var(--text-default);
  font-family: 'SFProDisplay';
  letter-spacing: 0px;
  text-align: left;
  font-size: 42px;
  font-weight: 700;
  line-height: 120%;
}

h2 {
  color: var(--text-default);
  font-family: 'SFProDisplay';
  letter-spacing: 0px;
  text-align: left;
  font-weight: 600;
  line-height: 32px;
  font-size: 28px;
  &-title {
    font-size: 28px;
  }
}

h3 {
  color: var(--text-default);
  font-family: 'SFProText';
  letter-spacing: 0px;
  text-align: left;
  font-weight: 600;
  line-height: 130%;
  font-size: 16px;
  &-title {
    font-size: 16px;
  }
}

h4 {
  color: var(--text-default);
  font-family: 'SFProDisplay';
  font-weight: 700;
  line-height: 130%;
  letter-spacing: 0px;
  text-align: left;
  font-size: 20px;
  &-title {
    font-size: 20px;
  }
}
</style>
