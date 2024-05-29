"use client";
import "@/assets/styles/globals.scss";
import { TelegramProvider } from "@/providers/telegram";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { AppContextProvider } from "@/providers/context";
import localFont from "next/font/local";

const SFProDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/SF-Pro-Display-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/SF-Pro-Display-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/SF-Pro-Display-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/SF-Pro-Display-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={SFProDisplay.className}>
        <TelegramProvider>
          <TonConnectUIProvider
            manifestUrl="https://127.0.0.1:3000/tonconnect-manifest.json"
            actionsConfiguration={{
              twaReturnUrl: "https://127.0.0.1:3000/",
            }}
          >
            <AppContextProvider>{children}</AppContextProvider>
          </TonConnectUIProvider>
        </TelegramProvider>
      </body>
    </html>
  );
}
