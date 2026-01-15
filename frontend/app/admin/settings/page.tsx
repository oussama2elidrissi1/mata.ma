'use client'

import { Settings as SettingsIcon } from 'lucide-react'
import AdminHeader from '@/components/admin/AdminHeader'

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader
        title="Paramètres"
        subtitle="Configuration de l'administration"
      />

      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <SettingsIcon className="w-6 h-6 text-blue-900" />
            <h2 className="text-lg font-semibold text-gray-900">Paramètres du système</h2>
          </div>
          <p className="text-gray-600">Les paramètres seront disponibles prochainement.</p>
        </div>
      </div>
    </div>
  )
}
