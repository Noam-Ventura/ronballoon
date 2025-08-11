import { useEffect, useMemo, useRef, useState } from 'react';

type Review = {
  authorName: string;
  text: string;
  rating: number;
  relativeTime: string;
  profilePhotoUrl?: string;
};

export default function ReviewsCarousel() {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<number | null>(null);
  const mapsUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL;

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const r = await fetch('/api/reviews?withReviews=1');
        const data = await r.json();
        if (!mounted) return;
        if (data?.ok && Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviews(data.reviews);
        } else {
          setReviews([]);
        }
      } catch {
        if (!mounted) return;
        setReviews([]);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!reviews || reviews.length <= 1) return;
    timerRef.current && window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setIdx((i) => (i + 1) % reviews.length);
    }, 5000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [reviews]);

  const current = useMemo(() => (reviews && reviews.length ? reviews[idx] : null), [reviews, idx]);

  if (reviews === null) {
    return <div className="card p-4 sm:p-6 text-gray-500 text-sm sm:text-base">טוען ביקורות…</div>;
  }

  if (!current) {
    return (
      <div className="card p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="text-gray-700 text-sm sm:text-base text-center sm:text-right">ביקורות יוצגו כאן בקרוב.</div>
        {mapsUrl && (
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary min-h-[48px] px-4 py-2 text-sm">ראו בגוגל</a>
        )}
      </div>
    );
  }

  return (
    <div className="card p-4 sm:p-6 grid gap-3 sm:gap-4">
      <div className="flex items-center gap-3">
        {current.profilePhotoUrl && (
          <img src={current.profilePhotoUrl} alt="" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
        )}
        <div className="font-medium text-sm sm:text-base">{current.authorName}</div>
        <div className="ms-auto text-xs sm:text-sm text-gray-500">{current.relativeTime}</div>
      </div>
      <div className="text-gray-800 text-sm sm:text-base leading-relaxed">{current.text}</div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs sm:text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span>דירוג:</span>
          <span className="font-semibold">{current.rating}★</span>
        </div>
        {mapsUrl && (
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary min-h-[48px] px-4 py-2 text-sm w-full sm:w-auto">ראו בגוגל</a>
        )}
      </div>
      {reviews && reviews.length > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              aria-label={`slide ${i + 1}`}
              className={`w-2 h-2 rounded-full min-h-[8px] min-w-[8px] ${i === idx ? 'bg-brand-600' : 'bg-gray-300'}`}
              onClick={() => setIdx(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}


