import { useEffect, useState } from 'react';

type State = {
  status: 'idle' | 'loading' | 'ready' | 'error' | 'empty';
  rating?: number;
  total?: number;
  url?: string;
};

export default function ReviewsSummary() {
  const [state, setState] = useState<State>({ status: 'idle' });
  const mapsPublicUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL;

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setState({ status: 'loading' });
        const r = await fetch('/api/reviews');
        const data = await r.json();
        if (!mounted) return;
        if (data?.ok) {
          setState({ status: 'ready', rating: data.rating, total: data.total, url: data.url });
        } else {
          setState({ status: 'empty' });
        }
      } catch {
        if (!mounted) return;
        setState({ status: 'error' });
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (state.status === 'loading') {
    return <div className="card p-4 sm:p-6 text-gray-500 text-sm sm:text-base">טוען חוות דעת…</div>;
  }
  if (state.status === 'error' || state.status === 'empty' || state.status === 'idle') {
    return (
      <div className="card p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="text-gray-700 text-sm sm:text-base text-center sm:text-right">סיכום חוות דעת יוצג כאן בקרוב.</div>
        {mapsPublicUrl && (
          <a href={mapsPublicUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary min-h-[48px] px-4 py-2 text-sm">
            ראו בגוגל
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="card p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
      <div className="text-center sm:text-right">
        <div className="text-base sm:text-lg font-bold">דירוג גוגל</div>
        <div className="text-gray-700 text-sm sm:text-base">{state.rating?.toFixed(1)} / 5 ({state.total} ביקורות)</div>
      </div>
      {state.url && (
        <a href={state.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary min-h-[48px] px-4 py-2 text-sm">ראו חוות דעת</a>
      )}
    </div>
  );
}


