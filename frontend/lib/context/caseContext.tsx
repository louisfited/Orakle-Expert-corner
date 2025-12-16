import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import _ from 'lodash'
import { MedicalCase, MedicalCaseV2, PatientCase } from '@/interface'
import { Tables } from '@/lib/types/database.types'

const addIdsAndReviewed = (items: any[]) => items?.map((i) => ({ ...i, id: i.id, reviewed: i.reviewed ?? false }))

const defaultValue = {
  medicalCase: null as MedicalCase | null,
  setMedicalCase: (_: MedicalCase | null) => {},
  medicalCaseV2: null as MedicalCaseV2 | null,
  setMedicalCaseV2: (_: MedicalCaseV2 | null) => {},
  patientCase: null as PatientCase | null,
  setPatientCase: (_: PatientCase | null) => {},
  medicalCaseId: null as string | null,
  setMedicalCaseId: (_: string | null) => {},
  medicalCaseV2Id: null as string | null,
  setMedicalCaseV2Id: (_: string | null) => {},
  bookmark: null as any,
  likes: null as any,
  setBookmark: (_: Tables<'bookmarks'> | null) => {},
  setLikes: (_: Tables<'likes'> | null) => {},
  navbarTitle: '',
  setNavbarTitle: (_: string) => {},
  isFormDirty: false,
  updateItemToReview: (_item: any, _type?: string, _version?: 'v2') => {},
  removeItemFromReview: (_item: any, _type?: string, _version?: 'v2') => {},
}

const CaseContext = createContext(defaultValue)

export const CaseContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [medicalCase, setMedicalCase] = useState<MedicalCase | null>(null)
  const [medicalCaseV2, setMedicalCaseV2] = useState<MedicalCaseV2 | null>(null)
  const [patientCase, setPatientCase] = useState<PatientCase | null>(null)
  const [medicalCaseId, setMedicalCaseId] = useState<string | null>(null)
  const [medicalCaseV2Id, setMedicalCaseV2Id] = useState<string | null>(null)
  const [bookmark, setBookmark] = useState<Tables<'bookmarks'> | null>(null)
  const [likes, setLikes] = useState<Tables<'likes'> | null>(null)
  const [navbarTitle, setNavbarTitle] = useState<string>('')
  const [isFormDirty, setIsFormDirty] = useState(false)

  const [initialMedicalCaseV2, setInitialMedicalCaseV2] = useState<MedicalCaseV2 | null>(null)
  useEffect(() => {
    if (medicalCaseV2 && !initialMedicalCaseV2) {
      const initial = {
        ...medicalCaseV2,
        treatment: addIdsAndReviewed(medicalCaseV2.treatment),
        diagnose: addIdsAndReviewed(medicalCaseV2.diagnose),
      }
      setInitialMedicalCaseV2(_.cloneDeep(initial))
    }
  }, [medicalCaseV2, initialMedicalCaseV2])

  useEffect(() => {
    if (initialMedicalCaseV2 && medicalCaseV2) {
      setIsFormDirty(!_.isEqual(initialMedicalCaseV2, medicalCaseV2))
    }
  }, [medicalCaseV2, initialMedicalCaseV2])

  useEffect(() => {
    if (medicalCaseV2) {
      const needs = (arr: any[]) => arr?.some((i) => !i.id || i.reviewed === undefined)
      if (needs(medicalCaseV2.diagnose) || needs(medicalCaseV2.treatment)) {
        setMedicalCaseV2({
          ...medicalCaseV2,
          diagnose: addIdsAndReviewed(medicalCaseV2.diagnose),
          treatment: addIdsAndReviewed(medicalCaseV2.treatment),
        })
      }
    }
  }, [medicalCaseV2])

  const updateItemToReview = useCallback(
    (item: any, type?: string, version?: 'v2') => {
      if (version === 'v2' && medicalCaseV2) {
        const upd = (arr: any[]) =>
          arr.map((i) =>
            i.id === item.id ? { ...i, reviewed: true, ...(type !== 'test' && { isExisting: true }) } : i
          )
        setMedicalCaseV2({
          ...medicalCaseV2,
          diagnose: upd(medicalCaseV2.diagnose),
          treatment: upd(medicalCaseV2.treatment),
        })
      } else if (medicalCase) {
        const upd = (arr: any[]) =>
          arr.map((i) =>
            i.id === item.id ? { ...i, reviewed: true, ...(type !== 'test' && { isExisting: true }) } : i
          )
        setMedicalCase({
          ...medicalCase,
          tests: upd(medicalCase.tests),
          diagnose: upd(medicalCase.diagnose),
          order: upd(medicalCase.order),
          medicationSelection: upd(medicalCase.medicationSelection),
          nonMedicationOrder: upd(medicalCase.nonMedicationOrder),
        })
      }
    },
    [medicalCase, medicalCaseV2]
  )

  const removeItemFromReview = useCallback(
    (item: any, type?: string, version?: 'v2') => {
      if (version === 'v2' && medicalCaseV2) {
        const upd = (arr: any[]) =>
          arr.map((i) =>
            i.id === item.id ? { ...i, reviewed: false, ...(type !== 'test' && { isExisting: false }) } : i
          )
        setMedicalCaseV2({
          ...medicalCaseV2,
          diagnose: upd(medicalCaseV2.diagnose),
          treatment: upd(medicalCaseV2.treatment),
        })
      } else if (medicalCase) {
        const upd = (arr: any[]) =>
          arr.map((i) =>
            i.id === item.id ? { ...i, reviewed: false, ...(type !== 'test' && { isExisting: false }) } : i
          )
        setMedicalCase({
          ...medicalCase,
          tests: upd(medicalCase.tests),
          diagnose: upd(medicalCase.diagnose),
          order: upd(medicalCase.order),
          medicationSelection: upd(medicalCase.medicationSelection),
          nonMedicationOrder: upd(medicalCase.nonMedicationOrder),
        })
      }
    },
    [medicalCase, medicalCaseV2]
  )

  const value = useMemo(
    () => ({
      medicalCase,
      setMedicalCase,
      medicalCaseV2,
      setMedicalCaseV2,
      patientCase,
      setPatientCase,
      medicalCaseId,
      setMedicalCaseId,
      medicalCaseV2Id,
      setMedicalCaseV2Id,
      bookmark,
      setBookmark,
      likes,
      setLikes,
      navbarTitle,
      setNavbarTitle,
      isFormDirty,
      updateItemToReview,
      removeItemFromReview,
    }),
    [
      medicalCase,
      medicalCaseV2,
      patientCase,
      medicalCaseId,
      medicalCaseV2Id,
      bookmark,
      likes,
      navbarTitle,
      isFormDirty,
      updateItemToReview,
      removeItemFromReview,
    ]
  )

  return <CaseContext.Provider value={value}>{children}</CaseContext.Provider>
}

export const useCaseContext = () => useContext(CaseContext)
