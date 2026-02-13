import { PATH_IMAGE_AUTH, EXTENSION } from '~/constants';

type TWebpExtension = typeof EXTENSION.webp;
type TImagePath = typeof PATH_IMAGE_AUTH;

/** Путь к файлу для desktop. */
export type TDesktopAuthImagePath = `${TImagePath}desktop/${number}.${TWebpExtension}`;

/** Путь к файлу для tablet. */
export type TTabletAuthImagePath = `${TImagePath}tablet/${number}.${TWebpExtension}`;
