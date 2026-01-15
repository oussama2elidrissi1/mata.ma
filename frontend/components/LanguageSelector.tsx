'use client'

import { Globe } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'

export default function LanguageSelector() {
  const { language, setLanguage } = useTranslation()

  const languages = [
    { code: 'fr', label: 'FR', name: 'Français' },
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'ar', label: 'AR', name: 'العربية' },
  ]

  return (
    <div className="relative group">
      <button className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-semibold text-sm hover:bg-blue-800 transition-colors">
        {languages.find(l => l.code === language)?.label || 'FR'}
      </button>
      
      <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[150px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code as 'fr' | 'en' | 'ar')}
            className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center justify-between ${
              language === lang.code ? 'bg-blue-50 text-blue-900' : 'text-gray-700'
            }`}
          >
            <span className="font-medium">{lang.name}</span>
            {language === lang.code && (
              <span className="text-blue-900">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
