import type { Metadata } from "next";
import "@/styles/index.css";

export const metadata: Metadata = {
  title: "Skillogy",
  description: "Learning and career-skills platform prototype.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
