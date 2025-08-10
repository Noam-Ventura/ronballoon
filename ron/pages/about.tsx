import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Reveal from '@/components/Reveal';

export default function AboutPage() {
  return (
    <Layout>
      <SEO title="אודות" />
      <section className="container py-12 grid md:grid-cols-2 gap-10 items-center">
        <Reveal>
          <div className="aspect-[4/3] rounded-3xl border border-gray-100 bg-gradient-to-br from-white to-brand-50" aria-label="placeholder" />
        </Reveal>
        <Reveal>
          <div>
            <h1 className="mb-4">הסיפור שלנו</h1>
            <p className="text-gray-600 mb-4">התחלנו מאהבה לבלונים ולעיצוב, והיום אנחנו מלווים לקוחות באירועים המשמחים ביותר בחייהם. בחירה בנו היא בחירה בגרפיקה מרהיבה, שירות אישי וירידה לפרטים הקטנים.</p>
            <div className="flex gap-3">
              <a href={process.env.NEXT_PUBLIC_INSTAGRAM || '#'} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">אינסטגרם</a>
              <a href={process.env.NEXT_PUBLIC_FACEBOOK || '#'} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">פייסבוק</a>
            </div>
          </div>
        </Reveal>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: {} };
}


