import type { Metadata } from 'next'
import { Poppins, Playfair_Display } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/components/AuthProvider'
import { LanguageProvider } from '@/lib/i18n'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'MATA - Moroccan Accredited Tourism Actors Directory',
  description: 'Annuaire des Acteurs du Tourisme Accrédités au Maroc',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${poppins.variable} ${playfair.variable}`} dir="ltr">
      <body className={poppins.className} style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
        <LanguageProvider>
          <AuthProvider>{children}</AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
