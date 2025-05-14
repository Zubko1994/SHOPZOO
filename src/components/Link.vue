<!-- @format -->

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = withDefaults(
  defineProps<{
    kind?: string
    link: string
    isLink?: boolean
  }>(),
  {
    isLink: true,
  }
)

const computedtag = computed(() => (props.isLink ? RouterLink : 'a'))
</script>

<template>
  <component
    :is="computedtag"
    :href="link"
    :to="link"
    :class="['link', `link_${kind}`]"
    ><slot
  /></component>
</template>

<style lang="scss" scoped>
.link {
  display: inline-block;
  color: var(--text-default);
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  // &_instagram {
  //   width: 14px;
  //   height: 14px;
  // }
}

.email {
  color: var(--);
font-family: "SFProText";
font-size: 14px;
font-weight: 400;
line-height: 24px;
letter-spacing: 0px;
text-align: left;
}
</style>
