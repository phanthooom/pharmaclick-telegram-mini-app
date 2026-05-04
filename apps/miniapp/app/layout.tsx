import "./globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { TelegramProvider } from "../components/telegram-provider";
import AppShell from "../components/app-shell";

export const metadata: Metadata = {
  title: "PharmaClick",
  description: "Telegram mini app for pharmacy delivery",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

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
        <TelegramProvider />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}