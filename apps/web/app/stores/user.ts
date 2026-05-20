import type { IUser } from '@types';

export const useUserStore = defineStore('user', () => {
  const user = ref<IUser | null>(null);

  /** Полное имя пользователя. */
  const userFullName = computed(() =>
    `${user.value?.firstName || ''} ${user.value?.lastName || ''}`.trim(),
  );

  /** Инициалы для аватарки. */
  const initialsForAvatar = computed(() => {
    const username = userFullName.value;

    if (!username) {
      return '';
    }

    return username
      .split(' ')
      .map((word) => word[0]?.toUpperCase())
      .join('');
  });

  /** Обновление данных о пользователе. */
  function updateUserData(newUserData: IUser) {
    user.value = newUserData;
  }

  /** Очистка данных пользователя. */
  function clearUserData() {
    user.value = null;
  }

  return {
    user,
    userFullName,
    initialsForAvatar,
    updateUserData,
    clearUserData,
  };
});
