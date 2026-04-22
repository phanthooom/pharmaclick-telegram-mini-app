import Link from "next/link";

export default function NotFoundPage() {
    return (
        <main className="pc-shell flex min-h-[100dvh] items-center justify-center px-4">
            <div className="pc-card-strong w-full max-w-md rounded-[28px] p-6 text-center">
                <div className="text-6xl">🔎</div>
                <h1 className="mt-4 text-[30px] font-bold tracking-[-0.04em]">
                    Страница не найдена
                </h1>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    Такой страницы нет или она была перемещена.
                </p>
                <Link
                    href="/"
                    className="mt-6 inline-flex rounded-[22px] px-5 py-3 text-sm font-semibold pc-pill-button"
                >
                    Вернуться на главную
                </Link>
            </div>
        </main>
    );
}