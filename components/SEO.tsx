import Head from 'next/head';
import { useRouter } from 'next/router';

type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
};

const DEFAULT = {
  title: 'עיצוב בלונים לאירועים | פורטפוליו ושירותים',
  description:
    'בלונים מעוצבים לאירועים: ימי הולדת, חתונות, בריתות ואירועים עסקיים. הזמנה והתאמה אישית בקלות. פורטפוליו, חוות דעת ויצירת קשר.',
  image: '/og.jpg',
};

export function SEO({ title, description, image }: SEOProps) {
  const { asPath } = useRouter();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const url = siteUrl + asPath;
  const metaTitle = title ? `${title} | ${DEFAULT.title}` : DEFAULT.title;
  const metaDesc = description || DEFAULT.description;
  const metaImage = image || DEFAULT.image;

  const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME || 'רון בלון';
  const phone = process.env.NEXT_PUBLIC_WHATSAPP || '';
  const address = process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || '';

  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessName,
    image: siteUrl + metaImage,
    url: siteUrl,
    telephone: phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address,
      addressCountry: 'IL',
    },
    priceRange: '$$'
  };

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={metaImage} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />
    </Head>
  );
}

export default SEO;


