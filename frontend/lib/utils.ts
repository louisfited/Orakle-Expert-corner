import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import dayjs from 'dayjs'
type num = number | null

const CHECK_PARAGRAPH_TAG_REGEX = /^\s*<p>\s*<\/p>\s*$/

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date?: string) {
  if (!date) return null

  const _date = dayjs(date)
  if (_date.startOf('day').isSame(dayjs().startOf('day'))) {
    return 'Today'
  }

  return dayjs(date).format('MMM D, YYYY')
}

export function calculateDate(date?: num) {
  if ((!date && date != 0) || typeof date === 'string') return null

  const _date = dayjs().add(date, 'day')
  if (_date.startOf('day').isSame(dayjs().startOf('day'))) {
    return 'Today'
  }

  return dayjs(_date).format('MMM D, YYYY')
}

export const shortenString = (str: string, length = 180) => {
  return str?.length > length ? str.substring(0, length) + '...' : str
}

export const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const checkEmptyRichText = (field: string | undefined = '') => {
  return CHECK_PARAGRAPH_TAG_REGEX.test(field)
}

export const languageValue = (value: string) => {
  const lanValue = value ? value : 'en'
  return lanValue
}
