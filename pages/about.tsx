import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Reveal from '@/components/Reveal';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <Layout>
      <SEO title="אודות" />
      <section className="container py-8 sm:py-12 px-4 sm:px-6 grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center">
        <Reveal>
          <div className="aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100">
            <Image
              src="/about/hero.png"
              alt="רון בלון - עיצוב בלונים מקצועי"
              width={600}
              height={450}
              className="w-full h-full object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            />
          </div>
        </Reveal>
        <Reveal>
          <div className="text-center md:text-right">
            <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl">אודות</h1>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg leading-relaxed">
              <p className="text-gray-600">רון בלון – מעצב מסיבות ומתעסק בתחום אמנות הבלונים, נותן מענה באזור השרון, המרכז ומחוצה לו. באתר שלנו תמצאו מבחר של עיצובי בלונים.</p>
              <p className="text-gray-600">רון עובד עם בלונים איכותיים מהחברות המובילות בעולם וציוד משלים לאמני בלונים מתחילים ומקצועיים. בין היתר תמצאו אצלנו את המותגים: GEMAR, ANAGRAM, BELBAL, SEMPERTEX, QUALATEX, LINK-O-LOON ועוד.</p>
              <p className="text-gray-600">קיים מבחר קולקציות של קישוטים וניפוח בלונים בהליום.</p>
              <p className="text-gray-600">רון, המתמחה בקיפול ועיצוב בבלונים, דואג להתעדכן בטכניקות חדשות ועיצובים ייחודיים, ומוזמן לאירועים פרטיים ועסקיים – בהם הוא מעצב בלונים מקופלים לילדים וכתרים לרחבת הריקודים.</p>
              <p className="text-gray-600">את מגוון עיצובי הבלונים אתם מוזמנים לראות ולהתרשם, ולהתעדכן על המתחדש דרך דף הפייסבוק והאינסטגרם של רון בלון (ronballoon).</p>
              <p className="text-gray-800 font-medium">המוטו שלנו: לעשות שמח לכל אחד ובכל מקום. בלונים הם דרך מצוינת להעלות חיוך ולשמח ילדים ומבוגרים כאחד.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8 justify-center md:justify-start">
              <a href={process.env.NEXT_PUBLIC_INSTAGRAM || '#'} className="btn btn-secondary min-h-[48px] px-6 py-3 text-sm sm:text-base" target="_blank" rel="noopener noreferrer">אינסטגרם</a>
              <a href={process.env.NEXT_PUBLIC_FACEBOOK || '#'} className="btn btn-secondary min-h-[48px] px-6 py-3 text-sm sm:text-base" target="_blank" rel="noopener noreferrer">פייסבוק</a>
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


