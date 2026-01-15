'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  BarChart3,
  CheckCircle2,
  Clock,
  XCircle,
  Award,
  UserCog,
  Calendar,
  Newspaper,
  Building2
} from 'lucide-react'

interface MenuItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
}

export default function Sidebar() {
  const pathname = usePathname()

  const menuItems: MenuItem[] = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Acteurs', href: '/admin/actors', icon: Users },
    { name: 'Associations', href: '/admin/associations', icon: Building2 },
    { name: 'Accréditations', href: '/admin/accreditations', icon: Award },
    { name: 'Demandes en attente', href: '/admin/pending', icon: Clock },
    { name: 'Événements', href: '/admin/events', icon: Calendar },
    { name: 'Actualités', href: '/admin/news', icon: Newspaper },
    { name: 'Suspendus', href: '/admin/suspended', icon: XCircle },
    { name: 'Utilisateurs', href: '/admin/users', icon: UserCog },
    { name: 'Statistiques', href: '/admin/stats', icon: BarChart3 },
    { name: 'Paramètres', href: '/admin/settings', icon: Settings },
  ]

  return (
    <aside className="w-64 bg-blue-900 min-h-screen text-white">
      <div className="p-6 border-b border-blue-800">
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="text-3xl font-bold text-red-500 tracking-tight" style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.3), -1px -1px 2px rgba(255,255,255,0.2)',
              letterSpacing: '-0.02em'
            }}>
              MATA
            </span>
          </div>
          <div>
            <h2 className="font-bold text-lg text-white">Admin</h2>
            <p className="text-xs text-blue-200">Administration</p>
          </div>
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || 
                           (item.href !== '/admin' && pathname?.startsWith(item.href))
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-800 text-white'
                      : 'text-blue-200 hover:bg-blue-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
