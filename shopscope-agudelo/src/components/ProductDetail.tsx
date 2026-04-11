import { useState, useEffect, useMemo } from 'react'
import { ProductDetail as ProductDetailType } from '../types'

interface Props {
  id: number
  token: string
  onClose: () => void
}

export default function ProductDetail({ id, token, onClose }: Props) {
  const [product, setProduct] = useState<ProductDetailType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDetail() {
      const res = await fetch(`https://dummyjson.com/products/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      const data: ProductDetailType = await res.json()
      setProduct(data)
      setLoading(false)
    }
    fetchDetail()
  }, [id, token])

  const formattedPrice = useMemo(() => {
    if (!product) return ''
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)
  }, [product])

  if (loading) return <p className="text-center p-4">Cargando...</p>
  if (!product) return null

  return (
    <div className="border rounded-lg p-4 flex flex-col gap-3">
      <img src={product.thumbnail} alt={product.title} className="rounded w-full h-48 object-cover" />
      <h2 className="text-xl font-bold">{product.title}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="font-semibold">{formattedPrice}</p>
      <p>Calificacion: {product.rating} / 5</p>
      <p>Categoria: {product.category}</p>
      {product.stock === 0
        ? <p className="text-red-500 font-semibold">Sin stock</p>
        : <p>Stock: {product.stock}</p>
      }
      <button onClick={onClose} className="bg-gray-200 py-2 rounded hover:bg-gray-300">
        Cerrar
      </button>
    </div>
  )
}