"use client"

import type React from "react"
import { createPortal } from "react-dom"
import { useEffect, useState } from "react"
import { X, Zap } from "lucide-react"

interface SettingsModalProps {
  onClose: () => void
  autoSearch: boolean
  setAutoSearch: (value: boolean) => void
  isAadhar?: boolean
}

export default function SettingsModal({ onClose, autoSearch, setAutoSearch, isAadhar = false }: SettingsModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAutoSearchToggle = () => {
    const newValue = !autoSearch
    setAutoSearch(newValue)
    const storageKey = isAadhar ? "aadharAutoSearch" : "autoSearch"
    localStorage.setItem(storageKey, String(newValue))
  }

  const digitCount = isAadhar ? 12 : 10

  const modalContent = (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg transition">
            <X className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-slate-600 mb-6">Customize your lookup experience</p>

          <div className="space-y-4">
            <SettingToggle
              icon={<Zap className="w-5 h-5" />}
              title="Auto Search"
              description={`Search automatically after entering ${digitCount} digits`}
              checked={autoSearch}
              onChange={handleAutoSearchToggle}
            />
          </div>
        </div>
      </div>
    </div>
  )

  if (!mounted) return null
  return createPortal(modalContent, document.body)
}

interface SettingToggleProps {
  icon: React.ReactNode
  title: string
  description: string
  checked: boolean
  onChange: () => void
}

function SettingToggle({ icon, title, description, checked, onChange }: SettingToggleProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600">{icon}</div>
        <div>
          <p className="font-semibold text-slate-900">{title}</p>
          <p className="text-sm text-slate-600">{description}</p>
        </div>
      </div>
      <button
        onClick={onChange}
        className={`relative w-12 h-7 rounded-full transition ${checked ? "bg-cyan-500" : "bg-slate-300"}`}
      >
        <div
          className={`absolute top-1 w-5 h-5 bg-white rounded-full transition transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  )
}
