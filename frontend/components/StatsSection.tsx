'use client'

import { Users, Award, Globe, CheckCircle } from 'lucide-react'

const stats = [
  { icon: Users, value: '500+', label: 'Acteurs Accrédités' },
  { icon: Award, value: '15+', label: 'Années d\'Excellence' },
  { icon: Globe, value: '12', label: 'Régions Couvertes' },
  { icon: CheckCircle, value: '100%', label: 'Qualité Garantie' },
]

export default function StatsSection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#CC0000' }}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold mb-2" style={{ color: '#333333' }}>{stat.value}</div>
                <div className="font-medium" style={{ color: '#333333' }}>{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
