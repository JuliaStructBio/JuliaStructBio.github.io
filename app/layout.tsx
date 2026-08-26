import type { Metadata } from "next";
import { IBM_Plex_Mono, Source_Sans_3 } from "next/font/google";
import { getSiteContent } from "@/lib/content";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const content = getSiteContent();

export const metadata: Metadata = {
  metadataBase: new URL(content.site.url),
  title: content.site.meta_title,
  description: content.site.meta_description,
  openGraph: {
    title: content.site.meta_title,
    description: content.site.meta_description,
    url: content.site.url,
    siteName: content.site.name,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en" className={`${sourceSans.variable} ${ibmMono.variable}`}><body>{children}</body></html>;
}
