import "@/app/globals.css";
import { notojp } from "@/utiles/fonts";

export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
    <html lang="ja-JP" className={`${notojp.variable}`}>
      <body>{children}</body>
    </html>
  );
}
