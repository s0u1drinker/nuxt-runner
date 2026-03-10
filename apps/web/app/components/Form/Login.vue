<script setup lang="ts">
  import {
    FORM_TITLE,
    PAGE_PATH,
    FORM_LOGIN_BASE_CLASS,
    FORM_LOGIN_MOD_CLASS,
    FORM_LOGIN_EL_CLASS,
  } from '@constants';

  const { fadeIn, fadeOut } = useAnimationGSAP();
  const animateAuthForm = useState<boolean>('animateAuthForm', () => false);
  const userLogin = ref<string>('');
  const userPassword = ref<string>('');
  const message = ref<string>('');
  const formLoginRef = ref<HTMLElement | null>(null);

  const formClass = computed(() => [
    FORM_LOGIN_BASE_CLASS,
    {
      [FORM_LOGIN_MOD_CLASS.hide]: animateAuthForm.value,
    },
  ]);

  /** Вход на сайт. */
  const login = () => {
    message.value = 'Пока не работает';
  };
  /** Регистрация на сайте. */
  const registration = () => {
    animateAuthForm.value = true;

    fadeOut(formLoginRef.value, {
      onComplete: () => {
        navigateTo(PAGE_PATH.signup);
      },
    });
  };
  /** Напомнить пароль. */
  const remindPassword = () => {
    message.value = 'Это фиаско, братан!';
  };

  /** Вход на сайт без логина и пароля. */
  const loginForPoliteUsers = () => {
    if (userLogIn()) {
      navigateTo(PAGE_PATH.index);
    }
  };

  onMounted(() => {
    if (animateAuthForm.value) {
      fadeIn(formLoginRef.value, {
        onComplete: () => {
          animateAuthForm.value = false;
        },
      });
    }
  });
</script>

<template>
  <div
    :class="formClass"
    ref="formLoginRef"
  >
    <FormBase
      :class="FORM_LOGIN_EL_CLASS.form"
      :title="FORM_TITLE.login"
      :message
      message-type="error"
    >
      <template #body>
        <VscInputText
          id="login"
          :class="FORM_LOGIN_EL_CLASS.item"
          label="Логин"
          label-style="column"
          v-model="userLogin"
        />
        <VscInputPassword
          id="password"
          :class="FORM_LOGIN_EL_CLASS.item"
          label="Пароль"
          label-style="column"
          :required="false"
          v-model="userPassword"
        />
      </template>

      <template #buttons>
        <VscButton
          :class="FORM_LOGIN_EL_CLASS.buttonReminder"
          text="Я забыл пароль =("
          button-style="plain"
          @click="remindPassword"
        />
        <VscButton
          text="Войти"
          :elevated="true"
          @click="login"
        />
        <VscButton
          text="Регистрация"
          button-style="outline"
          :elevated="true"
          @click="registration"
        />
      </template>

      <template #extra>
        <VscButton
          text="А можно просто посмотреть?"
          button-style="plain"
          @click="loginForPoliteUsers"
        />
      </template>
    </FormBase>
  </div>
</template>

<style scoped lang="postcss">
  .form-login {
    --form-title: 1.5rem;

    box-shadow: var(--shadow);
    background-color: var(--white);
    display: flex;
    text-align: center;
    width: 20rem;
    margin: auto;

    @media (--bp-xl) {
      width: 33.33%;
      margin: 0;
    }

    &__form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin: auto;

      @media (--bp-xl) {
        width: 20rem;
      }
    }

    &__button-reminder,
    &__item {
      width: 100%;
    }

    :deep(.form__buttons button) {
      flex: 1 0 auto;
    }
  }
</style>
