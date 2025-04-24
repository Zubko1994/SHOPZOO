<!-- @format -->

<script setup lang="ts">
const props = defineProps({
  kind: {
    type: String,
  },

  isActive: {
    type: Boolean,
  },
})

const emit = defineEmits(['customClick'])

function btnHandler(e: Event) {
  emit('customClick', e)
}
</script>

<template>
  <button
    @click="emit('customClick')"
    :class="['btn', `btn_${kind}`, { 'btn_quantity-active': isActive }]"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.btn {
  color: var(--text-default);
  font-family: 'SFProText';
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  padding: 8px 16px;
  border: var(--border-default);
  background: var(--white);
  display: inline-block;
  transition: all 0.1s ease;
  white-space: nowrap;

  &:hover {
    background-color: var(--default-hover);
  }
  &_primary {
    background-color: var(--highlight);
    box-shadow: 0px -1px 0px 0px #00000033 inset;
    box-shadow: 0px 1px 0px 0px #00000014;
    color: var(--white);
    padding: 12px 24px;
    border: none;
    &:hover {
      background-color: var(--highlight-hover);
    }
  }
  &_buying {
    border: var(--border-highlight);
  }
  &_quantity {
    background: var(--surface-neutral);
    color: var(--text-default);
    border: none;
    border-radius: 2px;
    padding: 2px 8px;
    &:hover {
      background: var(--highlight-active);
      color: var(--white);
    }
  }
  &_quantity-active {
    background: var(--highlight-active);
    color: var(--white);
  }
  &_basket {
    border: 1px solid;
    border-image-source: var(--gradient-button);
    padding: 8px 14px;
    background-image: url('./src/assets/image/basket.png');
    width: 60px;
    height: 36px;
    background-repeat: no-repeat;
    background-position: center;
    border: 1px solid #babfc3;
    border-radius: 4px;
    margin-right: 10px;
  }
  &_basket-adding {
    border-radius: 5px;
    border: 1px solid;
    border-image-source: var(--gradient-button);
    padding: 5px 12px;
    background-image: url('/src/assets/image/basketadding.png');
    width: 54px;
    height: 30px;
    background-repeat: no-repeat;
    background-position: center;
    border: 1px solid #babfc3;
    box-shadow: 0px 1px 0px 0px #0000000d;
    margin-right: 10px;
  }

  &_indicator-left {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    padding: 10px;
    background-image: url('/src/assets/image/Primaryfillleft.svg');
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 10px;
    background-color: var(--bg-button);
  }
  &_indicator-right {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    padding: 10px;
    background-image: url('/src/assets/image/Primaryfill.svg');
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 10px;
    background-color: var(--bg-button);
  }
  &_backcall {
    color: var(--blue-text);
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    padding: 0px;
    border: none;
    background-color: var(--bg-default);
    
  }
}
</style>
