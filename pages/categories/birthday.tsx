import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Reveal from '@/components/Reveal';
import Image from 'next/image';
import path from 'path';
import fs from 'fs';

type BirthdayPageProps = { images: string[] };

export default function BirthdayPage({ images }: BirthdayPageProps) {
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

      <section className="container py-12">
        <Reveal>
          <h2 className="mb-6">גלריה</h2>
        </Reveal>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((src) => (
            <Reveal key={src}>
              <div className="aspect-square overflow-hidden rounded-xl border border-gray-100">
                <Image src={src} alt="ימי הולדת - עיצוב בלונים" width={600} height={600} className="w-full h-full object-cover" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const category = 'birthday';
  const dirOnDisk = path.join(process.cwd(), 'public', 'types', category);
  let images: string[] = [];
  try {
    const files = fs.readdirSync(dirOnDisk);
    images = files
      .filter((f) => f.toLowerCase().endsWith('.avif'))
      .sort((a, b) => {
        const an = parseInt(a, 10);
        const bn = parseInt(b, 10);
        if (!isNaN(an) && !isNaN(bn)) return an - bn;
        return a.localeCompare(b, undefined, { numeric: true });
      })
      .map((file) => `/types/${category}/${file}`);
  } catch {
    images = [];
  }
  return { props: { images } };
}


