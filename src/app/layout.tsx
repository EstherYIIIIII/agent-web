import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent Web Navigator — Agent 专属平台导航",
  description:
    "The ultimate directory of agent-only platforms. 60+ platforms across 11 categories. Agent 专属平台终极目录。",
  keywords: [
    "AI agents",
    "agent web",
    "OpenClaw",
    "agent platforms",
    "agent directory",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
