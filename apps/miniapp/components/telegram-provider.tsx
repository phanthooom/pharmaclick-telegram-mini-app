"use client";

import { useEffect } from "react";
import { ensureTelegramViewport, initTelegramWebApp } from "../lib/telegram";

function setCssVar(name: string, value: string) {
    document.documentElement.style.setProperty(name, value);
}

/** Same fallback as croissant mini-app shell (~Telegram header overdraw when insets are 0). */
const TELEGRAM_LEGACY_TOP_INSET_PX = 72;

function applyFallbackViewport() {
    const h = `${window.innerHeight}px`;
    const envTop = "env(safe-area-inset-top, 0px)";
    const envRight = "env(safe-area-inset-right, 0px)";
    const envBottom = "env(safe-area-inset-bottom, 0px)";
    const envLeft = "env(safe-area-inset-left, 0px)";

    setCssVar("--app-height", h);
    setCssVar("--tg-safe-top", envTop);
    setCssVar("--tg-safe-right", envRight);
    setCssVar("--tg-safe-bottom", envBottom);
    setCssVar("--tg-safe-left", envLeft);
    setCssVar("--tg-content-safe-top", envTop);
    setCssVar("--tg-content-safe-right", envRight);
    setCssVar("--tg-content-safe-bottom", envBottom);
    setCssVar("--tg-content-safe-left", envLeft);
    setCssVar("--tg-header-pad", envTop);
}

function applyTelegramInsets(tg: {
    safeAreaInset?: { top?: number; right?: number; bottom?: number; left?: number };
    contentSafeAreaInset?: { top?: number; right?: number; bottom?: number; left?: number };
    viewportStableHeight?: number;
    viewportHeight?: number;
    isFullscreen?: boolean;
}) {
    const safe = tg.safeAreaInset ?? { top: 0, right: 0, bottom: 0, left: 0 };
    const content = tg.contentSafeAreaInset ?? { top: 0, right: 0, bottom: 0, left: 0 };

    const stableHeight =
        tg.viewportStableHeight ?? tg.viewportHeight ?? window.innerHeight;

    const px = (n: number | undefined) => `${Math.max(0, Number(n ?? 0))}px`;

    const cTop = Math.max(Number(content.top ?? 0), Number(safe.top ?? 0));
    const cRight = Math.max(Number(content.right ?? 0), Number(safe.right ?? 0));
    const cBottom = Math.max(Number(content.bottom ?? 0), Number(safe.bottom ?? 0));
    const cLeft = Math.max(Number(content.left ?? 0), Number(safe.left ?? 0));

    const inFullscreen = Boolean(tg.isFullscreen);
    const headerPadPx =
        cTop > 0 ? cTop : !inFullscreen ? TELEGRAM_LEGACY_TOP_INSET_PX : 0;

    setCssVar("--app-height", `${Math.max(1, stableHeight)}px`);

    setCssVar("--tg-safe-top", px(safe.top));
    setCssVar("--tg-safe-right", px(safe.right));
    setCssVar("--tg-safe-bottom", px(safe.bottom));
    setCssVar("--tg-safe-left", px(safe.left));

    setCssVar("--tg-content-safe-top", `${cTop}px`);
    setCssVar("--tg-content-safe-right", `${cRight}px`);
    setCssVar("--tg-content-safe-bottom", `${cBottom}px`);
    setCssVar("--tg-content-safe-left", `${cLeft}px`);

    setCssVar("--tg-header-pad", `${headerPadPx}px`);
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
            applyTelegramInsets(tg);
        };

        const onViewportChanged = () => {
            if (tg.isExpanded !== true) {
                ensureTelegramViewport(tg);
            }
            applyInsetsAndViewport();
        };

        const onSafeAreaChanged = () => {
            applyInsetsAndViewport();
        };

        const onContentSafeAreaChanged = () => {
            applyInsetsAndViewport();
        };

        const onFullscreenChanged = () => {
            applyInsetsAndViewport();
        };

        const onFullscreenFailed = () => {
            applyInsetsAndViewport();
        };

        const onResize = () => {
            ensureTelegramViewport(tg);
            applyInsetsAndViewport();
        };

        ensureTelegramViewport(tg);

        applyInsetsAndViewport();
        requestAnimationFrame(() => {
            ensureTelegramViewport(tg);
            applyInsetsAndViewport();
        });
        const expandTimers = [120, 400].map((ms) =>
            window.setTimeout(() => {
                ensureTelegramViewport(tg);
                applyInsetsAndViewport();
            }, ms),
        );

        tg.onEvent?.("viewportChanged", onViewportChanged);
        tg.onEvent?.("safeAreaChanged", onSafeAreaChanged);
        tg.onEvent?.("contentSafeAreaChanged", onContentSafeAreaChanged);
        tg.onEvent?.("fullscreenChanged", onFullscreenChanged);
        tg.onEvent?.("fullscreenFailed", onFullscreenFailed);

        window.addEventListener("resize", onResize);

        return () => {
            expandTimers.forEach((id) => clearTimeout(id));
            tg.offEvent?.("viewportChanged", onViewportChanged);
            tg.offEvent?.("safeAreaChanged", onSafeAreaChanged);
            tg.offEvent?.("contentSafeAreaChanged", onContentSafeAreaChanged);
            tg.offEvent?.("fullscreenChanged", onFullscreenChanged);
            tg.offEvent?.("fullscreenFailed", onFullscreenFailed);

            window.removeEventListener("resize", onResize);
        };
    }, []);

    return null;
}