import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Reveal from '@/components/Reveal';
import Image from 'next/image';
import path from 'path';
import fs from 'fs';

type WeddingPageProps = { images: string[] };

export default function WeddingPage({ images }: WeddingPageProps) {
  return (
    <Layout>
      <SEO title="חתונות" />
      <section className="container py-8 sm:py-12 px-4 sm:px-6 grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center">
        <Reveal>
          <div className="aspect-[4/3] rounded-2xl sm:rounded-3xl border border-gray-100 bg-gradient-to-br from-white to-brand-50" aria-label="placeholder" />
        </Reveal>
        <Reveal>
          <div className="text-center md:text-right">
            <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl">חתונות</h1>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg">אוירה רומנטית ואלגנטית בעיצובים מרשימים ומוקפדים.</p>
          </div>
        </Reveal>
      </section>

      <section className="container py-8 sm:py-12 px-4 sm:px-6">
        <Reveal>
          <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl lg:text-3xl text-center md:text-right">גלריה</h2>
        </Reveal>
        <div className="grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((src) => (
            <Reveal key={src}>
              <div className="aspect-square overflow-hidden rounded-lg sm:rounded-xl border border-gray-100">
                <Image 
                  src={src} 
                  alt="חתונות - עיצוב בלונים" 
                  width={600} 
                  height={600} 
                  className="w-full h-full object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 600px"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const category = 'weddings';
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


