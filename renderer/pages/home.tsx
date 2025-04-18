import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import CustomToolbar from '../components/CustomToolbar'

export default function HomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron App</title>
      </Head>
      <CustomToolbar />
      <div className="bg-[var(--color-background)] text-[var(--color-text)] flex flex-col items-center justify-center h-screen font-sans text-center">
        <h1 className="text-4xl mb-4">Welcome to My Nextron App</h1>
        <div className="space-x-4">
          <Link href="/about">
            <button className="bg-gray-700 text-[var(--color-text)] py-2 px-4 rounded hover:bg-gray-500">About</button>
          </Link>
          <button className="bg-gray-700 text-[var(--color-text)] py-2 px-4 rounded hover:bg-gray-500">Button 2</button>
        </div>
      </div>
    </React.Fragment>
  )
}
