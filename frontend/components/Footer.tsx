'use client'

import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* MATA Info */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <span 
                  className="text-4xl font-black text-red-500 uppercase tracking-tighter"
                  style={{
                    textShadow: '3px 3px 6px rgba(0,0,0,0.4), -1px -1px 2px rgba(255,255,255,0.3), 1px 1px 0px rgba(0,0,0,0.2)',
                    letterSpacing: '-0.03em',
                    fontWeight: 900,
                    fontFamily: 'Arial, sans-serif',
                  }}
                >
                  MATA
                </span>
              </div>
              <div className="flex flex-col justify-center border-l border-gray-600 pl-4">
                <p className="text-xs text-gray-300 font-normal leading-tight">
                  Moroccan Accredited
                </p>
                <p className="text-xs text-gray-300 font-normal leading-tight">
                  Tourism Actors
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              Plateforme de référence pour les professionnels du tourisme. Annuaire, ressources et réseau collaboratif.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/actors" className="text-gray-300 hover:text-white transition-colors">
                  Annuaire
                </Link>
              </li>
              <li>
                <Link href="/accreditation" className="text-gray-300 hover:text-white transition-colors">
                  Accréditation
                </Link>
              </li>
              <li>
                <Link href="/join" className="text-gray-300 hover:text-white transition-colors">
                  Adhérer
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-300 hover:text-white transition-colors">
                  Actualités
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h4 className="font-semibold mb-4">Informations</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-gray-300 hover:text-white transition-colors">
                  Partenaires
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Avenue Mohammed V, Rabat, Maroc</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="text-gray-300">+212 5 37 XX XX XX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:contact@mata.ma" className="text-gray-300 hover:text-white transition-colors">
                  contact@mata.ma
                </a>
              </li>
            </ul>
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-900 pt-8 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} MATA - Tourisme Accrédité. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
