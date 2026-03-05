<script setup lang="ts">
  import { FORM_TITLE, PAGE_PATH } from '@constants';

  const userLogin = ref<string>('');
  const userPassword = ref<string>('');
  const userPasswordRepeat = ref<string>('');
  const message = ref<string>('');

  /** Вход на сайт. */
  const login = () => {
    navigateTo(PAGE_PATH.login);
  };
  /** Регистрация на сайте. */
  const registration = () => {
    message.value = 'Пока не готово';
  };
  /** Вход на сайт без логина и пароля. */
  const loginForPoliteUsers = () => {
    if (userLogIn()) {
      navigateTo(PAGE_PATH.index);
    }
  };
</script>

<template>
  <FormBase
    class="form-registration"
    :title="FORM_TITLE.registration"
    :message
    message-type="error"
  >
    <template #body>
      <VscInputText
        id="login"
        class="form-registration__item"
        label="Электронная почта"
        label-style="column"
        v-model="userLogin"
      />
      <VscInputPassword
        id="password"
        class="form-registration__item"
        label="Пароль"
        label-style="column"
        :required="false"
        v-model="userPassword"
      />
      <VscInputPassword
        id="passwordRepeat"
        class="form-registration__item"
        label="Повторите пароль"
        label-style="column"
        :required="false"
        v-model="userPasswordRepeat"
      />
    </template>

    <template #buttons>
      <div class="form-registration__buttons">
        <VscButton
          text="Создать аккаунт"
          :elevated="true"
          @click="registration"
        />
        <VscButton
          text="Войти"
          button-style="outline"
          :elevated="true"
          @click="login"
        />
      </div>
    </template>

    <template #extra>
      <VscButton
        text="А можно просто посмотреть?"
        button-style="plain"
        @click="loginForPoliteUsers"
      />
    </template>
  </FormBase>
</template>

<style scoped lang="postcss">
  .form-registration {
    --form-title: 1.5rem;
    --elements-gap: var(--indent);

    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    background-color: var(--white);
    display: flex;
    flex-direction: column;
    gap: var(--elements-gap);
    text-align: center;
    width: 20rem;
    margin: auto;

    @media (--bp-lg) {
      padding-inline: var(--indent-double);
      width: 22rem;
    }

    &__item {
      width: 100%;
    }

    &__buttons {
      display: flex;
      flex-direction: column;
      gap: var(--elements-gap);
    }
  }
</style>
