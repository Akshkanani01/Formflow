import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FormFlow",
    template: "%s • FormFlow",
  },
  description:
    "The free form builder for teams. Create unlimited forms, collect unlimited responses, and collaborate effortlessly.",
  applicationName: "FormFlow",
  keywords: [
    "FormFlow",
    "Form Builder",
    "Online Forms",
    "Survey Builder",
    "Free Forms",
    "Unlimited Responses",
  ],
  authors: [
    {
      name: "FormFlow",
    },
  ],
  creator: "FormFlow",
  publisher: "FormFlow",
  metadataBase: new URL("https://formflow.app"),
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: "FormFlow",
    description:
      "The free form builder for teams. Create unlimited forms and collect unlimited responses.",
    siteName: "FormFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "FormFlow",
    description:
      "The free form builder for teams. Create unlimited forms and collect unlimited responses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}