import { useState, useCallback, useMemo } from 'react'
import { useAuth } from './hooks/useAuth'
import { useProducts } from './hooks/useProducts'
import LoginForm from './components/LoginForm'
import ProductCard from './components/ProductCard'
import ProductDetail from './components/ProductDetail'
import CategoryFilter from './components/CategoryFilter'
import { Category } from './types'

export default function App() {
  const { token, login, logout } = useAuth()
  const [category, setCategory] = useState<string | undefined>(undefined)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const { products, loading, error } = useProducts(token ?? '', category)

  useState(() => {
    if (!token) return
    fetch('https://dummyjson.com/products/categories', {
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setCategories(data))
  })

  const toggleFavorite = useCallback((id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }, [])

  const favCount = useMemo(() => favorites.length, [favorites])

  if (!token) return <LoginForm onLogin={login} />

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ShopScope</h1>
        <div className="flex items-center gap-4">
          <span>Favoritos: {favCount}</span>
          <button onClick={logout} className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
            Cerrar sesion
          </button>
        </div>
      </div>

      <CategoryFilter categories={categories} selected={category} onSelect={setCategory} />

      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">Error al cargar productos</p>}

      {selectedId && (
        <ProductDetail id={selectedId} token={token} onClose={() => setSelectedId(null)} />
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={setSelectedId}
            isFavorite={favorites.includes(product.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  )
}