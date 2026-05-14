import "../styles/index.scss";
import type { Metadata } from "next";
import ThemeProvider from "@/common/ThemeProvider";

export const metadata: Metadata = {
  title: "Unishrine website",
  description: "AI Voice Calling Platform for Real-Time Smart Conversations",
  keywords: [
    "AI Voice Assistant",
    "AI Calling Platform",
    "Voice Automation",
    "FastAPI",
    "Next.js",
    "Real-Time AI Calls",
    "Zeva AI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        />
        <link rel="icon" href="/assets/img/core-img/logo.svg" />
      </head>

      <body suppressHydrationWarning>
        <ThemeProvider />
        {children}
      </body>
    </html>
  );
}