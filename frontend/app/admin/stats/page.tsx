'use client'

import DashboardStats from '@/components/admin/DashboardStats'
import AdminHeader from '@/components/admin/AdminHeader'

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader
        title="Statistiques"
        subtitle="Analyse détaillée des données"
      />

      <div className="p-6">
        <DashboardStats />
      </div>
    </div>
  )
}
