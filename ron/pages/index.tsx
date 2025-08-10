import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import CategoryCard from '@/components/CategoryCard';
import MapEmbed from '@/components/MapEmbed';
import Link from 'next/link';

export default function HomePage() {
  const categories = [
    { href: '/categories/birthday', title: 'ימי הולדת', description: 'עיצובים צבעוניים ומלאי שמחה' },
    { href: '/categories/wedding', title: 'חתונות', description: 'אלגנטיות ורומנטיקה' },
    { href: '/categories/brit', title: 'ברית', description: 'מגע עדין ומרגש' },
    { href: '/categories/events', title: 'אירועים', description: 'עסקיים ופרטיים' },
  ];

  return (
    <Layout>
      <SEO />
      <Hero />

      <section id="categories" className="container py-12">
        <Reveal>
          <h2 className="mb-6">הקטגוריות שלנו</h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Reveal key={c.href}>
              <CategoryCard {...c} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container py-12 grid md:grid-cols-2 gap-10 items-center">
        <Reveal>
          <div className="aspect-[4/3] rounded-3xl border border-gray-100 bg-gradient-to-br from-white to-brand-50" aria-label="placeholder" />
        </Reveal>
        <Reveal>
          <div>
            <h2 className="mb-4">קצת עלינו</h2>
            <p className="text-gray-600 mb-4">אנחנו בבלון׳לה מאמינים שכל אירוע ראוי לעיצוב בלונים מוקפד, ייחודי ומרגש. עם ניסיון רב ומאות לקוחות מרוצים, נתאים עבורכם את העיצוב המדויק.</p>
            <Link href="/about" className="btn btn-secondary">לקריאה נוספת</Link>
          </div>
        </Reveal>
      </section>

      <section className="container py-12">
        <Reveal>
          <h2 className="mb-6">חוות דעת גוגל</h2>
        </Reveal>
        <div className="card p-6 text-gray-500">סיכום חוות דעת יוצג כאן בקרוב.</div>
      </section>

      <section className="container py-12">
        <Reveal>
          <h2 className="mb-6">איפה אנחנו?</h2>
        </Reveal>
        <MapEmbed />
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: {} };
}


