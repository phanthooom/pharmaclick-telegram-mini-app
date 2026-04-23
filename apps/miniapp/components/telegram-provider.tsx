"use client";

import { useEffect } from "react";
import { initTelegramWebApp } from "../lib/telegram";

function setCssVar(name: string, value: string) {
    document.documentElement.style.setProperty(name, value);
}

function applyFallbackViewport() {
    setCssVar("--app-height", `${window.innerHeight}px`);
    setCssVar("--safe-top", "0px");
    setCssVar("--safe-right", "0px");
    setCssVar("--safe-bottom", "0px");
    setCssVar("--safe-left", "0px");
    setCssVar("--content-safe-top", "0px");
    setCssVar("--content-safe-right", "0px");
    setCssVar("--content-safe-bottom", "0px");
    setCssVar("--content-safe-left", "0px");
}

export function TelegramProvider() {
    useEffect(() => {
        const tg = initTelegramWebApp() as any;

        if (!tg) {
            applyFallbackViewport();
            window.addEventListener("resize", applyFallbackViewport);
            return () => {
                window.removeEventListener("resize", applyFallbackViewport);
            };
        }

        const applyInsetsAndViewport = () => {
            const safe = tg.safeAreaInset ?? { top: 0, right: 0, bottom: 0, left: 0 };
            const content = tg.contentSafeAreaInset ?? safe;
            const stableHeight =
                tg.viewportStableHeight ?? tg.viewportHeight ?? window.innerHeight;

            setCssVar("--app-height", `${stableHeight}px`);

            setCssVar("--safe-top", `${safe.top ?? 0}px`);
            setCssVar("--safe-right", `${safe.right ?? 0}px`);
            setCssVar("--safe-bottom", `${safe.bottom ?? 0}px`);
            setCssVar("--safe-left", `${safe.left ?? 0}px`);

            setCssVar("--content-safe-top", `${content.top ?? 0}px`);
            setCssVar("--content-safe-right", `${content.right ?? 0}px`);
            setCssVar("--content-safe-bottom", `${content.bottom ?? 0}px`);
            setCssVar("--content-safe-left", `${content.left ?? 0}px`);
        };

        try {
            tg.ready?.();
            tg.expand?.();
            tg.disableVerticalSwipes?.();

            if (tg.isVersionAtLeast?.("8.0") && !tg.isFullscreen) {
                try {
                    tg.requestFullscreen?.();
                } catch {
                    // fallback: expand() уже вызван
                }
            }
        } catch {
            // no-op
        }

        applyInsetsAndViewport();

        const onViewportChanged = () => applyInsetsAndViewport();
        const onSafeAreaChanged = () => applyInsetsAndViewport();
        const onContentSafeAreaChanged = () => applyInsetsAndViewport();
        const onResize = () => applyInsetsAndViewport();

        tg.onEvent?.("viewportChanged", onViewportChanged);
        tg.onEvent?.("safeAreaChanged", onSafeAreaChanged);
        tg.onEvent?.("contentSafeAreaChanged", onContentSafeAreaChanged);
        window.addEventListener("resize", onResize);

        return () => {
            tg.offEvent?.("viewportChanged", onViewportChanged);
            tg.offEvent?.("safeAreaChanged", onSafeAreaChanged);
            tg.offEvent?.("contentSafeAreaChanged", onContentSafeAreaChanged);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return null;
}