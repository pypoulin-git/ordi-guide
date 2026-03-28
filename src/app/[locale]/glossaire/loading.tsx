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

      {/* Letter nav bar */}
      <div style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', padding: '1rem 0' }}>
        <div className="max-w-5xl mx-auto px-4 flex gap-1.5 flex-wrap justify-center">
          {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((l) => (
            <div key={l} className="h-8 w-8 bg-[var(--border)] rounded-lg" />
          ))}
        </div>
      </div>

      {/* Term cards */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="bg-[var(--bg-card)] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-6 w-32 bg-[var(--border)] rounded-lg" />
              <div className="h-5 w-16 bg-[var(--border)] rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-[var(--border)] rounded-lg" />
              <div className="h-3 w-full bg-[var(--border)] rounded-lg" />
              <div className="h-3 w-3/4 bg-[var(--border)] rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
