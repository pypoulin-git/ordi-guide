export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Hero placeholder */}
      <div
        className="w-full"
        style={{
          height: '220px',
          background: 'linear-gradient(135deg, var(--border) 0%, var(--bg-subtle) 100%)',
        }}
      />

      {/* Table of contents placeholder */}
      <div className="max-w-3xl mx-auto px-4 py-5">
        <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm">
          <div className="h-5 w-36 bg-[var(--border)] rounded-lg mb-4" />
          <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 bg-[var(--border)] rounded-full" />
            ))}
          </div>
        </div>
      </div>

      {/* Section placeholders */}
      <div className="max-w-3xl mx-auto px-4 pb-12 space-y-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-[var(--border)] rounded-xl shrink-0" />
              <div className="h-6 w-48 bg-[var(--border)] rounded-lg" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-[var(--border)] rounded-lg" />
              <div className="h-3 w-full bg-[var(--border)] rounded-lg" />
              <div className="h-3 w-5/6 bg-[var(--border)] rounded-lg" />
              <div className="h-3 w-2/3 bg-[var(--border)] rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
