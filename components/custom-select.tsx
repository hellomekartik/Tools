"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
  options: Array<{ value: string; label: string }>
  disabled?: boolean
  label?: string
}

export default function CustomSelect({ value, onChange, options, disabled = false, label }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <div ref={containerRef} className="relative w-full">
      {label && <label className="block text-sm font-semibold text-slate-900 mb-2">{label}</label>}
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 bg-white cursor-pointer flex items-center justify-between hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{selectedOption?.label || "Select an option"}</span>
        <ChevronDown className={`w-5 h-5 text-slate-600 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-300 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className={`w-full px-4 py-3 text-left hover:bg-cyan-50 transition flex items-center gap-3 ${
                value === option.value ? "bg-cyan-100 text-cyan-900 font-semibold" : "text-slate-900"
              }`}
            >
              {value === option.value && <div className="w-2 h-2 bg-cyan-500 rounded-full" />}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
