import type { NextApiRequest, NextApiResponse } from 'next';

type Review = {
  authorName: string;
  text: string;
  rating: number;
  relativeTime: string;
  profilePhotoUrl?: string;
};

type ReviewsResponse =
  | { ok: true; rating: number; total: number; url?: string; reviews?: Review[] }
  | { ok: false; error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReviewsResponse>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) {
    return res.status(200).json({ ok: false, error: 'Missing API key or place id' });
  }

  try {
    const includeReviews = String(req.query.withReviews || '0') === '1';
    const fields = ['rating', 'user_ratings_total', 'url'];
    if (includeReviews) fields.push('reviews');

    const params = new URLSearchParams({
      place_id: placeId,
      fields: fields.join(','),
      key: apiKey,
      language: 'he',
      reviews_sort: 'most_relevant',
      reviews_no_translations: 'false',
    });
    const url = `https://maps.googleapis.com/maps/api/place/details/json?${params.toString()}`;
    const r = await fetch(url);
    if (!r.ok) throw new Error('Failed to fetch');
    const data = await r.json();
    const details = data?.result;
    const rating = Number(details?.rating ?? 0);
    const total = Number(details?.user_ratings_total ?? 0);
    const mapsUrl: string | undefined = details?.url;
    let reviews: Review[] | undefined;

    if (includeReviews && Array.isArray(details?.reviews)) {
      reviews = details.reviews
        .filter((rv: any) => rv?.text && rv?.rating)
        .map((rv: any) => ({
          authorName: rv.author_name,
          text: rv.text,
          rating: Number(rv.rating) || 0,
          relativeTime: rv.relative_time_description,
          profilePhotoUrl: rv.profile_photo_url,
        }))
        .slice(0, 8);
    }

    if (!rating || !total) {
      return res.status(200).json({ ok: false, error: 'No rating data' });
    }
    return res.status(200).json({ ok: true, rating, total, url: mapsUrl, reviews });
  } catch (e) {
    return res.status(200).json({ ok: false, error: 'Unexpected error' });
  }
}


