export type TelegramWebApp = {
  ready?: () => void;
  expand?: () => void;
  colorScheme?: "light" | "dark";
  initDataUnsafe?: {
    user?: {
      id?: number;
      first_name?: string;
      last_name?: string;
      username?: string;
      language_code?: string;
    };
    start_param?: string;
  };
  themeParams?: Record<string, string>;
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

export function initTelegramWebApp(): TelegramWebApp | null {
  const tg = getTelegramWebApp();

  if (!tg) return null;

  tg.ready?.();
  tg.expand?.();

  const theme = tg.themeParams ?? {};
  const root = document.documentElement;

  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(`--tg-${key}`, value);
  });

  return tg;
}
