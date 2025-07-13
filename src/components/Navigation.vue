<!-- @format -->

<script setup lang="ts">
const props = defineProps<{
  color?: string
  direction?: string
}>()
</script>

<template>
  <nav>
    <ul :class="['list', `list-${direction}`]">
      <li>
        <RouterLink to="/" :class="['item', `item-${color}`]">Главная</RouterLink>
      </li>
      <li>
        <RouterLink to="/catalog" :class="['item', `item-${color}`]"
          >Каталог</RouterLink
        >
      </li>
      <li>
        <RouterLink to="/" :class="['item', `item-${color}`]">Акции</RouterLink>
      </li>
      <li >
        <RouterLink to="/" :class="['item', `item-${color}`]">Статьи</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  gap: 5px;
  justify-content: space-between;
  width: 350px;
  padding-left: 5px;
  padding-right: 5px;
  &-vertical {
    flex-direction: column;
    gap: 32px;
    align-items: center;
    width: 100%;
  }
}
.item {
  font-family: 'SFProText';
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  &:hover {
    text-decoration: underline;
  }
  &-white {
    color: var(--white);
  }
  &-black {
    color: var(--text-default);
  }
}
</style>
