import Link from 'next/link';

export default function Footer() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP || '';
  const email = process.env.NEXT_PUBLIC_EMAIL || '';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

  return (
    <footer className="mt-12 sm:mt-16 border-t border-gray-100 bg-gray-50">
      <div className="container py-8 sm:py-10 px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="text-center sm:text-right">
          <h3 className="text-lg font-bold mb-3">רון בלון</h3>
          <p className="text-sm text-gray-600 leading-relaxed">עיצוב בלונים לאירועים מכל הסוגים. נגיעה אישית, תוצאה מרשימה.</p>
        </div>
        <div className="text-center sm:text-right">
          <h4 className="font-bold mb-3">קישורים</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-brand-600 transition-colors">אודות</Link></li>
            <li><Link href="/categories/birthday" className="hover:text-brand-600 transition-colors">ימי הולדת</Link></li>
            <li><Link href="/categories/wedding" className="hover:text-brand-600 transition-colors">חתונות</Link></li>
            <li><Link href="/categories/brit" className="hover:text-brand-600 transition-colors">ברית</Link></li>
            <li><Link href="/categories/events" className="hover:text-brand-600 transition-colors">אירועים</Link></li>
            <li><Link href="/contact" className="hover:text-brand-600 transition-colors">יצירת קשר</Link></li>
          </ul>
        </div>
        <div className="text-center sm:text-right sm:col-span-2 lg:col-span-1">
          <h4 className="font-bold mb-3">יציאה מהירה</h4>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 justify-center sm:justify-start">
            <a className="btn btn-secondary min-h-[48px] px-4 py-2 text-sm" href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer">ווטסאפ</a>
            <a className="btn btn-secondary min-h-[48px] px-4 py-2 text-sm" href={`mailto:${email}`}>אימייל</a>
            <a className="btn btn-secondary min-h-[48px] px-4 py-2 text-sm" href={`${siteUrl}/#map`}>מפה</a>
          </div>
        </div>
      </div>
      <div className="py-4 text-center text-xs text-gray-500">© {new Date().getFullYear()} רון בלון</div>
    </footer>
  );
}


