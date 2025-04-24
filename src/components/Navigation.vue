<!-- @format -->

<script setup lang="ts"></script>

<template>
  <nav>
    <ul class="list">
      <li>
        <RouterLink to="/about" class="item">Главная</RouterLink>
      </li>
      <li>
        <RouterLink to="https://oliver1ck.pythonanywhere.com/doc/" class="item">Каталог</RouterLink>
      </li>
      <li>
        <RouterLink to="/" class="item">Акции</RouterLink>
      </li>
      <li>
        <RouterLink to="/" class="item">Статьи</RouterLink>
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
  color: rgb(32, 34, 35);
  font-family: 'SFProText';
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  color: var(--text-default);
}
</style>
