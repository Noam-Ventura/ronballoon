import Link from 'next/link';
import { useEffect, useState } from 'react';

const NAV = [
  { href: '/', label: 'בית' },
  { href: '/about', label: 'אודות' },
  { href: '/categories/birthday', label: 'ימי הולדת' },
  { href: '/categories/wedding', label: 'חתונות' },
  { href: '/categories/brit', label: 'ברית' },
  { href: '/categories/events', label: 'אירועים' },
  { href: '/contact', label: 'יצירת קשר' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? 'bg-white/90 backdrop-blur border-b border-gray-100' : 'bg-white'}`}>
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xl font-extrabold text-brand-700">רון בלון</Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm hover:text-brand-700">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex">
          <Link href="/contact" className="btn btn-primary ripple-container">דברו איתנו</Link>
        </div>
        <button aria-label="תפריט" className="md:hidden p-2" onClick={() => setOpen((v) => !v)}>
          <span className="i-lucide-menu" />☰
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="container py-4 grid gap-3">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="py-2" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="btn btn-primary" onClick={() => setOpen(false)}>
              דברו איתנו
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}


