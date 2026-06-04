import "./globals.css";
import { Playfair_Display, Bebas_Neue } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-next",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-next",
  display: "swap",
});

export const metadata = {
  title: "Angelica Suti Whiharto",
  description: "Portfolio of Angelica Suti Whiharto, AI Engineer, Data Engineer, Full-Stack Developer.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${bebas.variable} light`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
