'use client'
import { createContext, useContext, useState } from 'react'

const AdminContext = createContext<{ loggedIn: boolean; setLoggedIn: (v: boolean) => void } | null>(null)

export function useAdmin(): { loggedIn: boolean; setLoggedIn: (v: boolean) => void } {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within Providers')
  return ctx
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    <AdminContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AdminContext.Provider>
  )
}
