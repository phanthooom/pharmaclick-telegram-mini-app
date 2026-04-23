import "./globals.css";
import type { Metadata, Viewport } from "next";
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
        <TelegramProvider />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}