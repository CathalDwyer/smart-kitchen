import SkeletonCard from "./SkeletonCard";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-4">
      {/* Header card — title, time, difficulty */}
      <div className="bg-stone-900 border border-stone-800 rounded-lg p-4 animate-pulse">
        <div className="h-6 bg-stone-700 rounded w-2/3 mb-4" />
        <div className="flex gap-3">
          <div className="h-4 bg-stone-800 rounded w-20" />
          <div className="h-4 bg-stone-800 rounded w-20" />
          <div className="h-4 bg-stone-800 rounded w-20" />
        </div>
      </div>

      {/* Macro nutrient bars */}
      <div className="bg-stone-900 border border-stone-800 rounded-lg p-4 animate-pulse space-y-3">
        <div className="h-3 bg-stone-800 rounded w-full" />
        <div className="h-3 bg-stone-800 rounded w-5/6" />
        <div className="h-3 bg-stone-800 rounded w-4/6" />
      </div>

      {/* Two-column: missing ingredients + steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SkeletonCard />
        <SkeletonCard />
      </div>

      {/* Cooking steps list */}
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}