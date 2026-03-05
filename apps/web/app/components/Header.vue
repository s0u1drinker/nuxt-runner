<script setup lang="ts">
  import { PAGE_PATH } from '@constants';

  /** Завершение сеанса. */
  const logoutUser = () => {
    userLogOut();
    navigateTo(PAGE_PATH.login);
  };
</script>

<template>
  <header class="header">
    Header
    <VscButton
      text="Выход"
      button-style="plain"
      @click="logoutUser"
    />
  </header>
</template>

<style scoped></style>
