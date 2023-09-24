import './globals.sass'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Jecrevin: JS Calculator',
  description: 'Jecrevin\'s online Javascript calculator'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <html lang="en">
      <body className='w-screen min-h-screen flex justify-center items-center'>
        {children}
      </body>
    </html>
  )
}
