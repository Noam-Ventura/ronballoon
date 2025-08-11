export default function FloatingContact() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP || '';
  const email = process.env.NEXT_PUBLIC_EMAIL || '';
  return (
    <div className="fixed bottom-4 left-4 flex flex-col gap-2 z-40">
      <a
        href={`https://wa.me/${phone}`}
        className="btn btn-primary shadow-lg min-h-[48px] min-w-[48px] px-3 py-2 text-sm sm:text-base flex items-center justify-center"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="ווטסאפ"
      >
        ווטסאפ
      </a>
      <a 
        href={`mailto:${email}`} 
        className="btn btn-secondary shadow min-h-[48px] min-w-[48px] px-3 py-2 text-sm sm:text-base flex items-center justify-center"
        aria-label="אימייל"
      >
        אימייל
      </a>
    </div>
  );
}


