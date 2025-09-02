<!-- @format -->

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
</script>

<template>
  <div class="sorting">
    <img src="../assets/svg/filterMajor.svg" alt="Иконка фильтров" />
    <span class="title">Фильтры</span>
  </div>
</template>

<style lang="scss" scoped>
span {
  display: block;
  margin: 0 auto;
}

.title {
  color: var(--text-default);
  font-family: 'SFProText';
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: center;
}

.wrapper_sorting {
  min-width: 270px;

  z-index: 50;
}

// .name-sort {
//   color: var(--text-default);
// font-family: 'SFProText';
// font-size: 14px;
// font-weight: 500;
// line-height: 20px;
// letter-spacing: 0px;
// text-align: right;
// }

.sorting {
  text-align: center;
  display: flex;
  gap: 10px;
  justify-content: center;
  justify-items: center;
  align-items: center;
  border-radius: 4px;
  padding: 8px 121px;
  background-color: var(--white);
  color: var(--text-default);
  font-family: 'SFProText';
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  border-radius: 4px;
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.05);
  border: 1px solid rgb(186, 191, 195);
  margin-bottom: 5px;
  max-width: 600px;
}

.wrapper_item {
  border-radius: 8px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1),
    0px 0px 2px 0px rgba(0, 0, 0, 0.2);
  background: rgb(255, 255, 255);
  border: 3px solid rgb(186, 191, 195);
  border-radius: 4px;
  padding: 8px 4px;
  background-color: var(--white);
  position: absolute;
  width: 270px;
}

.wrapper_item-active {
  display: block;
  padding: 8px 4px;
  z-index: 5;
  position: absolute;
  width: 100%;
}

.elem {
  color: var(--text-default);
  font-family: 'SFProText';
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  padding: 10px 9px;
  width: 100%;
  border-left: 3px solid var(--white);
}

.elem:hover {
  background-color: var(--surface-selected);
  cursor: pointer;
  border-left: 3px solid var(--interactive-default);
  box-shadow: border-box;
}

.arrow-down {
  background-image: url('../assets/svg/PrimaryArrowDown.svg');
  background-repeat: no-repeat;
  width: 12px;
  height: 7px;
}

.arrow-down-active {
  background-image: url('../assets/svg/PrimaryfillTop.svg');
  background-repeat: no-repeat;
}

@media (max-width: 992px) {
  .container {
    max-width: 992px;
  }

  .wrapper_item {
    min-width: 340px;
  }

  .wrapper_sorting {
    min-width: 340px;
  }

  .sorting {
    width: 340px;
  }
}
</style>
