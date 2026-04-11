import { useState } from 'react'

interface Props {
  onLogin: (username: string, password: string) => Promise<void>
}

export default function LoginForm({ onLogin }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleLogin() {
    try {
      setError(null)
      await onLogin(username, password)
    } catch {
      setError('Credenciales incorrectas')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col gap-4 w-80">
        <h1 className="text-2xl font-bold text-center">ShopScope</h1>
        <input
          className="border rounded px-3 py-2"
          placeholder="Usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="border rounded px-3 py-2"
          type="password"
          placeholder="Contrasena"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          className="bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition"
          onClick={handleLogin}
        >
          Iniciar sesion
        </button>
      </div>
    </div>
  )
}