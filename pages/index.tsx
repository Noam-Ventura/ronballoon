import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import CategoryCard from '@/components/CategoryCard';
import MapEmbed from '@/components/MapEmbed';
import ReviewsSummary from '@/components/ReviewsSummary';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const categories = [
    { href: '/categories/events?filter=birthday', title: 'ימי הולדת', description: 'עיצובים צבעוניים ומלאי שמחה', image: '/categories/birthday-card.png' },
    { href: '/categories/events?filter=weddings', title: 'חתונות', description: 'אלגנטיות ורומנטיקה', image: '/categories/wedding-card.jpg' },
    { href: '/categories/events?filter=brit', title: 'ברית', description: 'מגע עדין ומרגש', image: '/categories/brit-card.jpg' },
  ];

  return (
    <Layout>
      <SEO />
      <Hero />

      <section id="categories" className="container py-8 sm:py-12 px-4 sm:px-6">
        <Reveal>
          <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl lg:text-3xl text-center md:text-right">הקטגוריות שלנו</h2>
        </Reveal>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Reveal key={c.href}>
              <CategoryCard {...c} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container py-8 sm:py-12 px-4 sm:px-6 grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center">
        <Reveal>
          <div className="aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100">
            <Image
              src="/home/background.jpg"
              alt="עיצוב בלונים מקצועי"
              width={600}
              height={450}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            />
          </div>
        </Reveal>
        <Reveal>
          <div className="text-center md:text-right">
            <h2 className="mb-3 sm:mb-4 text-xl sm:text-2xl lg:text-3xl">קצת עלינו</h2>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg leading-relaxed">רון בלון מתמחה באמנות ועיצוב בלונים לאירועים – עם מגוון עיצובים, ציוד איכותי ומותגים מובילים. נשמח לשמח באירועים פרטיים ועסקיים עם עיצובים מותאמים אישית.</p>
            <Link href="/about" className="btn btn-secondary min-h-[48px] px-6 py-3 text-sm sm:text-base">לקריאה נוספת</Link>
          </div>
        </Reveal>
      </section>

      <section className="container py-8 sm:py-12 px-4 sm:px-6">
        <Reveal>
          <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl lg:text-3xl text-center md:text-right">חוות דעת גוגל</h2>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-2">
          <ReviewsSummary />
          <ReviewsCarousel />
        </div>
      </section>

      <section className="container py-8 sm:py-12 px-4 sm:px-6 max-w-5xl">
        <Reveal>
          <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl lg:text-3xl text-center md:text-right">איפה אנחנו?</h2>
        </Reveal>
        <div className="max-w-3xl mx-auto">
          <MapEmbed className="aspect-[16/9] rounded-2xl sm:rounded-3xl" />
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: {} };
}


