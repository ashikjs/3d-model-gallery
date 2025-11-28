'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-slate-900 to-slate-700">
      <div className="text-center p-8">
        <h2 className="text-3xl font-bold text-white mb-4">Something went wrong!</h2>
        <p className="text-white/70 mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
