import { useState } from 'react'
import { AuthResponse } from '../types'

export function useAuth() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('shopscope_token')
  )

  async function login(username: string, password: string) {
    const res = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const data: AuthResponse = await res.json()
    if (!res.ok) throw new Error('Credenciales incorrectas')
    localStorage.setItem('shopscope_token', data.accessToken)
    setToken(data.accessToken)
  }

  function logout() {
    localStorage.removeItem('shopscope_token')
    setToken(null)
  }

  return { token, login, logout }
}