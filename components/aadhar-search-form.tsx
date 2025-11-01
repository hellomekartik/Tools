"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"

interface AadharSearchFormProps {
  onSearch: (aadhar: string) => void
  loading: boolean
  onAadharNumberChange: (aadhar: string) => void
  aadharNumber: string
  searchAttempted: boolean
  onSearchAttempt: () => void
}

export default function AadharSearchForm({
  onSearch,
  loading,
  onAadharNumberChange,
  aadharNumber,
  searchAttempted,
  onSearchAttempt,
}: AadharSearchFormProps) {
  const [localAadhar, setLocalAadhar] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 12)
    setLocalAadhar(value)
    onAadharNumberChange(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearchAttempt()

    if (localAadhar.length === 12) {
      onSearch(localAadhar)
    }
  }

  const isValidLength = localAadhar.length === 12

  return (
    <div className="max-w-2xl mx-auto mb-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-2">Search Aadhar Information</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-slate-200 flex flex-col gap-4"
      >
        <label className="block text-sm font-semibold text-slate-900">Aadhar Number</label>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={localAadhar}
            onChange={handleInputChange}
            placeholder="Enter 12-digit aadhar number"
            maxLength={12}
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
