import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { AppProvider } from "@/context/appcontext";
import { Providers } from "./provider";
import { QueryProvider } from "./queryProvider";

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const campton = localfonts({
//   src: [
//     {
//       path: '../fonts/CamptonBlack.otf',
//       style: 'normal',
//       weight: '900',
//     },
//     {
//       path: '../fonts/CamptonBook.otf',
//       style: 'normal',
//       weight: '400',
//     },
//     // {
//     //   path: '../fonts/Campton-Medium.otf',
//     //   style: 'normal',
//     //   weight: '500',
//     // },
//     {
//       path: '../fonts/CamptonBold.otf',
//       style: 'normal',
//       weight: '700',
//     },
//     {
//       path: '../fonts/CamptonExtraBold.otf',
//       style: 'normal',
//       weight: '800',
//     },
//     {
//       path: '../fonts/CamptonLight.otf',
//       style: 'normal',
//       weight: '100',
//     },
//   ],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: "Bashbay - Discover Events and Venues",
  description:
    "Find and book the best events and venues near you. Explore listings, read reviews, and connect with hosts on Bashbay.",
  keywords: ["events", "venues", "bookings", "entertainment"], // Optional; less impactful now but still useful
  authors: [{ name: "Bashbay Team" }],
  openGraph: {
    title: "Bashbay - Events & Venues Platform",
    description: "Discover amazing events and venues.",
    url: "https://bashbay.com", // Replace with your domain
    siteName: "Bashbay",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }], // Add an OG image in public/images/
  },
  twitter: {
    card: "summary_large_image",
    title: "Bashbay - Events & Venues",
    description: "Find events and venues easily.",
    images: ["/images/twitter-image.jpg"],
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` ${poppins.className} antialiased`}>
        <AppProvider>
          <Providers>
            <QueryProvider>{children}</QueryProvider>
          </Providers>
        </AppProvider>
      </body>
    </html>
  );
}
