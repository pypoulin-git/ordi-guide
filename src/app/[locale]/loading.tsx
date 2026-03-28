export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Hero placeholder */}
      <div className="w-full h-64 bg-[var(--border)]" />

      {/* Content area */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Heading placeholder */}
        <div className="h-8 w-72 bg-[var(--border)] rounded-xl mx-auto mb-4" />
        <div className="h-4 w-96 max-w-full bg-[var(--border)] rounded-lg mx-auto mb-12" />

        {/* 3 feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm">
              <div className="h-10 w-10 bg-[var(--border)] rounded-xl mb-4" />
              <div className="h-5 w-40 bg-[var(--border)] rounded-lg mb-3" />
              <div className="h-3 w-full bg-[var(--border)] rounded-lg mb-2" />
              <div className="h-3 w-3/4 bg-[var(--border)] rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
