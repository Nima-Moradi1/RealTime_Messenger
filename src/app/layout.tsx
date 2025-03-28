import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import ToasterContext from "@/providers/ToasterContext";
import AuthContext from "@/context/AuthContext";
import ActiveStatus from "@/components/ActiveStatus";


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
          <AuthContext>
        <ToasterContext/>
        <ActiveStatus />
        {children}
          </AuthContext>
        </ThemeProvider>
      </body>
    </html>
  );
}
