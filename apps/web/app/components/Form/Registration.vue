<script setup lang="ts">
  import {
    FORM_TITLE,
    PAGE_PATH,
    FORM_REGISTRATION_CLASS,
    FORM_REGISTRATION_BASE_CLASS_SELECTOR,
  } from '@constants';

  const { fadeIn, fadeOut } = useAnimationGSAP();
  const animateAuthForm = useState<boolean>('animateAuthForm', () => false);
  const userLogin = ref<string>('');
  const userPassword = ref<string>('');
  const userPasswordRepeat = ref<string>('');
  const message = ref<string>('');

  const formClass = computed(() => [
    FORM_REGISTRATION_CLASS.base,
    {
      [FORM_REGISTRATION_CLASS.hide]: animateAuthForm.value,
    },
  ]);

  /** Вход на сайт. */
  const login = () => {
    animateAuthForm.value = true;

    fadeOut(FORM_REGISTRATION_BASE_CLASS_SELECTOR, {
      onComplete: () => {
        navigateTo(PAGE_PATH.login);
      },
    });
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

  onMounted(() => {
    if (animateAuthForm.value) {
      fadeIn(FORM_REGISTRATION_BASE_CLASS_SELECTOR, {
        onComplete: () => {
          animateAuthForm.value = false;
        },
      });
    }
  });
</script>

<template>
  <FormBase
    :class="formClass"
    :title="FORM_TITLE.registration"
    :message
    message-type="error"
  >
    <template #body>
      <VscInputText
        id="login"
        :class="FORM_REGISTRATION_CLASS.item"
        label="Электронная почта"
        label-style="column"
        v-model="userLogin"
      />
      <VscInputPassword
        id="password"
        :class="FORM_REGISTRATION_CLASS.item"
        label="Пароль"
        label-style="column"
        :required="false"
        v-model="userPassword"
      />
      <VscInputPassword
        id="passwordRepeat"
        :class="FORM_REGISTRATION_CLASS.item"
        label="Повторите пароль"
        label-style="column"
        :required="false"
        v-model="userPasswordRepeat"
      />
    </template>

    <template #buttons>
      <div :class="FORM_REGISTRATION_CLASS.buttons">
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

    &_hide {
      opacity: 0;
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
