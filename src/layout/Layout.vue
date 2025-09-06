<script setup lang="ts">

import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import HeaderActive from '../components/HeaderActive.vue'
import { provide, ref } from 'vue';

const props = defineProps<{
  isActive?: boolean
}>();

// const isFiltersOpen = ref(false);

const emit = defineEmits(['update:isActive']);

const isFiltersOpen = ref(props.isActive || false);

const updateHeaderState = (active: boolean) => {
  isFiltersOpen.value = active;
  emit('update:isActive', active);
};

</script>

<template>
<Header class="header" />
<HeaderActive :isActive="isActive || isFiltersOpen" class="header-active"   @update:isActive="updateHeaderState"
/>
<main>
  <slot :isFiltersOpen="isFiltersOpen" />
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
