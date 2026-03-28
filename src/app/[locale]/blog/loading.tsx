export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Hero placeholder — dark background like the real blog hero */}
      <div
        className="w-full"
        style={{
          height: '200px',
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Category filter bar */}
        <div className="flex gap-2 flex-wrap mb-8">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-8 bg-[var(--border)] rounded-full"
              style={{ width: `${70 + (i * 12) % 30}px` }}
            />
          ))}
        </div>

        {/* Featured article — large card */}
        <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="h-48 md:w-1/2 bg-[var(--border)] rounded-xl" />
            <div className="flex-1 space-y-3">
              <div className="h-5 w-24 bg-[var(--border)] rounded-full" />
              <div className="h-7 w-3/4 bg-[var(--border)] rounded-lg" />
              <div className="h-3 w-full bg-[var(--border)] rounded-lg" />
              <div className="h-3 w-full bg-[var(--border)] rounded-lg" />
              <div className="h-3 w-2/3 bg-[var(--border)] rounded-lg" />
              <div className="h-4 w-28 bg-[var(--border)] rounded-lg mt-4" />
            </div>
          </div>
        </div>

        {/* 3 small article cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-[var(--bg-card)] rounded-2xl p-5 shadow-sm">
              <div className="h-32 w-full bg-[var(--border)] rounded-xl mb-4" />
              <div className="h-4 w-20 bg-[var(--border)] rounded-full mb-2" />
              <div className="h-5 w-3/4 bg-[var(--border)] rounded-lg mb-2" />
              <div className="h-3 w-full bg-[var(--border)] rounded-lg mb-1" />
              <div className="h-3 w-5/6 bg-[var(--border)] rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
