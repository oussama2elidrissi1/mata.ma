'use client'

import { usePathname } from 'next/navigation'
import Sidebar from '@/components/admin/Sidebar'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Ne pas protéger la page de login - pas de sidebar ni de layout
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  )
}
