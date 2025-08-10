## בלון׳לה – אתר תדמית ופורטפוליו (Next.js 14, Pages Router, Tailwind 3)

אתר RTL בעברית לעסק עיצוב בלונים: דפי בית, אודות, קטגוריות (ימי הולדת/ברית/חתונות/אירועים) ויצירת קשר. האתר מותאם SEO, נגישות, רספונסיבי, ו-SSG.

### טכנולוגיות
- Next.js 14 (Pages Router) + React 18
- Tailwind CSS 3 + PostCSS + Autoprefixer
- TypeScript
- next-sitemap (sitemap/robots)

### מבנה
- `pages/` – דפים סטטיים עם `getStaticProps`
- `components/` – Layout, Header, Footer, Hero, Reveal, וכו׳
- `styles/` – CSS גלובלי (RTL, טיפוגרפיה, כפתורים, ripple)
- `lib/` – סניטיזציה לטפסים
- `public/` – סטטי

### התקנה והרצה
1. התקנת חבילות:
```bash
npm install
```
2. משתני סביבה – צרו `.env.local`:
```bash
NEXT_PUBLIC_SITE_URL=https://example.com
NEXT_PUBLIC_WHATSAPP=972500000000
NEXT_PUBLIC_EMAIL=hello@example.com
NEXT_PUBLIC_FORMSPREE_ID=xxxxxx
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...
NEXT_PUBLIC_GOOGLE_PLACE_ID=ChIJ...
NEXT_PUBLIC_BUSINESS_NAME=בלון׳לה
NEXT_PUBLIC_BUSINESS_ADDRESS=תל אביב, ישראל
NEXT_PUBLIC_INSTAGRAM=https://instagram.com/yourbrand
NEXT_PUBLIC_FACEBOOK=https://facebook.com/yourbrand
```
3. פיתוח:
```bash
npm run dev
```
4. פרודקשן:
```bash
npm run build && npm start
```

### SEO ונגישות
- קומפוננטת `SEO` עם OpenGraph/Twitter + LocalBusiness JSON-LD
- RTL דרך `dir="rtl"` ב-`_document.tsx`
- נגישות: aria, פוקוס, קונטרסט

### אבטחה
- כותרות אבטחה (CSP, X-Frame-Options וכו׳) ב-`next.config.js`
- HTTPS בלבד לקישורים חיצוניים
- סניטיזציה + honeypot בטופס

### פריסה ל-Vercel
- חברו את הריפו ל-Vercel, הגדירו משתני סביבה
- Build: `next build`, Start: `next start`
- `postbuild` מפיק sitemap/robots ל-`public/`

### המשך דרך
- בעתיד: גלריות תמונות, לייטבוקס, אנימציות ועוד


