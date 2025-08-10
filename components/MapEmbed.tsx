type Props = {
  className?: string;
};

export default function MapEmbed({ className }: Props) {
  const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;
  if (!mapsKey || !placeId) {
    return (
      <div id="map" className={`aspect-video w-full rounded-2xl bg-gray-100 grid place-items-center ${className ?? ''}`}>
        <span className="text-gray-500">מפת גוגל תוצג כאן (הגדירו משתני סביבה)</span>
      </div>
    );
  }
  const src = `https://www.google.com/maps/embed/v1/place?key=${mapsKey}&q=place_id:${placeId}`;
  return (
    <iframe
      id="map"
      className={`aspect-video w-full rounded-2xl border-0 ${className ?? ''}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      src={src}
      aria-label="Google Map"
    />
  );
}


