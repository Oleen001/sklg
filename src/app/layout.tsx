import type { Metadata } from "next";
import "@/styles/index.css";
import App from "./App";

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
    <html lang="th">
      <body>
        <App />
      </body>
    </html>
  );
}
