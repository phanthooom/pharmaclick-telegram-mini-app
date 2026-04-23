"use client";

import { useCallback, useEffect, useState } from "react";
import { getReactifiedYandexMaps, type LngLat } from "../lib/yandex-maps";

type YandexPickerMapProps = {
    center: LngLat;
    zoom?: number;
    interactive?: boolean;
    className?: string;
    onCenterSettled?: (coords: LngLat) => void;
    showZoomControl?: boolean;
};

export function YandexPickerMap({
    center,
    zoom = 15,
    interactive = true,
    className = "",
    onCenterSettled,
    showZoomControl = true,
}: YandexPickerMapProps) {
    const [api, setApi] = useState<any>(null);
    const [location, setLocation] = useState({
        center,
        zoom,
    });

    useEffect(() => {
        setLocation((prev) => ({
            ...prev,
            center,
            zoom,
        }));
    }, [center, zoom]);

    useEffect(() => {
        let cancelled = false;

        getReactifiedYandexMaps()
            .then((result) => {
                if (!cancelled) {
                    setApi(result);
                }
            })
            .catch((error) => {
                console.error("Failed to initialize Yandex Maps:", error);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    const handleUpdate = useCallback(
        (object: any) => {
            const nextCenter = object?.location?.center;

            if (Array.isArray(nextCenter) && nextCenter.length === 2) {
                const normalized: LngLat = [nextCenter[0], nextCenter[1]];
                setLocation((prev) => ({
                    ...prev,
                    center: normalized,
                }));

                if (!object?.mapInAction) {
                    onCenterSettled?.(normalized);
                }
            }
        },
        [onCenterSettled]
    );

    const handleActionEnd = useCallback(
        (object: any) => {
            const nextCenter = object?.location?.center;

            if (Array.isArray(nextCenter) && nextCenter.length === 2) {
                onCenterSettled?.([nextCenter[0], nextCenter[1]]);
            }
        },
        [onCenterSettled]
    );

    if (!api) {
        return (
            <div
                className={`overflow-hidden rounded-[28px] bg-[var(--surface-muted)] ${className}`}
            >
                <div className="h-full w-full animate-pulse bg-[linear-gradient(90deg,#f7eef5_0%,#fff8fc_50%,#f7eef5_100%)]" />
            </div>
        );
    }

    const {
        YMap,
        YMapListener,
        YMapControls,
        YMapDefaultSchemeLayer,
        YMapDefaultFeaturesLayer,
        YMapZoomControl,
    } = api;

    return (
        <div className={`relative overflow-hidden rounded-[28px] ${className}`}>
            <YMap location={location} mode="vector">
                <YMapDefaultSchemeLayer />
                <YMapDefaultFeaturesLayer />
                {interactive ? (
                    <YMapListener onUpdate={handleUpdate} onActionEnd={handleActionEnd} />
                ) : null}

                {showZoomControl ? (
                    <YMapControls position="right">
                        <YMapZoomControl />
                    </YMapControls>
                ) : null}
            </YMap>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="relative flex flex-col items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-[#151515] text-white shadow-[0_18px_35px_rgba(0,0,0,0.24)]">
                        <span className="text-[22px]">📍</span>
                    </div>
                    <div className="-mt-1 h-4 w-[3px] rounded-full bg-[#151515]" />
                    <div className="h-4 w-4 rounded-full border-[3px] border-white bg-[var(--brand-primary)] shadow-[0_6px_18px_rgba(198,10,143,0.35)]" />
                </div>
            </div>
        </div>
    );
}