'use client'

import React, { FC, forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import Card from '@/components/general/Card'
import Image from 'next/image'
import PersonalDataTable from '@/components/custom/PersonalDataTable'
import PastVisitsTable from '@/components/tables/visits/PastVisitsTable'
import PastTestsTable from '@/components/tables/tests/PastTestsTable'
import { useCaseContext } from '@/lib/context/caseContext'
import { RenderHTML } from '@/components/RenderHTML'
import {
  Diagnose,
  MedicalCase,
  Order,
  PastTest,
  PastVisit,
  PatientCase,
  NonMedicationOrder,
  MedicationSelection,
} from '@/interface'
import PastDiagnosesList from '@/components/tables/diagnoses/PastDiagnosesTable'
import { Heart } from 'lucide-react'
import { BookmarkButton } from '@/components/bookmark-button'
import TabNavigation from '@/components/custom/PatientCaseCard/utils.jsx'
import { LikesButton } from '@/components/likes-button'
import { TopProfile } from '@/components/custom/PatientCaseCard/components/TopProfile'
import { PastVisits } from '@/components/custom/PatientCaseCard/components/PastVisits'
import { CaseDescription } from '@/components/custom/PatientCaseCard/components/CaseDescription'
import { LabsImaging } from '@/components/custom/PatientCaseCard/components/LabsImaging'
import { Accordion } from '@/components/Accordion'
import { Diagnoses } from '@/components/custom/PatientCaseCard/components/Diagnoses'
import { PastOrders } from '@/components/custom/PatientCaseCard/components/PastOrders'
import { NewOrders } from '@/components/custom/PatientCaseCard/components/NewOrders'
import { CaseTitle } from './components/CaseTitle'
import { ImportantInformation } from './components/ImportantInformation'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { checkEmptyRichText } from '@/lib/utils'

interface Props {
  isOpen: boolean
  setIsOpen: any
}

type CombinedOrder = Order | NonMedicationOrder | MedicationSelection
export const PatientCaseCard: FC<Props> = ({ isOpen, setIsOpen }) => {
  // Data
  const { patientCase, medicalCase } = useCaseContext()
  const pastVisits = medicalCase?.pastVisits
  const pastTests = medicalCase?.pastTests
  const pastDiagnoses = medicalCase?.diagnose?.filter((diagnose: Diagnose) => diagnose.isExisting)
  const ordersNews = (medicalCase?.order?.filter((order: any) => order.reviewed) || []) as CombinedOrder[]
  const ordersPast = (medicalCase?.order
    ?.filter((order: Order) => order.isExisting)
    .filter((order: any) => !order.reviewed) || []) as CombinedOrder[]
  const nonMedicationOrdersNew = (medicalCase?.nonMedicationOrder?.filter((order: any) => order.reviewed) ||
    []) as CombinedOrder[]
  const nonMedicationOrdersPast = (medicalCase?.nonMedicationOrder
    ?.filter((order: NonMedicationOrder) => order.isExisting)
    .filter((order: any) => !order.reviewed) || []) as CombinedOrder[]
  const medicationNew = (medicalCase?.medicationSelection?.filter((medication: any) => medication.reviewed) ||
    []) as CombinedOrder[]

  // Concatenate the arrays now that they are the same type
  const newOrders = ordersNews.concat(nonMedicationOrdersNew).concat(medicationNew)
  const pastOrders = ordersPast.concat(nonMedicationOrdersPast)

  // Refs
  const caseDescriptionRef = useRef<HTMLDivElement>(null)
  const pastVisitsRef = useRef<HTMLDivElement>(null)
  const labsImagingRef = useRef<HTMLDivElement>(null)
  const diagnosesRef = useRef<HTMLDivElement>(null)
  const pastOrdersRef = useRef<HTMLDivElement>(null)
  const importantInformationRef = useRef<HTMLDivElement>(null)

  let treatment = true

  if (
    medicalCase?.medicationSelection?.length === 0 &&
    medicalCase?.nonMedicationOrder?.length === 0 &&
    medicalCase?.order?.length === 0
  ) {
    treatment = false
  }

  const hasImportantInformation = () => {
    return medicalCase?.importantInformation && !checkEmptyRichText(medicalCase?.importantInformation.html)
  }

  if (medicalCase === null) {
    return <SkeletonPatientCaseCard />
  }
  return (
    <>
      <Card className="col-span-1 flex-col py-0 overflow-y-visible relative hidden lg:flex border-none bg-transparent">
        <TopProfile patientCase={patientCase!} />
        <div className="p-4">
          {hasImportantInformation() && (
            <ImportantInformation
              ref={importantInformationRef}
              medicalCase={medicalCase!}
            />
          )}
        </div>
        <TabNavigation
          caseDescriptionRef={caseDescriptionRef}
          pastVisitsRef={pastVisitsRef}
          labsImagingRef={labsImagingRef}
          diagnosesRef={diagnosesRef}
          pastOrdersRef={pastOrdersRef}
        />
        <div className="flex-grow overflow-y-auto h-96 mt-8 space-y-4 pb-8 pr-2">
          <PersonalDataTable patientCase={patientCase!} />
          <CaseDescription
            ref={caseDescriptionRef}
            medicalCase={medicalCase!}
          />
          <PastVisits
            ref={pastVisitsRef}
            pastVisits={pastVisits!}
          />
          <LabsImaging
            ref={labsImagingRef}
            pastTests={pastTests!}
          />
          <Diagnoses
            ref={diagnosesRef}
            pastDiagnoses={pastDiagnoses!}
          />
          {treatment && (
            <PastOrders
              ref={pastOrdersRef}
              orders={pastOrders!}
            />
          )}
          {treatment && (
            <NewOrders
              ref={pastOrdersRef}
              orders={newOrders!}
            />
          )}
        </div>
      </Card>

      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DialogContent className="p-4 rounded-lg">
          <div className="max-h-[70vh] gap-6 flex flex-col overflow-y-auto mt-12">
            <TopProfile patientCase={patientCase!} />
            <div className="px-4">
              {hasImportantInformation() && (
                <ImportantInformation
                  ref={importantInformationRef}
                  medicalCase={medicalCase!}
                />
              )}
            </div>
            <TabNavigation
              caseDescriptionRef={caseDescriptionRef}
              pastVisitsRef={pastVisitsRef}
              labsImagingRef={labsImagingRef}
              diagnosesRef={diagnosesRef}
              pastOrdersRef={pastOrdersRef}
            />
            <CaseDescription
              ref={caseDescriptionRef}
              medicalCase={medicalCase!}
            />
            <PastVisits
              ref={pastVisitsRef}
              pastVisits={pastVisits!}
            />
            <LabsImaging
              ref={labsImagingRef}
              pastTests={pastTests!}
            />
            <Diagnoses
              ref={diagnosesRef}
              pastDiagnoses={pastDiagnoses!}
            />
            {treatment && (
              <PastOrders
                ref={pastOrdersRef}
                orders={pastOrders!}
              />
            )}
            {treatment && (
              <NewOrders
                ref={pastOrdersRef}
                orders={newOrders!}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

function SkeletonPatientCaseCard() {
  return (
    <div className="items-center py-2 min-h-screen w-full hidden lg:block">
      {' '}
      {/* Added hidden and lg:block */}
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4">
          <div className="skeleton-loader h-8 w-8"></div>
          <div className="skeleton-loader h-8 w-8"></div>
        </div>
        <div className="skeleton-loader h-12 w-32"></div>
      </div>
      <div className="items-center flex w-full justify-center mt-4">
        <div className="flex flex-row items-center gap-4 mt-4">
          <div
            className="skeleton-loader h-24 w-24 "
            style={{ borderRadius: '50%' }}
          ></div>
          <div className="flex flex-col gap-2 flex-1">
            <div className="skeleton-loader h-4 w-12"></div>
            <div className="skeleton-loader h-4 w-32"></div>
          </div>
        </div>
      </div>
      <div
        className="skeleton-loader h-10 mt-8  w-full"
        style={{ borderRadius: '8%' }}
      ></div>
      <div className="skeleton-loader h-32 w-full mt-8"></div>
      <div className="skeleton-loader h-4 w-32 mt-8"></div>
      <div className="skeleton-loader h-4 w-full mt-4"></div>
      <div className="skeleton-loader h-4 w-full mt-2"></div>
      <div className="skeleton-loader h-4 w-full mt-2"></div>
      <div className="skeleton-loader h-4 w-full mt-2"></div>
      <div className="skeleton-loader h-4 w-full mt-2"></div>
      <div className="skeleton-loader h-4 w-32 mt-8"></div>
      <div className="skeleton-loader h-4 w-full mt-4"></div>
      <div className="skeleton-loader h-4 w-full mt-2"></div>
      <div className="skeleton-loader h-4 w-full mt-2"></div>
      <div className="skeleton-loader h-4 w-full mt-2"></div>
      <div className="skeleton-loader h-4 w-full mt-2"></div>
    </div>
  )
}
