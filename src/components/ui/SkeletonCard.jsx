export default function SkeletonCard({ className = "" }) {
  return (
    <div
      className={`bg-stone-900 border border-stone-800 rounded-lg p-4 animate-pulse ${className}`}
    >
      <div className="h-4 bg-stone-700 rounded w-3/4 mb-3" />
      <div className="h-3 bg-stone-800 rounded w-1/2 mb-2" />
      <div className="h-3 bg-stone-800 rounded w-full" />
    </div>
  );
}