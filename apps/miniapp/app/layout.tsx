import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { TelegramProvider } from "../components/telegram-provider";

export const metadata: Metadata = {
  title: "PharmaClick Mini App",
  description: "Telegram Mini App for pharmacy network",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fffafe",
};

const yandexApiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
        {yandexApiKey ? (
          <Script
            src={`https://api-maps.yandex.ru/v3/?apikey=${yandexApiKey}&lang=ru_RU`}
            strategy="beforeInteractive"
          />
        ) : null}
        <TelegramProvider />
        {children}
      </body>
    </html>
  );
}