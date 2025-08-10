import Link from 'next/link';

export default function Footer() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP || '';
  const email = process.env.NEXT_PUBLIC_EMAIL || '';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

  return (
    <footer className="mt-16 border-t border-gray-100 bg-gray-50">
      <div className="container py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-3">בלון׳לה</h3>
          <p className="text-sm text-gray-600">עיצוב בלונים לאירועים מכל הסוגים. נגיעה אישית, תוצאה מרשימה.</p>
        </div>
        <div>
          <h4 className="font-bold mb-3">קישורים</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about">אודות</Link></li>
            <li><Link href="/categories/birthday">ימי הולדת</Link></li>
            <li><Link href="/categories/wedding">חתונות</Link></li>
            <li><Link href="/categories/brit">ברית</Link></li>
            <li><Link href="/categories/events">אירועים</Link></li>
            <li><Link href="/contact">יצירת קשר</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">יציאה מהירה</h4>
          <div className="flex flex-col gap-2">
            <a className="btn btn-secondary" href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer">ווטסאפ</a>
            <a className="btn btn-secondary" href={`mailto:${email}`}>אימייל</a>
            <a className="btn btn-secondary" href={`${siteUrl}/#map`}>מפה</a>
          </div>
        </div>
      </div>
      <div className="py-4 text-center text-xs text-gray-500">© {new Date().getFullYear()} בלון׳לה</div>
    </footer>
  );
}


