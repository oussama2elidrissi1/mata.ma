'use client'

import { CheckCircle2 } from 'lucide-react'

const benefits = [
  'Certification rigoureuse et contrôle qualité',
  'Professionnels expérimentés et formés',
  'Standards internationaux de service',
  'Support et assistance continue',
]

export default function WhyChooseMata() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif tracking-tight" style={{ color: '#333333' }}>
              Pourquoi Choisir MATA?
            </h2>
            <p className="text-lg mb-8" style={{ color: '#333333' }}>
              MATA garantit la qualité et le professionnalisme des acteurs du tourisme marocain à travers un système d'accréditation rigoureux.
            </p>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#CC0000' }} />
                  <span className="text-lg" style={{ color: '#333333' }}>{benefit}</span>
                </li>
              ))}
            </ul>
            <button 
              className="mt-8 px-8 py-3 border-2 rounded-lg transition-colors font-semibold"
              style={{ borderColor: '#CC0000', color: '#CC0000' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#CC0000'
                e.currentTarget.style.color = '#FFFFFF'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#CC0000'
              }}
            >
              En Savoir Plus
            </button>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, rgba(204, 0, 0, 0.1), rgba(204, 0, 0, 0.05))' }}>
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2" style={{ color: '#CC0000' }}>500+</div>
                  <div className="text-2xl" style={{ color: '#333333' }}>Acteurs Certifiés</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
