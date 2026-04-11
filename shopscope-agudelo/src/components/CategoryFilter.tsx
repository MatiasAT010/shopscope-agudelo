import { Category } from '../types'

interface Props {
  categories: Category[]
  selected: string | undefined
  onSelect: (slug: string | undefined) => void
}

export default function CategoryFilter({ categories, selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2 my-4">
      <button
        onClick={() => onSelect(undefined)}
        className={`px-3 py-1 rounded-full border ${!selected ? 'bg-cyan-600 text-white' : ''}`}
      >
        Todos
      </button>
      {categories.map(cat => (
        <button
          key={cat.slug}
          onClick={() => onSelect(cat.slug)}
          className={`px-3 py-1 rounded-full border ${selected === cat.slug ? 'bg-cyan-600 text-white' : ''}`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}