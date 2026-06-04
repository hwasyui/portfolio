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
  title: "Angelica's Portfolio",
  description: "AI Engineer, Data Engineer, and Full-Stack Developer building systems that actually ship. Check out her projects, experience, and more.",
  metadataBase: new URL("https://portfolio.angelicas.xyz"),
  openGraph: {
    title: "Angelica's Portfolio",
    description: "AI Engineer, Data Engineer, and Full-Stack Developer building systems that actually ship. Check out her projects, experience, and more.",
    url: "https://portfolio.angelicas.xyz",
    siteName: "Angelica's Portfolio",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "Angelica's Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Angelica's Portfolio",
    description: "AI Engineer, Data Engineer, and Full-Stack Developer building systems that actually ship.",
    images: ["/image.png"],
  },
  verification: {
    google: "kRHhLJFUa4ChPorNRsbLNM6jVWx7VKET_upCs7bx0NM",
  },
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
