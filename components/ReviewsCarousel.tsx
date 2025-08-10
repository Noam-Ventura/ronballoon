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
    return <div className="card p-6 text-gray-500">טוען ביקורות…</div>;
  }

  if (!current) {
    return (
      <div className="card p-6 flex items-center justify-between gap-6">
        <div className="text-gray-700">ביקורות יוצגו כאן בקרוב.</div>
        {mapsUrl && (
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">ראו בגוגל</a>
        )}
      </div>
    );
  }

  return (
    <div className="card p-6 grid gap-4">
      <div className="flex items-center gap-3">
        {current.profilePhotoUrl && (
          <img src={current.profilePhotoUrl} alt="" className="w-10 h-10 rounded-full" />
        )}
        <div className="font-medium">{current.authorName}</div>
        <div className="ms-auto text-sm text-gray-500">{current.relativeTime}</div>
      </div>
      <div className="text-gray-800">{current.text}</div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>דירוג:</span>
        <span className="font-semibold">{current.rating}★</span>
        {mapsUrl && (
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="ms-auto btn btn-secondary">ראו בגוגל</a>
        )}
      </div>
      {reviews && reviews.length > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              aria-label={`slide ${i + 1}`}
              className={`w-2 h-2 rounded-full ${i === idx ? 'bg-brand-600' : 'bg-gray-300'}`}
              onClick={() => setIdx(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}


