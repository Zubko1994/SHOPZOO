<script setup lang="ts">

import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import HeaderActive from '../components/HeaderActive.vue'

</script>

<template>
<Header class="header" />
<HeaderActive class="header-active" />
<main>
  <slot />
</main>
<Footer />
</template>

<style lang="scss" scoped>

.header-active {
    display: none;
}

.header {
    display: block;
}


@media (max-width: 992px) {

.container {
    max-width: 992px;
}

.header-active {
    display: block;
}

.header {
    display: none;
}

}
</style>
