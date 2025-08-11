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
      <section className="container py-8 sm:py-12 px-4 sm:px-6 grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
        <div>
          <Reveal>
            <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl text-center lg:text-right">נשמח לשמוע ממכם</h1>
          </Reveal>
          <Reveal>
            <div className="flex flex-col sm:flex-row gap-3 mb-6 justify-center lg:justify-start">
              <a className="btn btn-primary min-h-[48px] px-6 py-3 text-sm sm:text-base" href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer">ווטסאפ</a>
              <a className="btn btn-secondary min-h-[48px] px-6 py-3 text-sm sm:text-base" href={`mailto:${email}`}>אימייל</a>
            </div>
          </Reveal>
          <Reveal>
            <form className="card p-4 sm:p-6 grid gap-4 sm:gap-6" onSubmit={onSubmit}>
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">שם מלא</label>
                <input 
                  id="name" 
                  name="name" 
                  required 
                  className="border rounded-xl px-4 py-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-brand-300 text-base min-h-[48px]" 
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">אימייל</label>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  className="border rounded-xl px-4 py-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-brand-300 text-base min-h-[48px]" 
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="message" className="text-sm font-medium">הודעה</label>
                <textarea 
                  id="message" 
                  name="message" 
                  required 
                  rows={4} 
                  className="border rounded-xl px-4 py-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-brand-300 text-base resize-none" 
                />
              </div>
              <div className="hidden">
                <label>אל תמלאו<input name="company" /></label>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <button className="btn btn-primary min-h-[48px] px-6 py-3 text-sm sm:text-base w-full sm:w-auto" disabled={status==='sending'}>
                  {status==='sending' ? 'שולח…' : 'שליחה'}
                </button>
                {status==='success' && <span className="text-green-600 text-sm sm:text-base">תודה! נחזור אליכם בקרוב.</span>}
                {status==='error' && <span className="text-red-600 text-sm sm:text-base">{errorMessage || 'שגיאה בשליחה. נסו שוב.'}</span>}
              </div>
            </form>
          </Reveal>
        </div>
        <div>
          <Reveal>
            <MapEmbed className="rounded-2xl sm:rounded-3xl" />
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: {} };
}


