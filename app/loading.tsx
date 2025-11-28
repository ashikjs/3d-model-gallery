export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-slate-900 to-slate-700">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mb-4"></div>
        <p className="text-white text-xl font-semibold">Loading 3D Model...</p>
        <p className="text-white/70 text-sm mt-2">Please wait while we prepare your experience</p>
      </div>
    </div>
  );
}
