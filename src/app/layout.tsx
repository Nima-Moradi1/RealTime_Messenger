import type { Metadata } from "next";
import "./globals.css";


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
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
