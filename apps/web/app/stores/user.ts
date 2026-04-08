import type { IUser } from '@types';

export const useUserStore = defineStore('user', () => {
  const user = ref<IUser | null>(null);

  /** Инициалы для аватарки. */
  const initialsForAvatar = computed(() => {
    const username = user.value?.name;

    if (!username) {
      return '';
    }

    return username
      .split(' ')
      .map((word) => word[0]?.toUpperCase())
      .join('');
  });

  /** Запрос данных пользователя. */
  async function updateUserStore() {
    user.value = {
      id: 'abcd123',
      name: 'Дмитрий Колготин',
      avatar: '',
    };
  }

  /** Очистка данных пользователя. */
  function clearUserStore() {
    user.value = null;
  }

  return {
    user,
    initialsForAvatar,
    updateUserStore,
    clearUserStore,
  };
});
