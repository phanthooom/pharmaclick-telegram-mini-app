"use client";

import { useEffect, useMemo, useState } from "react";
import { formatLngLat, reverseGeocode, TASHKENT_CENTER, type LngLat } from "../lib/yandex-maps";
import { YandexPickerMap } from "./yandex-picker-map";

type SavedDeliveryAddress = {
    address: string;
    coords: LngLat;
};

type DeliverySheetProps = {
    open: boolean;
    onClose: () => void;
    onSaved?: (payload: SavedDeliveryAddress) => void;
};

const STORAGE_KEY = "pharmaclick_delivery_address_v1";

function getShortAddress(address: string) {
    const parts = address.split(",").map((item) => item.trim()).filter(Boolean);
    return parts.slice(0, 2).join(", ") || "Ташкент";
}

export function DeliverySheet({
    open,
    onClose,
    onSaved,
}: DeliverySheetProps) {
    const [isFullscreenMapOpen, setIsFullscreenMapOpen] = useState(false);
    const [coords, setCoords] = useState<LngLat>(TASHKENT_CENTER);
    const [address, setAddress] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [isResolving, setIsResolving] = useState(false);
    const [isLocating, setIsLocating] = useState(false);

    useEffect(() => {
        if (!open) return;

        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw) as SavedDeliveryAddress;
                if (parsed?.coords && parsed?.address) {
                    setCoords(parsed.coords);
                    setAddress(parsed.address);
                    setInputValue(parsed.address);
                    return;
                }
            }
        } catch { }

        void resolveAddress(TASHKENT_CENTER);
    }, [open]);

    useEffect(() => {
        if (!open || !isFullscreenMapOpen) return;

        const timeout = window.setTimeout(() => {
            void resolveAddress(coords);
        }, 380);

        return () => {
            window.clearTimeout(timeout);
        };
    }, [coords, isFullscreenMapOpen, open]);

    useEffect(() => {
        if (!open) {
            setIsFullscreenMapOpen(false);
        }
    }, [open]);

    const shortAddress = useMemo(() => getShortAddress(inputValue || address), [inputValue, address]);

    async function resolveAddress(nextCoords: LngLat) {
        setIsResolving(true);
        try {
            const resolved = await reverseGeocode(nextCoords, "ru_RU");
            setAddress(resolved);
            setInputValue((current) => (current.trim().length ? current : resolved));
        } catch (error) {
            console.error("Failed to reverse geocode:", error);
            const fallback = formatLngLat(nextCoords);
            setAddress(fallback);
            setInputValue((current) => (current.trim().length ? current : fallback));
        } finally {
            setIsResolving(false);
        }
    }

    function handleMapCenterSettled(nextCoords: LngLat) {
        setCoords(nextCoords);
    }

    async function handleLocateMe() {
        if (!navigator.geolocation) {
            alert("Геолокация не поддерживается на этом устройстве.");
            return;
        }

        setIsLocating(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const nextCoords: LngLat = [
                    position.coords.longitude,
                    position.coords.latitude,
                ];
                setCoords(nextCoords);
                await resolveAddress(nextCoords);
                setIsLocating(false);
            },
            (error) => {
                console.error(error);
                setIsLocating(false);
                alert("Не удалось определить местоположение.");
            },
            {
                enableHighAccuracy: true,
                timeout: 12000,
                maximumAge: 0,
            }
        );
    }

    function handleSaveAddress() {
        const payload: SavedDeliveryAddress = {
            coords,
            address: inputValue.trim() || address || formatLngLat(coords),
        };

        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        onSaved?.(payload);
        onClose();
    }

    return (
        <>
            <div
                className={`fixed inset-0 z-40 bg-[rgba(19,14,28,0.34)] backdrop-blur-[2px] transition-all duration-300 ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                    }`}
                onClick={onClose}
            />

            <div
                className={`fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ${open ? "translate-y-0" : "translate-y-full"
                    }`}
            >
                <div className="mx-auto w-full max-w-[430px]">
                    <div
                        className="rounded-t-[34px] bg-[rgba(255,255,255,0.96)] px-4 pb-[calc(max(18px,var(--content-safe-bottom))+18px)] pt-3 shadow-[0_-18px_50px_rgba(0,0,0,0.12)] backdrop-blur-[26px]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-[rgba(0,0,0,0.12)]" />

                        <div className="mb-4 flex items-start justify-between gap-3">
                            <div>
                                <h3 className="text-[26px] font-bold tracking-[-0.03em] text-[var(--text-primary)]">
                                    Адрес доставки
                                </h3>
                                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                    Выберите точку на карте или введите адрес вручную
                                </p>
                            </div>

                            <button
                                onClick={onClose}
                                className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface-muted)] text-[24px] text-[var(--text-secondary)]"
                                aria-label="Закрыть"
                            >
                                ×
                            </button>
                        </div>

                        <button
                            onClick={handleLocateMe}
                            className="mb-4 flex w-full items-center gap-3 rounded-[24px] border border-[var(--border-soft)] bg-white px-4 py-4 text-left shadow-[0_6px_18px_rgba(17,12,28,0.04)]"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-primary-soft)] text-xl">
                                📍
                            </div>
                            <div className="min-w-0">
                                <div className="text-[17px] font-semibold text-[var(--text-primary)]">
                                    {isLocating ? "Определяем местоположение..." : "Определить моё местоположение"}
                                </div>
                                <div className="mt-1 text-sm text-[var(--text-secondary)]">
                                    Используем GPS вашего устройства
                                </div>
                            </div>
                        </button>

                        <div className="relative mb-4">
                            <YandexPickerMap
                                center={coords}
                                zoom={15}
                                interactive={false}
                                showZoomControl={false}
                                className="h-[220px] w-full"
                            />

                            <button
                                onClick={() => setIsFullscreenMapOpen(true)}
                                className="absolute left-3 right-3 top-3 z-10 rounded-[20px] bg-[rgba(255,255,255,0.94)] px-4 py-3 text-left shadow-[0_10px_24px_rgba(18,14,29,0.12)] backdrop-blur-[18px]"
                            >
                                <div className="text-[15px] font-semibold text-[var(--text-primary)]">
                                    Открыть карту на весь экран
                                </div>
                                <div className="mt-1 text-sm text-[var(--text-secondary)]">
                                    Переместите карту и выберите точку доставки
                                </div>
                            </button>
                        </div>

                        <div className="mb-2 text-sm text-[var(--text-secondary)]">
                            Или введите адрес вручную
                        </div>

                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            rows={4}
                            placeholder="Например: Muminov ko'chasi, 7/1, Feruza, Toshkent"
                            className="mb-4 w-full resize-none rounded-[24px] border border-[var(--border-soft)] bg-white px-4 py-4 text-[17px] leading-8 text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)]"
                        />

                        <div className="mb-4 rounded-[20px] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                            {isResolving ? "Определяем адрес по карте..." : shortAddress}
                        </div>

                        <button
                            onClick={handleSaveAddress}
                            className="w-full rounded-[24px] bg-[var(--text-primary)] px-5 py-4 text-[17px] font-semibold text-white shadow-[0_16px_28px_rgba(17,12,28,0.18)]"
                        >
                            Сохранить адрес
                        </button>
                    </div>
                </div>
            </div>

            {isFullscreenMapOpen ? (
                <div className="fixed inset-0 z-[70] bg-white">
                    <div className="absolute inset-0">
                        <YandexPickerMap
                            center={coords}
                            zoom={16}
                            interactive={true}
                            showZoomControl={true}
                            onCenterSettled={handleMapCenterSettled}
                            className="h-full w-full rounded-none"
                        />
                    </div>

                    <div
                        className="absolute left-0 right-0 top-0 z-10 px-4"
                        style={{
                            paddingTop: "calc(var(--content-safe-top) + 22px)",
                        }}
                    >
                        <div className="rounded-[24px] bg-[rgba(255,255,255,0.96)] px-4 py-3 shadow-[0_14px_28px_rgba(17,12,28,0.14)] backdrop-blur-[24px]">
                            <div className="mb-2 flex items-center gap-3">
                                <button
                                    onClick={() => setIsFullscreenMapOpen(false)}
                                    className="flex h-11 items-center justify-center rounded-full bg-[var(--surface-muted)] px-4 text-[15px] font-medium text-[var(--text-secondary)]"
                                >
                                    ✕ Закрыть
                                </button>

                                <div className="ml-auto rounded-full bg-[var(--surface-muted)] px-3 py-2 text-xs text-[var(--text-secondary)]">
                                    {formatLngLat(coords)}
                                </div>
                            </div>

                            <div className="text-[16px] font-semibold text-[var(--text-primary)]">
                                {isResolving ? "Определяем адрес..." : address || "Выберите точку на карте"}
                            </div>
                        </div>
                    </div>

                    <div
                        className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-[calc(max(14px,var(--content-safe-bottom))+14px)]"
                    >
                        <div className="mx-auto w-full max-w-[430px]">
                            <button
                                onClick={() => {
                                    setIsFullscreenMapOpen(false);
                                    if (!inputValue.trim()) {
                                        setInputValue(address || formatLngLat(coords));
                                    }
                                }}
                                className="w-full rounded-[26px] bg-[rgba(34,34,34,0.88)] px-5 py-5 text-[18px] font-medium text-white shadow-[0_18px_40px_rgba(0,0,0,0.24)] backdrop-blur-[20px]"
                            >
                                Manzilni saqlash
                            </button>

                            <div className="mt-3 flex items-center justify-between gap-3 px-1 text-sm">
                                <a
                                    href={`https://yandex.uz/maps/?ll=${coords[0]},${coords[1]}&z=16`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-full bg-[rgba(255,255,255,0.92)] px-4 py-2 text-[var(--text-primary)] shadow-[0_8px_18px_rgba(17,12,28,0.12)] backdrop-blur-[20px]"
                                >
                                    📍 Открыть в Yandex Maps
                                </a>

                                <div className="rounded-full bg-[rgba(255,255,255,0.92)] px-4 py-2 text-[var(--text-secondary)] shadow-[0_8px_18px_rgba(17,12,28,0.12)] backdrop-blur-[20px]">
                                    {shortAddress}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}