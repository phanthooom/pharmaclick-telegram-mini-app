import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon({ children, ...props }: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            shapeRendering="geometricPrecision"
            aria-hidden="true"
            {...props}
        >
            {children}
        </svg>
    );
}

export function HomeIcon(props: IconProps) {
    return (
        <BaseIcon {...props}>
            <path d="M3 10.5L12 3l9 7.5" />
            <path d="M5.5 9.5V20h13V9.5" />
        </BaseIcon>
    );
}

export function GridIcon(props: IconProps) {
    return (
        <BaseIcon {...props}>
            <rect x="4" y="4" width="6.5" height="6.5" rx="1.2" />
            <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.2" />
            <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.2" />
            <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.2" />
        </BaseIcon>
    );
}

export function CartIcon(props: IconProps) {
    return (
        <BaseIcon {...props}>
            <circle cx="9" cy="19" r="1.4" />
            <circle cx="17.3" cy="19" r="1.4" />
            <path d="M3.5 5h2l2.2 10h10l2-7.5H7.2" />
        </BaseIcon>
    );
}

export function UserIcon(props: IconProps) {
    return (
        <BaseIcon {...props}>
            <circle cx="12" cy="8" r="3.2" />
            <path d="M5 20c1.6-3 4-4.6 7-4.6s5.4 1.6 7 4.6" />
        </BaseIcon>
    );
}

export function SearchIcon(props: IconProps) {
    return (
        <BaseIcon {...props}>
            <circle cx="11" cy="11" r="6" />
            <path d="M16 16l4 4" />
        </BaseIcon>
    );
}

export function ArrowLeftIcon(props: IconProps) {
    return (
        <BaseIcon {...props}>
            <path d="M15 5l-6 7 6 7" />
        </BaseIcon>
    );
}

export function PackageIcon(props: IconProps) {
    return (
        <BaseIcon {...props}>
            <path d="M12 3l8 4.4-8 4.4L4 7.4 12 3z" />
            <path d="M4 7.4V17l8 4 8-4V7.4" />
            <path d="M12 11.8V21" />
        </BaseIcon>
    );
}

export function HeartIcon(props: IconProps) {
    return (
        <BaseIcon {...props}>
            <path d="M20 8.2c0 5.1-8 10.3-8 10.3S4 13.3 4 8.2a4.1 4.1 0 017.1-2.8l.9 1 .9-1A4.1 4.1 0 0120 8.2z" />
        </BaseIcon>
    );
}

export function PinIcon(props: IconProps) {
    return (
        <BaseIcon {...props}>
            <path d="M12 21s6-5.3 6-10a6 6 0 10-12 0c0 4.7 6 10 6 10z" />
            <circle cx="12" cy="11" r="2.2" />
        </BaseIcon>
    );
}

export function MessageIcon(props: IconProps) {
    return (
        <BaseIcon {...props}>
            <path d="M4 6.5A2.5 2.5 0 016.5 4h11A2.5 2.5 0 0120 6.5v7a2.5 2.5 0 01-2.5 2.5H9l-5 4v-4A2.5 2.5 0 014 13.5v-7z" />
        </BaseIcon>
    );
}

export function PillIcon(props: IconProps) {
    return (
        <BaseIcon {...props}>
            <path d="M8.5 5.5a4.2 4.2 0 016 0l3 3a4.2 4.2 0 010 6l-3 3a4.2 4.2 0 01-6 0l-3-3a4.2 4.2 0 010-6l3-3z" />
            <path d="M9 15l6-6" />
        </BaseIcon>
    );
}

export function LeafIcon(props: IconProps) {
    return (
        <BaseIcon {...props}>
            <path d="M19 5c-7 0-12 4.6-12 11 0 2.3 1.2 3.5 3.3 3.5C16.8 19.5 19 13 19 5z" />
            <path d="M7.5 17.5c1.8-2.3 4.1-4 7-5.1" />
        </BaseIcon>
    );
}

export function PlusCircleIcon(props: IconProps) {
    return (
        <BaseIcon {...props}>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 8v8M8 12h8" />
        </BaseIcon>
    );
}

export function BabyIcon(props: IconProps) {
    return (
        <BaseIcon {...props}>
            <circle cx="12" cy="8.5" r="3.2" />
            <path d="M6.5 19a5.5 5.5 0 0111 0" />
            <circle cx="10.5" cy="8.5" r=".4" fill="currentColor" />
            <circle cx="13.5" cy="8.5" r=".4" fill="currentColor" />
        </BaseIcon>
    );
}

export function SparkleIcon(props: IconProps) {
    return (
        <BaseIcon {...props}>
            <path d="M12 3l1.8 4.3L18 9l-4.2 1.7L12 15l-1.8-4.3L6 9l4.2-1.7L12 3z" />
            <path d="M18.5 14.5l.8 1.8 1.7.7-1.7.7-.8 1.8-.8-1.8-1.7-.7 1.7-.7.8-1.8z" />
        </BaseIcon>
    );
}

export function PhoneIcon(props: IconProps) {
    return (
        <BaseIcon {...props}>
            <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.1-8.7A2 2 0 014 2h3a2 2 0 012 1.7c.1 1 .4 2 .7 2.8a2 2 0 01-.4 2.1L8 9.9a16 16 0 006.1 6.1l1.3-1.3a2 2 0 012.1-.5c.9.3 1.8.5 2.8.7A2 2 0 0122 16.9z" />
        </BaseIcon>
    );
}

export function ShieldCheckIcon(props: IconProps) {
    return (
        <BaseIcon {...props}>
            <path d="M12 2l8 3.5V11c0 5-3.5 8.5-8 10.5C7.5 19.5 4 16 4 11V5.5L12 2z" />
            <polyline points="8.5,11.5 11,14 15.5,9.5" />
        </BaseIcon>
    );
}

export function TruckIcon(props: IconProps) {
    return (
        <BaseIcon {...props}>
            <path d="M2 9a1.5 1.5 0 011.5-1.5h10V18H2V9z" />
            <path d="M13.5 12H18l2.5 4V18h-7" />
            <circle cx="6.5" cy="19.5" r="1.5" />
            <circle cx="18" cy="19.5" r="1.5" />
        </BaseIcon>
    );
}

export function TagIcon(props: IconProps) {
    return (
        <BaseIcon {...props}>
            <path d="M12.5 2.5H7.5a1 1 0 00-.7.3L3.3 6.3a1.5 1.5 0 000 2.1l8.3 8.3a1.5 1.5 0 002.1 0l6-6a1.5 1.5 0 000-2.1L13.2 3a1 1 0 00-.7-.5z" />
            <circle cx="8.5" cy="8.5" r="1.3" />
        </BaseIcon>
    );
}
