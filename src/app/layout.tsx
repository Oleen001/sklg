import type { Metadata } from "next";
import { ABeeZee, Noto_Sans, Noto_Sans_Thai } from "next/font/google";
import "@/styles/index.css";
import App from "./App";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const abeezee = ABeeZee({
  variable: "--font-abeezee",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skillogy",
  description: "Learning and career-skills platform prototype.",
};

export default function RootLayout({
  children: _children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${notoSansThai.variable} ${notoSans.variable} ${abeezee.variable}`}>
      <body>
        <App />
      </body>
    </html>
  );
}
