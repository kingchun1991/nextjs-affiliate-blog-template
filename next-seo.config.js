/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "Standingify",
  titleTemplate: "%s | Best Standing Desk | Best Standing Desk converter | Standingify",
  defaultTitle: "Standingify",
  description: "Start Standing to work makes you health",
  // canonical: "https://standingify.com",
  openGraph: {
    url: "https://standingify.com",
    title: "Standingify",
    description: "Start Standing to work makes you health",
    images: [
      {
        url: "",
        alt: "standingify.com og-image",
      },
    ],
    site_name: "Standingify",
  },
  twitter: {
    handle: "@sozonome",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
