import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface CardProps {
  children?: ReactNode
  className: string
  noBorder?: boolean
}

const Card: React.FC<CardProps> = ({ children, className = '', noBorder = false }) => {
  return (
    <div className={twMerge(`${noBorder ? '' : 'border border-gray-300'} p-4 bg-stone-50 rounded-2xl`, className)}>{children}</div>
  )
}

export default Card
