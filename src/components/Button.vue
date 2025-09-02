<!-- @format -->

<script setup lang="ts">
const props = defineProps<{
  kind: string
  isActive?: boolean
}>()

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
  border-radius: 4px;
  background: var(--white);
  // display: inline-block;
  transition: all 0.1s ease;
  white-space: nowrap;

  &:hover {
    background-color: var(--secondary-hovered);
  }
  &_primary {
    background-color: var(--highlight);
    box-shadow: 0px -1px 0px 0px #00000033 inset;
    box-shadow: 0px 1px 0px 0px #00000014;
    color: var(--white);
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    display: inline;
    &:hover {
      background-color: var(--highlight-hover);
    }
  }
  &_buying {
    border: var(--border-highlight);
    &:hover {
      background: var(--highlight);
      color: var(--white);
    }
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
    // background-image: url('./src/assets/image/basket.png');
    width: 60px;
    height: 36px;
    background-repeat: no-repeat;
    background-position: center;
    border: 1px solid #babfc3;
    border-radius: 4px;
    
    &:hover {
      box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.05);
      background: rgb(246, 246, 247);
    }
    &-big {
      min-width: 338px;
      height: 44px;
      padding: 12px 24px;
      margin: 0 auto;
      display: block;
    }
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
  
  }

  &_indicator-left {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    padding: 10px;
    // background-image: url('/src/assets/image/Primaryfillleft.svg');
    background-repeat: no-repeat;
    background-position: center;
    border: none;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 5px;
    &:hover {
      background-color: var(--highlight);
    }
  }
  &_indicator-right {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    padding: 10px;
    // background-image: url('/src/assets/image/Primaryfill.svg');
    background-repeat: no-repeat;
    background-position: center;
    border: none;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: var(--highlight);
    }
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
  &_slider {
    color: var(--highlight);
    font-family: 'SFProText';
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: center;
    border: none;
    background: none;
  }

  &_slider-number {
    color: var(--highlight);
    font-family: 'SFProText';
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: center;
    border: none;
    background: none;
    &:hover {
      color: var(--text-gray);
    }
  }

  &_slider-number-active {
    color: var(--text-gray);
    font-family: 'SFProText';
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: center;
    border: none;
    background: none;
  }
}
</style>
