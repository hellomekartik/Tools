"use client"

import type React from "react"

import { Search } from "lucide-react"

interface SearchFormProps {
  onSearch: (phoneNumber: string) => void
  loading: boolean
  onPhoneNumberChange: (phoneNumber: string) => void
  phoneNumber: string
  searchAttempted: boolean
  onSearchAttempt: () => void
}

export default function SearchForm({
  onSearch,
  loading,
  onPhoneNumberChange,
  phoneNumber,
  searchAttempted,
  onSearchAttempt,
}: SearchFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearchAttempt()
    if (phoneNumber.length === 10) {
      onSearch(phoneNumber)
    }
  }

  const isValidLength = phoneNumber.length === 10
  const showValidationError = searchAttempted && phoneNumber.length !== 10

  return (
    <div className="max-w-2xl mx-auto mb-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-2">Search Contact Information</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-slate-200 flex flex-col gap-4"
      >
        <label className="block text-sm font-semibold text-slate-900">Phone Number</label>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => onPhoneNumberChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="Enter 10-digit mobile number"
            maxLength={10}
            className="flex-1 px-4 py-3 bg-blue-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 placeholder-slate-500 min-w-0"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !isValidLength}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-400 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2 whitespace-nowrap sm:w-auto w-full"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Search
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
