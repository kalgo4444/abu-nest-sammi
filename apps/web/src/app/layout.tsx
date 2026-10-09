import type { Metadata } from "next";
import "../styles/globals.css";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { ThemeProvider } from "@/shared/lib/theme";

export const metadata: Metadata = {
  title: "Abu Nest Journal",
  description: "A running notebook backed by the Nest blog API.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('abu-theme');if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.setAttribute('data-theme','dark');document.documentElement.style.colorScheme='dark';}else{document.documentElement.classList.remove('dark');document.documentElement.setAttribute('data-theme','light');document.documentElement.style.colorScheme='light';}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col selection:bg-[#9a3412] selection:text-white dark:selection:bg-[#f97316] dark:selection:text-stone-900">
        <ThemeProvider>
          <Header />
          <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 md:px-8 md:py-14">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
