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
  themeColor: "#eef6f3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
        <TelegramProvider />
        {children}
      </body>
    </html>
  );
}