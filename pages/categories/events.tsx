import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Reveal from '@/components/Reveal';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import path from 'path';
import fs from 'fs';

type CategoryData = {
  id: string;
  title: string;
  description: string;
  href: string;
  images: string[];
};

type EventsPageProps = {
  categories: CategoryData[];
};

export default function EventsPage({ categories }: EventsPageProps) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    if (router.query.filter) {
      setActiveFilter(router.query.filter as string);
    }
  }, [router.query.filter]);

  const filteredCategories = activeFilter === 'all' 
    ? categories 
    : categories.filter(cat => cat.id === activeFilter);

  return (
    <Layout>
      <SEO title="אירועים" />
      <section className="container py-12 grid md:grid-cols-2 gap-10 items-center">
        <Reveal>
          <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-gray-100">
            <Image
              src="/categories/events-card.jpg"
              alt="עיצוב בלונים לאירועים"
              width={600}
              height={450}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </Reveal>
        <Reveal>
          <div>
            <h1 className="mb-4">אירועים</h1>
            <p className="text-gray-600">עיצוב בלונים לאירועים עסקיים ופרטיים, התאמה מלאה לקונספט ומקום.</p>
          </div>
        </Reveal>
      </section>

      <section className="container py-12">
        <Reveal>
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                activeFilter === 'all'
                  ? 'bg-brand-500 text-white border-brand-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-brand-500'
              }`}
            >
              הכל
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  activeFilter === category.id
                    ? 'bg-brand-500 text-white border-brand-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-brand-500'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </Reveal>

        {filteredCategories.map((category) => (
          <Reveal key={category.id}>
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
                  <p className="text-gray-600">{category.description}</p>
                </div>
                <Link href={category.href} className="btn btn-secondary">
                  צפה בגלריה המלאה
                </Link>
              </div>
              <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {category.images.slice(0, 8).map((src) => (
                  <div key={src} className="aspect-square overflow-hidden rounded-xl border border-gray-100">
                    <Image 
                      src={src} 
                      alt={`${category.title} - עיצוב בלונים`} 
                      width={600} 
                      height={600} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const categoryConfigs = [
    { id: 'birthday', title: 'ימי הולדת', description: 'עיצובים צבעוניים ומותאמים אישית לחגיגה בלתי נשכחת', href: '/categories/birthday' },
    { id: 'weddings', title: 'חתונות', description: 'אוירה רומנטית ואלגנטית בעיצובים מרשימים ומוקפדים', href: '/categories/wedding' },
    { id: 'brit', title: 'ברית', description: 'עיצובים רכים ומרגשים ליום מיוחד ומלא אהבה', href: '/categories/brit' }
  ];

  const categories: CategoryData[] = [];

  for (const config of categoryConfigs) {
    const dirOnDisk = path.join(process.cwd(), 'public', 'types', config.id);
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
        .map((file) => `/types/${config.id}/${file}`);
    } catch {
      images = [];
    }

    categories.push({
      ...config,
      images
    });
  }

  return { props: { categories } };
}


