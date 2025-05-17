<script setup lang="ts"></script>

<template>
  <div class="logo">
    <img src="../assets/svg/logoFooter.svg" alt="иконка логотипа" />
    <p class="logo-title">Территория <span>ZOO</span></p>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  display: flex;
  gap: 6px;
  align-items: center;
  text-wrap: nowrap;
}

.logo-title {
  font-family: "SFProText";
font-size: 16px;
font-weight: 700;
line-height: 24px;
letter-spacing: 0px;
text-align: left;
text-transform: uppercase;
color: var(--text-default);
text-wrap: nowrap;
}

span {
  color: var(--text-green);
}
</style>
