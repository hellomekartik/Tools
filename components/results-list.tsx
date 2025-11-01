"use client"

interface ContactData {
  mobile: string
  name: string
  fname: string
  address: string
  alt: string
  circle: string
  id: string
}

interface ResultsListProps {
  results: ContactData[]
  loading: boolean
  searchAttempted: boolean
}

export default function ResultsList({ results, loading, searchAttempted }: ResultsListProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 border-4 border-cyan-200 border-t-cyan-500 rounded-full animate-spin mb-4" />
        <p className="text-lg font-semibold text-slate-900 dark:text-white">Searching...</p>
        <p className="text-slate-600 dark:text-slate-400">Retrieving contact information</p>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-600 dark:text-slate-400">
          {searchAttempted ? "No results found." : "Search a Phone Number for Results"}
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b-4 border-cyan-500">
        Results ({results.length})
      </h3>

      <div className="space-y-6">
        {results.map((result, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition"
          >
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 px-6 py-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white">📌 Result {index + 1}:-</h4>
              <span className="text-xs font-bold bg-slate-200 dark:bg-slate-600 text-slate-900 dark:text-white px-3 py-1 rounded">
                {result.circle}
              </span>
            </div>

            <div className="p-6 space-y-4">
              <ResultField emoji="👤" label="Name" value={result.name} />
              <ResultField emoji="🧔🏻‍♂️" label="Father" value={result.fname} />
              <ResultField emoji="🏠" label="Address" value={result.address.replace(/!/g, ", ")} />
              <ResultField emoji="📱" label="Mobile" value={result.mobile} />
              <ResultField emoji="📞" label="Alt Mobile" value={result.alt || "N/A"} />
              <ResultField emoji="📧" label="Email" value="N/A" />
              <ResultField emoji="🆔" label="ID" value={result.id || "N/A"} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface ResultFieldProps {
  emoji: string
  label: string
  value: string
}

function ResultField({ emoji, label, value }: ResultFieldProps) {
  return (
    <div className="flex gap-3">
      <span className="text-2xl flex-shrink-0">{emoji}</span>
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}:</p>
        <p className="text-slate-900 dark:text-white break-words">{value}</p>
      </div>
    </div>
  )
}
