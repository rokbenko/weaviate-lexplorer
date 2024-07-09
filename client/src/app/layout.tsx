import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import Header from "@/app/components/header";
import "./styles/global.scss";

// Initialize Inter font
const inter = Inter({ subsets: ["latin"] });

// Define metadata for the app
export const metadata: Metadata = {
  title: "Weaviate Lexplorer",
  description:
    "Weaviate Lexplorer is your go-to tool for deep insights from Lex Fridman's podcasts. Using hybrid search with Weaviate's vector database, it lets you dive into key discussions by analyzing podcast transcriptions in chunks. With a user-friendly input and slider interface, explore now and uncover the richness of Lex Fridman's podcasts.",
};

// Define and export the RootLayout functional component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /**
   * Renders the root layout of the app.
   *
   * @param {Readonly<{ children: React.ReactNode }>} props - The props object containing the children.
   * @return {JSX.Element} - The JSX element representing the RootLayout component.
   */

  return (
    <html lang="en">
      <body className={`${inter.className} p-8 bg-gray-50`}>
        <Header />
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </body>
    </html>
  );
}
