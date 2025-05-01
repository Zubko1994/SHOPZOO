<!-- @format -->

<script setup lang="ts">
const props = defineProps<{
  color?: string
}>()
</script>

<template>
  <nav>
    <ul class="list">
      <li>
        <RouterLink to="/about" :class="['item', `item-${color}`]">Главная</RouterLink>
      </li>
      <li>
        <RouterLink to="https://oliver1ck.pythonanywhere.com/doc/" :class="['item', `item-${color}`]"
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
}
.item {
  font-family: 'SFProText';
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  &:hover {
    color: var(--text-hover);
  }
  &-white {
    color: var(--white);
  }
  &-black {
    color: var(--text-default);
  }
}
</style>
