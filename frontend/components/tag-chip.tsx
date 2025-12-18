'use client'

interface TagChipProps {
  title: string | null
  pressed: boolean
  onClick?: () => void
}

export const TagChip = ({ title, pressed, onClick }: TagChipProps) => {
  const fill = pressed ? 'bg-textDark text-white' : 'bg-textPrimary bg-opacity-5 text-textDark'

  return (
    <div
      className={`py-3 px-5 rounded-2xl w-fit border-2 text-lg font-medium cursor-pointer ${fill}`}
      onClick={onClick}
    >
      {title}
    </div>
  )
}
