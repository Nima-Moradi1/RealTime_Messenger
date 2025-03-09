import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";


export const metadata: Metadata = {
  title: "Nimagram",
  description: "A Realtime Messenger",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider defaultTheme="light" enableSystem attribute="class">
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
