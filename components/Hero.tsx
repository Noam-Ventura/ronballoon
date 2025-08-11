import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container grid md:grid-cols-2 gap-10 items-center py-16">
        <div className="order-2 md:order-1">
          <h1 className="mb-4">עיצוב בלונים לאירוע בלתי נשכח</h1>
          <p className="text-gray-600 mb-6">מייצרים רגעים גדולים עם עיצובים מותאמים אישית לכל סוג אירוע.</p>
          <div className="flex gap-3">
            <Link href="/contact" className="btn btn-primary">דברו איתנו</Link>
            <Link href="#categories" className="btn btn-secondary">הקטגוריות שלנו</Link>
          </div>
        </div>
        <div className="order-1 md:order-2 aspect-[4/3] rounded-3xl overflow-hidden border border-gray-100">
          <Image
            src="/home/hero.jpg"
            alt="עיצוב בלונים מקצועי לאירועים"
            width={600}
            height={450}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}


