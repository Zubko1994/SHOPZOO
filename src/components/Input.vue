<script setup lang="ts">

</script>

<template>
  <div class="search-field">
    <label for="search"></label>
    <input class="search" type="text" placeholder="Поиск">
    <img class="magnifier" src="../assets/image/Search.png" alt="иконка лупы">
  </div>
</template>

<style lang="scss" scoped>

.search-field {
  display: flex;
  flex: 0 1 500px;
  position: relative;
}


::placeholder, .search {
  color: var(--text-gray);
  font-family: "SFProText";
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  width: 100%;
  border-radius: 4px;
}

.search {
  padding: 8px 12px 8px 30px;
}

.magnifier {
  position: absolute;
  top: 10px;
  left: 6px;
}


</style>
