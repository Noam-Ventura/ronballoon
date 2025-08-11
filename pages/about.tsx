import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Reveal from '@/components/Reveal';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <Layout>
      <SEO title="אודות" />
      <section className="container py-12 grid md:grid-cols-2 gap-10 items-center">
        <Reveal>
          <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-gray-100">
            <Image
              src="/about/hero.png"
              alt="רון בלון - עיצוב בלונים מקצועי"
              width={600}
              height={450}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </Reveal>
        <Reveal>
          <div>
            <h1 className="mb-4">אודות</h1>
            <p className="text-gray-600 mb-4">רון בלון – מעצב מסיבות ומתעסק בתחום אמנות הבלונים, נותן מענה באזור השרון, המרכז ומחוצה לו. באתר שלנו תמצאו מבחר של עיצובי בלונים.</p>
            <p className="text-gray-600 mb-4">רון עובד עם בלונים איכותיים מהחברות המובילות בעולם וציוד משלים לאמני בלונים מתחילים ומקצועיים. בין היתר תמצאו אצלנו את המותגים: GEMAR, ANAGRAM, BELBAL, SEMPERTEX, QUALATEX, LINK-O-LOON ועוד.</p>
            <p className="text-gray-600 mb-4">קיים מבחר קולקציות של קישוטים וניפוח בלונים בהליום.</p>
            <p className="text-gray-600 mb-4">רון, המתמחה בקיפול ועיצוב בבלונים, דואג להתעדכן בטכניקות חדשות ועיצובים ייחודיים, ומוזמן לאירועים פרטיים ועסקיים – בהם הוא מעצב בלונים מקופלים לילדים וכתרים לרחבת הריקודים.</p>
            <p className="text-gray-600 mb-4">את מגוון עיצובי הבלונים אתם מוזמנים לראות ולהתרשם, ולהתעדכן על המתחדש דרך דף הפייסבוק והאינסטגרם של רון בלון (ronballoon).</p>
            <p className="text-gray-800 font-medium mb-6">המוטו שלנו: לעשות שמח לכל אחד ובכל מקום. בלונים הם דרך מצוינת להעלות חיוך ולשמח ילדים ומבוגרים כאחד.</p>
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


