<script setup lang="ts">
  import { FORM_CLASS, MESSAGE_TYPE } from '@constants';
  import type { IFormBase, TFormMesssageClassArray } from '@types';

  const props = defineProps<IFormBase>();

  /** Список классов для сообщения. */
  const messageClasses = computed<TFormMesssageClassArray>(() => {
    const classes: TFormMesssageClassArray = [FORM_CLASS.message];

    if (props.messageType && props.messageType !== MESSAGE_TYPE.default) {
      classes.push(`${FORM_CLASS.message}_${props.messageType}`);
    }

    return classes;
  });
</script>

<template>
  <form
    class="form"
    method="post"
  >
    <div class="form__header">
      <h2
        v-if="title"
        class="form__title"
      >
        {{ title }}
      </h2>
      <template v-else-if="$slots.header">
        <slot name="header"></slot>
      </template>
    </div>
    <div
      class="form__body"
      v-if="$slots.body"
    >
      <slot name="body"></slot>
    </div>
    <div :class="messageClasses">{{ message }}</div>
    <div
      class="form__buttons"
      v-if="$slots.buttons"
    >
      <slot name="buttons"></slot>
    </div>
    <div
      class="form__extra"
      v-if="$slots.extra"
    >
      <slot name="extra"></slot>
    </div>
  </form>
</template>

<style lang="postcss">
  .form {
    display: flex;
    flex-direction: column;
    gap: var(--indent);
    padding: var(--indent);

    &__title {
      font-size: var(--form-title, 1.75rem);
    }

    &__body {
      display: flex;
      flex-direction: column;
      gap: var(--indent);
    }

    &__message {
      min-height: 1.5rem;

      &_error {
        color: var(--error);
      }

      &_warning {
        color: var(--warning);
      }

      &_success {
        color: var(--success);
      }
    }

    &__buttons {
      display: flex;
      gap: var(--indent);
      flex-wrap: wrap;
      justify-content: center;
    }
  }
</style>
