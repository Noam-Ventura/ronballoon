export default function FloatingContact() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP || '';
  const email = process.env.NEXT_PUBLIC_EMAIL || '';
  return (
    <div className="fixed bottom-4 left-4 flex flex-col gap-2 z-40">
      <a
        href={`https://wa.me/${phone}`}
        className="btn btn-primary shadow-lg"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="ווטסאפ"
      >
        ווטסאפ
      </a>
      <a href={`mailto:${email}`} className="btn btn-secondary shadow">אימייל</a>
    </div>
  );
}


