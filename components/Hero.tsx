import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="order-2 md:order-1 text-center md:text-right">
          <h1 className="mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">עיצוב בלונים לאירוע בלתי נשכח</h1>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg">מייצרים רגעים גדולים עם עיצובים מותאמים אישית לכל סוג אירוע.</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
            <Link href="/contact" className="btn btn-primary min-h-[48px] px-6 py-3 text-sm sm:text-base">דברו איתנו</Link>
            <Link href="#categories" className="btn btn-secondary min-h-[48px] px-6 py-3 text-sm sm:text-base">הקטגוריות שלנו</Link>
          </div>
        </div>
        <div className="order-1 md:order-2 aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100">
          <Image
            src="/home/hero.jpg"
            alt="עיצוב בלונים מקצועי לאירועים"
            width={600}
            height={450}
            className="w-full h-full object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          />
        </div>
      </div>
    </section>
  );
}


