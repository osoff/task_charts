import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/ModeToggle";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryClientProvider from "./components/ReactQueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Курс валют",
  description: "Тестовое задание",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="max-w-screen-xl mx-auto px-4 ">{children}</main>
            <div className="absolute top-2 right-2">
              <ModeToggle />
            </div>
            <Toaster />
          </ThemeProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
