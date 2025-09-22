import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Nextn',
  description: 'Fixed minimal app layout',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
