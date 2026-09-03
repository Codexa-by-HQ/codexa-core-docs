import type { ReactNode } from "react";
import type { Metadata } from "next";

// Set NEXT_PUBLIC_SITE_URL once this is deployed, so relative OG image
// paths and canonical URLs resolve against the real domain instead of
// falling back to localhost.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

const title = {
    default: 'Codexa Core, Plugin-First Deno Framework',
    template: '%s | Codexa Core',
};

const description = 'Codexa Core is a modular, plugin-first toolkit for building type-safe Deno backends: HTTP, OpenAPI, MongoDB, Redis, event bus, caching, and storage as small, focused imports.';

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: [
        'Codexa Core',
        'Deno framework',
        'Deno HTTP framework',
        'plugin-first backend',
        'OpenAPI generator',
        'Deno MongoDB',
        'Deno Redis',
    ],
    authors: [{ name: 'Codexa-by-HQ' }],
    openGraph: {
        type: 'website',
        siteName: 'Codexa Core',
        title,
        description,
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title,
        description,
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return children;
}