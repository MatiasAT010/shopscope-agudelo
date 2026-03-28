import { useState, useEffect } from 'react'
import { Product, ProductsResponse } from '../types'

export function useProducts(token: string, category?: string) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      setError(null)
      const url = category
        ? `https://dummyjson.com/products/category/${category}`
        : `https://dummyjson.com/products`
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      if (res.status === 401) {
        setError('unauthorized')
        return
      }
      if (!res.ok) {
        setError('Error al cargar productos')
        return
      }
      const data: ProductsResponse = await res.json()
      setProducts(data.products)
      setLoading(false)
    }
    fetchProducts()
  }, [token, category])

  return { products, loading, error }
}