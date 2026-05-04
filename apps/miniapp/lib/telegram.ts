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

/**
 * Re-apply expanded + fullscreen (e.g. after viewport changes).
 * Same sequence as croissant-delivery-bot mini-app shell; do not call ready() here.
 */
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

/** Matches phanthooom/croissant-delivery-bot: ready → expand → requestFullscreen → disable swipes. */
export function initTelegramWebApp(): TelegramWebApp | null {
  const tg = getTelegramWebApp();
  if (!tg) return null;

  tg.ready?.();
  try {
    tg.expand?.();
  } catch {
    /* noop */
  }
  try {
    tg.requestFullscreen?.();
  } catch {
    /* noop */
  }
  tg.disableVerticalSwipes?.();
  tg.enableClosingConfirmation?.();

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