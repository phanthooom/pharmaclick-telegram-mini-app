"use client";

import { useEffect } from "react";
import { initTelegramWebApp } from "../lib/telegram";

export function TelegramProvider() {
    useEffect(() => {
        const tg = initTelegramWebApp();
        if (!tg) return;

        const applyInsets = () => {
            const root = document.documentElement;

            const safe = tg.safeAreaInset ?? { top: 0, right: 0, bottom: 0, left: 0 };
            const content = tg.contentSafeAreaInset ?? safe;

            root.style.setProperty("--safe-top", `${safe.top ?? 0}px`);
            root.style.setProperty("--safe-right", `${safe.right ?? 0}px`);
            root.style.setProperty("--safe-bottom", `${safe.bottom ?? 0}px`);
            root.style.setProperty("--safe-left", `${safe.left ?? 0}px`);

            root.style.setProperty("--content-safe-top", `${content.top ?? 0}px`);
            root.style.setProperty("--content-safe-right", `${content.right ?? 0}px`);
            root.style.setProperty("--content-safe-bottom", `${content.bottom ?? 0}px`);
            root.style.setProperty("--content-safe-left", `${content.left ?? 0}px`);
        };

        applyInsets();

        const onSafeAreaChanged = () => applyInsets();
        const onContentSafeAreaChanged = () => applyInsets();

        tg.onEvent?.("safeAreaChanged", onSafeAreaChanged);
        tg.onEvent?.("contentSafeAreaChanged", onContentSafeAreaChanged);

        return () => {
            tg.offEvent?.("safeAreaChanged", onSafeAreaChanged);
            tg.offEvent?.("contentSafeAreaChanged", onContentSafeAreaChanged);
        };
    }, []);

    return null;
}