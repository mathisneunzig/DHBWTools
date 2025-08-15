import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { resolveTenantFromHeaders } from "@/lib/tenant";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const tenant = await resolveTenantFromHeaders();
  const title = tenant?.title ?? "Mock exam generator";
  return {
    title,
    description: title,
    openGraph: { title, description: title },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const tenant = await resolveTenantFromHeaders();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="p-4 text-2xl font-semibold border-b">
          {tenant?.title ?? "Mock exam generator"}
        </header>

        <Providers>{children}</Providers>

        <footer className="p-4 text-center text-sm border-t mt-8">
          <a href="/impressum" className="underline mr-2">Impressum</a>
          <a href="/datenschutz" className="underline">Datenschutz</a>
        </footer>
      </body>
    </html>
  );
}
