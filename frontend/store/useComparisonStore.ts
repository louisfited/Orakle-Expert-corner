'use client'
import { create } from 'zustand'

type CompareModalState = {
  isOpen: boolean
  beforeImage: string | null
  afterImage: string | null

  openModal: (beforeImage: string, afterImage: string) => void
  closeModal: () => void
}

export const useComparisonStore = create<CompareModalState>((set) => ({
  isOpen: true,
  beforeImage: null,
  afterImage: null,

  openModal: (beforeImage?, afterImage?) =>
    set({
      isOpen: true,
      beforeImage,
      afterImage,
    }),

  closeModal: () =>
    set({
      isOpen: false,
      beforeImage: null,
      afterImage: null,
    }),
}))
