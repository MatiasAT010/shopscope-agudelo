import { Product } from '../types'

interface Props {
  product: Product
  onSelect: (id: number) => void
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
}

export default function ProductCard({ product, onSelect, isFavorite, onToggleFavorite }: Props) {
  return (
    <div className="border rounded-lg p-3 flex flex-col gap-2">
      <img src={product.thumbnail} alt={product.title} className="rounded w-full h-40 object-cover" />
      <p className="font-semibold">{product.title}</p>
      <p className="text-gray-500">${product.price}</p>
      <p className="text-yellow-500">{product.rating} / 5</p>
      <div className="flex gap-2">
        <button onClick={() => onSelect(product.id)} className="flex-1 bg-cyan-600 text-white py-1 rounded hover:bg-cyan-700">
          Ver detalle
        </button>
        <button onClick={() => onToggleFavorite(product.id)} className="border px-3 py-1 rounded">
          {isFavorite ? 'Quitar' : 'Favorito'}
        </button>
      </div>
    </div>
  )
}