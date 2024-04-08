import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Share Filesy",
  description: "ShareFilesy: Streamline file sharing and collaboration effortlessly. Securely share documents, photos, and more with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="grid h-screen text-white bg-gray-900 place-items-center">{children}</body>
    </html>
  );
}
