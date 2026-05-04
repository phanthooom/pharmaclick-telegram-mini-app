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
        {/*
          Early bootstrap: runs synchronously as the browser parses <body>,
          after beforeInteractive scripts (telegram-web-app.js) have already executed.
          This prevents the compact bottom-sheet flash before React hydrates.
          TelegramProvider's useEffect still runs later for CSS vars + event subscriptions.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var wa=window.Telegram&&window.Telegram.WebApp;if(!wa)return;if(wa.ready)wa.ready();if(wa.expand)wa.expand();try{if(wa.requestFullscreen)wa.requestFullscreen();}catch(e){}if(wa.disableVerticalSwipes)wa.disableVerticalSwipes();}catch(e){}})();`,
          }}
        />
        <TelegramProvider />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}