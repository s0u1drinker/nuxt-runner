<script setup lang="ts">
  import { MESSAGE_MAP } from '@constants';

  const error = useError();

  const isNotFound = computed(() => error.value?.status === 404);

  const handleClearError = async () => {
    await clearError({ redirect: '/' });
  };
</script>

<template>
  <div class="error">
    <div class="error__inner">
      <h1 class="error__title">Ошибка {{ error?.status ?? '' }}</h1>
      <p class="error__text">
        {{ isNotFound ? MESSAGE_MAP.error.notFound : MESSAGE_MAP.error.default }}
      </p>
      <VscButton
        text="На главную"
        @click="handleClearError"
        button-style="plain"
      />
    </div>
  </div>
</template>

<style scoped lang="postcss">
  .error {
    min-width: 100%;
    min-height: 100vh;
    background: linear-gradient(135deg, #b9deed, #efefef);
    display: flex;

    @media (--bp-xl) {
      background: url('/img/bg/404/404-4.webp');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    &__inner {
      background-color: var(--white);
      box-shadow: var(--shadow);
      border-radius: var(--border-radius);
      padding: 2rem;
      text-align: center;
      width: 20rem;
      margin: auto;

      @media (--bp-xl) {
        margin-left: 20%;
      }

      @media (--bp-2xl) {
        width: 30rem;
      }

      & > button {
        margin-top: 1rem;
      }
    }
  }
</style>
