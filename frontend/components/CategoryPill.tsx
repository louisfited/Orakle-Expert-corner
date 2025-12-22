import { X } from 'lucide-react'

interface CategoryPillProps {
  label: string
  onRemove: () => void
}

export function CategoryPill({ label, onRemove }: CategoryPillProps) {
  return (
    <div className="inline-flex items-center gap-2 bg-textDark text-white rounded-full px-3 py-1.5 whitespace-nowrap">
      <span className="text-[15px] font-normal text-white whitespace-nowrap">{label}</span>
      <button
        onClick={onRemove}
        className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

interface CategoryPillListProps {
  categories: { key: string; label: string }[]
  onRemove: (key: string) => void
}

export function CategoryPillList({ categories, onRemove }: CategoryPillListProps) {
  if (categories.length === 0) return null

  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
      {categories.map(({ key, label }) => (
        <CategoryPill
          key={key}
          label={label}
          onRemove={() => onRemove(key)}
        />
      ))}
    </div>
  )
}
