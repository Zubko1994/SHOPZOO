!<script setup lang="ts">
import Layout from '../layout/Layout.vue'
import MenuCrumbsBasket from '../components/MenuCrumbsBasket.vue'
import OrderDetails from '../components/OrderDetails.vue'




</script>

<template>
  <Layout>
<MenuCrumbsBasket class="crumbs-menu" link="order" to="/order" title="Корзина"/>
<OrderDetails/>
  </Layout>
</template>

<style lang="scss" scoped>



@media (max-width: 992px) {

  .crumbs-menu {
    display: block;
    position: relative;
    z-index: 100;
    top: 40px;
    margin-bottom: 24px;
  }
}
</style>