import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Reveal from '@/components/Reveal';
import MapEmbed from '@/components/MapEmbed';
import { FormEvent, useState } from 'react';
import { sanitizeText, isSpamLike } from '@/lib/sanitize';

export default function ContactPage() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP || '';
  const email = process.env.NEXT_PUBLIC_EMAIL || '';
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const name = sanitizeText(String(formData.get('name') || ''));
    const email = sanitizeText(String(formData.get('email') || ''));
    const message = sanitizeText(String(formData.get('message') || ''), 1000);
    const honeypot = String(formData.get('company') || ''); // honeypot
    
    // Client-side validation
    if (!name || !message) {
      setErrorMessage('שם והודעה הם שדות חובה');
      setStatus('error');
      return;
    }
    
    if (honeypot || isSpamLike(message)) {
      setErrorMessage('הודעה לא תקינה');
      setStatus('error');
      return;
    }
    
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('פורמט אימייל לא תקין');
      setStatus('error');
      return;
    }

    try {
      setStatus('sending');
      setErrorMessage('');
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          honeypot,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        form.reset();
      } else {
        setErrorMessage(data.error || 'שגיאה בשליחה. נסו שוב.');
        setStatus('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setErrorMessage('שגיאה בשליחה. נסו שוב.');
      setStatus('error');
    }
  }

  return (
    <Layout>
      <SEO title="יצירת קשר" />
      <section className="container py-12 grid lg:grid-cols-2 gap-10">
        <div>
          <Reveal>
            <h1 className="mb-4">נשמח לשמוע ממכם</h1>
          </Reveal>
          <Reveal>
            <div className="flex gap-3 mb-6">
              <a className="btn btn-primary" href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer">ווטסאפ</a>
              <a className="btn btn-secondary" href={`mailto:${email}`}>אימייל</a>
            </div>
          </Reveal>
          <Reveal>
            <form className="card p-6 grid gap-4" onSubmit={onSubmit}>
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm">שם מלא</label>
                <input id="name" name="name" required className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-300" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm">אימייל</label>
                <input id="email" name="email" type="email" className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-300" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="message" className="text-sm">הודעה</label>
                <textarea id="message" name="message" required rows={4} className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-300" />
              </div>
              <div className="hidden">
                <label>אל תמלאו<input name="company" /></label>
              </div>
              <div className="flex items-center gap-3">
                <button className="btn btn-primary" disabled={status==='sending'}>
                  {status==='sending' ? 'שולח…' : 'שליחה'}
                </button>
                {status==='success' && <span className="text-green-600 text-sm">תודה! נחזור אליכם בקרוב.</span>}
                {status==='error' && <span className="text-red-600 text-sm">{errorMessage || 'שגיאה בשליחה. נסו שוב.'}</span>}
              </div>
            </form>
          </Reveal>
        </div>
        <div>
          <Reveal>
            <MapEmbed />
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: {} };
}


