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
        <Script
          id="tg-viewport-bootstrap"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){function e(){var t=window.Telegram&&window.Telegram.WebApp;if(!t)return!1;try{t.expand()}catch(n){}try{t.requestFullscreen&&t.requestFullscreen()}catch(n){}try{t.ready()}catch(n){}return!0}if(!e()){var o=0,r=setInterval(function(){(e()||++o>100)&&clearInterval(r)},20)}})();`,
          }}
        />
        <TelegramProvider />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}