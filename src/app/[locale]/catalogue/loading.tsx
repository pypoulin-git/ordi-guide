export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Hero placeholder */}
      <div
        className="w-full"
        style={{
          height: '220px',
          background: 'linear-gradient(135deg, var(--border) 0%, var(--bg-subtle) 50%, var(--border) 100%)',
        }}
      />

      {/* Filter bar placeholder */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-3 mb-8">
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex gap-2 flex-wrap">
              {[0, 1, 2, 3, 4].map((j) => (
                <div
                  key={j}
                  className="h-8 bg-[--border] rounded-full"
                  style={{ width: `${60 + (j * 15) % 40}px` }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Product grid — 6 cards in 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-[--bg-card] rounded-2xl p-5 shadow-sm">
              {/* Badge */}
              <div className="h-5 w-20 bg-[--border] rounded-full mb-3" />
              {/* Title */}
              <div className="h-5 w-3/4 bg-[--border] rounded-lg mb-2" />
              {/* Subtitle */}
              <div className="h-3 w-full bg-[--border] rounded-lg mb-1" />
              <div className="h-3 w-5/6 bg-[--border] rounded-lg mb-4" />
              {/* Specs row */}
              <div className="flex gap-2 mb-4">
                <div className="h-6 w-16 bg-[--border] rounded-full" />
                <div className="h-6 w-16 bg-[--border] rounded-full" />
                <div className="h-6 w-16 bg-[--border] rounded-full" />
              </div>
              {/* Price */}
              <div className="h-7 w-24 bg-[--border] rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
