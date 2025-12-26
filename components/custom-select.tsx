"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Search } from "lucide-react"

interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
  options: Array<{ value: string; label: string }>
  disabled?: boolean
  label?: string
  searchable?: boolean
}

export default function CustomSelect({
  value,
  onChange,
  options,
  disabled = false,
  label,
  searchable = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen, searchable])

  const selectedOption = options.find((opt) => opt.value === value)

  const filteredOptions = searchable
    ? options.filter((opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : options

  return (
    <div ref={containerRef} className="relative w-full">
      {label && <label className="block text-sm font-semibold text-slate-900 mb-2">{label}</label>}
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900 bg-white cursor-pointer flex items-center justify-between hover:border-emerald-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
      >
        <span className="truncate">{selectedOption?.label || "Select..."}</span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-white rounded-2xl shadow-2xl z-[100] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {searchable && (
            <div className="p-2 border-b border-slate-100 sticky top-0 bg-white/50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>
          )}
          <div className="max-h-64 overflow-y-auto custom-scrollbar">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-8 text-slate-400 text-center text-sm">No results found</div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                    setSearchQuery("")
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-emerald-50 transition-all duration-200 flex items-center gap-3 text-sm ${
                    value === option.value
                      ? "bg-emerald-50 text-emerald-700 font-bold"
                      : "text-slate-600 hover:text-emerald-600"
                  }`}
                >
                  {value === option.value && (
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  )}
                  <span>{option.label}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
