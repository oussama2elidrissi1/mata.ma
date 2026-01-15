'use client'

interface AdminHeaderProps {
  title: string
  subtitle: string
  actions?: React.ReactNode
}

export default function AdminHeader({ title, subtitle, actions }: AdminHeaderProps) {
  return (
    <header className="bg-blue-900 shadow-md border-b border-blue-800">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white font-serif tracking-tight">{title}</h1>
            <p className="text-sm text-blue-200 mt-1 font-normal">{subtitle}</p>
          </div>
          {actions && (
            <div className="flex items-center gap-3">
              {actions}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
