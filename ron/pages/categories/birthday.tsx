import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Reveal from '@/components/Reveal';

export default function BirthdayPage() {
  return (
    <Layout>
      <SEO title="ימי הולדת" />
      <section className="container py-12 grid md:grid-cols-2 gap-10 items-center">
        <Reveal>
          <div className="aspect-[4/3] rounded-3xl border border-gray-100 bg-gradient-to-br from-white to-brand-50" aria-label="placeholder" />
        </Reveal>
        <Reveal>
          <div>
            <h1 className="mb-4">ימי הולדת</h1>
            <p className="text-gray-600">עיצובים צבעוניים ומותאמים אישית לחגיגה בלתי נשכחת.</p>
          </div>
        </Reveal>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: {} };
}


