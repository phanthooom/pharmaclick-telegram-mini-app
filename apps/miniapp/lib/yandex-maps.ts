export type LngLat = [number, number];

declare global {
    interface Window {
        ymaps3?: any;
    }
}

export const TASHKENT_CENTER: LngLat = [69.2401, 41.2995];

let reactifiedPromise: Promise<any> | null = null;

export async function getReactifiedYandexMaps() {
    if (typeof window === "undefined") {
        throw new Error("Yandex Maps can only be used in the browser.");
    }

    if (!window.ymaps3) {
        throw new Error("Yandex Maps script is not loaded.");
    }

    if (!reactifiedPromise) {
        reactifiedPromise = (async () => {
            const React = await import("react");
            const ReactDOM = await import("react-dom");

            await window.ymaps3.ready;

            window.ymaps3.import.registerCdn?.(
                "https://cdn.jsdelivr.net/npm/{package}",
                ["@yandex/ymaps3-default-ui-theme@0.0"]
            );

            const [{ reactify }, defaultUiTheme] = await Promise.all([
                window.ymaps3.import("@yandex/ymaps3-reactify"),
                window.ymaps3.import("@yandex/ymaps3-default-ui-theme"),
            ]);

            const bound = reactify.bindTo(React, ReactDOM);

            return {
                ...bound.module(window.ymaps3),
                ...bound.module(defaultUiTheme),
            };
        })();
    }

    return reactifiedPromise;
}

export function formatLngLat(coords: LngLat) {
    return `${coords[1].toFixed(5)}, ${coords[0].toFixed(5)}`;
}

export async function reverseGeocode(
    coords: LngLat,
    lang: "ru_RU" | "en_RU" = "ru_RU"
) {
    const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;

    if (!apiKey) {
        return formatLngLat(coords);
    }

    const url = new URL("https://geocode-maps.yandex.ru/v1");
    url.searchParams.set("apikey", apiKey);
    url.searchParams.set("geocode", `${coords[0]},${coords[1]}`);
    url.searchParams.set("lang", lang);
    url.searchParams.set("format", "json");
    url.searchParams.set("results", "1");
    url.searchParams.set("kind", "house");

    const response = await fetch(url.toString(), {
        method: "GET",
        cache: "no-store",
    });

    if (!response.ok) {
        return formatLngLat(coords);
    }

    const data = await response.json();

    const item =
        data?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject;

    const text =
        item?.metaDataProperty?.GeocoderMetaData?.text ||
        item?.name ||
        formatLngLat(coords);

    return text;
}