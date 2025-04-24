<script setup lang="ts">
import Link from './Link.vue';
import Navigation from './Navigation.vue'

Link

</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__wrapper">
        <Link link="#">
          <div class="logo">
             <img src="../assets/image/dog.svg">
             <img src="../assets/image/Территория ZOO.svg" alt="">
          </div>
        </Link>
        <Navigation/>
      </div>

    </div>

  </footer>
</template>

<style lang="scss" scoped>

.footer__wrapper {
  display: flex;
  justify-content: space-between;
}
</style>
