import "./globals.css";
import { Playfair_Display, Bebas_Neue } from "next/font/google";

const siteUrl = "https://angelica-whiharto.com";
const ownerName = "Angelica Suti Whiharto";
const siteTitle = "Angelica Suti Whiharto Portfolio";
const siteDescription =
  "I am Angelica Suti Whiharto, an AI Engineer, Data Engineer, and Full-Stack Developer from Bekasi, Indonesia. I build backend systems, data pipelines, and AI-powered applications. Currently studying Informatics at President University with a 3.96 GPA.";

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
  title: {
    default: siteTitle,
    template: `%s | ${ownerName}`,
  },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  applicationName: "Angelica Suti Whiharto Portfolio",
  authors: [{ name: ownerName, url: siteUrl }],
  creator: ownerName,
  publisher: ownerName,
  category: "portfolio",
  keywords: [
    "Angelica Suti Whiharto",
    "Angelica Whiharto",
    "Angelica Suti",
    "Angelica portfolio",
    "angelica portoflio",
    "Angelica Suti Whiharto portfolio",
    "AI Engineer portfolio",
    "Data Engineer portfolio",
    "Backend Engineer portfolio",
    "Full-Stack Developer portfolio",
    "President University Informatics",
    "Bekasi Indonesia developer",
  ],
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Angelica Suti Whiharto Portfolio",
    locale: "en_US",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "Angelica Suti Whiharto Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/image.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: ownerName,
      alternateName: ["Angelica Whiharto", "Angelica Suti", "Angelica"],
      url: siteUrl,
      image: `${siteUrl}/about/photo4.jpg`,
      jobTitle: ["AI Engineer", "Data Engineer", "Backend Engineer", "Full-Stack Developer"],
      description: siteDescription,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bekasi",
        addressCountry: "ID",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "President University",
      },
      sameAs: [
        "https://github.com/hwasyui",
        "https://www.linkedin.com/in/angelicawhiharto",
        "https://www.instagram.com/angelstwhr",
      ],
      knowsAbout: [
        "Artificial Intelligence",
        "Data Engineering",
        "Backend Development",
        "Full-Stack Development",
        "FastAPI",
        "Kafka",
        "Docker",
        "React",
        "Next.js",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Angelica Suti Whiharto Portfolio",
      alternateName: ["Angelica's Portfolio", "Angelica Portfolio"],
      description: siteDescription,
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${bebas.variable} light`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
