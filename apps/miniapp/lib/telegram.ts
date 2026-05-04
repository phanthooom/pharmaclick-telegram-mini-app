export type Insets = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type TelegramWebAppUser = {
  id?: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
};

export type TelegramWebApp = {
  ready?: () => void;
  expand?: () => void;
  requestFullscreen?: () => void;
  exitFullscreen?: () => void;
  disableVerticalSwipes?: () => void;
  enableClosingConfirmation?: () => void;
  setHeaderColor?: (color: string) => void;
  setBackgroundColor?: (color: string) => void;
  colorScheme?: "light" | "dark";
  /** True when the Mini App occupies the maximum height (not the compact bottom sheet). */
  isExpanded?: boolean;
  isFullscreen?: boolean;
  viewportHeight?: number;
  viewportStableHeight?: number;
  safeAreaInset?: Insets;
  contentSafeAreaInset?: Insets;
  initDataUnsafe?: {
    user?: TelegramWebAppUser;
    start_param?: string;
  };
  themeParams?: Record<string, string>;
  onEvent?: (event: string, cb: () => void) => void;
  offEvent?: (event: string, cb: () => void) => void;
};

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

export function getTelegramWebApp(): TelegramWebApp | null {
  if (typeof window === "undefined") return null;
  return window.Telegram?.WebApp ?? null;
}

export function isTelegramEnvironment() {
  return Boolean(getTelegramWebApp());
}

/** Expand + optional fullscreen; safe to call many times. */
export function ensureTelegramViewport(tg: TelegramWebApp | null | undefined) {
  if (!tg) return;
  try {
    tg.expand?.();
  } catch {
    /* noop */
  }
  try {
    tg.requestFullscreen?.();
  } catch {
    /* unsupported or not yet allowed */
  }
}

export function initTelegramWebApp(): TelegramWebApp | null {
  const tg = getTelegramWebApp();
  if (!tg) return null;

  // expand() must run before ready() so Telegram opens the sheet at max height first
  ensureTelegramViewport(tg);
  tg.disableVerticalSwipes?.();
  tg.enableClosingConfirmation?.();
  tg.ready?.();

  const root = document.documentElement;
  const theme = tg.themeParams ?? {};

  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(`--tg-${key}`, value);
  });

  root.dataset.tg = "true";
  root.dataset.tgScheme = tg.colorScheme ?? "light";

  tg.setHeaderColor?.("#ffffff");
  tg.setBackgroundColor?.("#eef6f3");

  return tg;
}