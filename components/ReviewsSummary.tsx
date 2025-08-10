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
    return <div className="card p-6 text-gray-500">טוען חוות דעת…</div>;
  }
  if (state.status === 'error' || state.status === 'empty' || state.status === 'idle') {
    return (
      <div className="card p-6 flex items-center justify-between gap-6">
        <div className="text-gray-700">סיכום חוות דעת יוצג כאן בקרוב.</div>
        {mapsPublicUrl && (
          <a href={mapsPublicUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            ראו בגוגל
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="card p-6 flex items-center justify-between gap-6">
      <div>
        <div className="text-lg font-bold">דירוג גוגל</div>
        <div className="text-gray-700">{state.rating?.toFixed(1)} / 5 ({state.total} ביקורות)</div>
      </div>
      {state.url && (
        <a href={state.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">ראו חוות דעת</a>
      )}
    </div>
  );
}


