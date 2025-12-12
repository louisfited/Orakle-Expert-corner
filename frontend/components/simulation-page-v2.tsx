'use client'

import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Card from '@/components/general/Card'
import { RenderHTML } from './RenderHTML'
import { useCaseContext } from '@/lib/context/caseContext'
import Image from 'next/image'
import { shortenString } from '@/lib/utils'
import { Diagnose, MedicalCaseV2, PatientCase } from '@/interface'
import { Tables } from '@/lib/types/database.types'
import { AddCidpTreatment } from './tables/orders/CidpTreatment'
import { DiagnoseList } from './tables/diagnoses/DiagnoseList'
import { TopProfileMedicalCaseV2 } from './custom/PatientCaseCard/components/TopProfileMedicalCaseV2'
import { AudioStories } from './Audio'
import { Button } from './ui/button'

interface Props {
  medicalCaseV2: MedicalCaseV2 | null
  patientCase: PatientCase | null
  medicalCaseV2Id: string
  bookmark: Tables<'bookmarks'>
  likes: Tables<'likes'>
}

export const SimulationPageV2: FC<Props> = ({ medicalCaseV2, patientCase, medicalCaseV2Id, bookmark, likes }) => {
  const router = useRouter()
  const { setMedicalCaseV2, setPatientCase, setBookmark, setMedicalCaseV2Id, setLikes, setNavbarTitle } =
    useCaseContext()
  const [currentCardIndex, setCurrentCardIndex] = useState(0)

  useEffect(() => {
    if (patientCase) setPatientCase(patientCase)
    if (medicalCaseV2) setMedicalCaseV2(medicalCaseV2)
    setMedicalCaseV2Id(medicalCaseV2Id)
    setBookmark(bookmark)
    setLikes(likes)
    setNavbarTitle('Delayed CIDP Diagnosis')

    return () => {
      setNavbarTitle('')
    }
  }, [
    patientCase,
    medicalCaseV2,
    medicalCaseV2Id,
    bookmark,
    likes,
    setPatientCase,
    setMedicalCaseV2,
    setMedicalCaseV2Id,
    setBookmark,
    setLikes,
    setNavbarTitle,
  ])

  if (!medicalCaseV2 || !patientCase) return <div>Medical case not found</div>

  const pastDiagnoses = medicalCaseV2.diagnose.filter((d: Diagnose) => d.isExisting)
  const newDiagnoses = medicalCaseV2.diagnose.filter((d: Diagnose) => !d.isExisting)
  const cidpTreatment = medicalCaseV2.treatment

  const cardStepsLeft = [
    {
      title: 'Clinical Background',
      content: (
        <RenderHTML
          className="no-margin"
          htmlString={shortenString(medicalCaseV2.medicalCaseInformation.clinicalBackground.html, 500)}
        />
      ),
    },
    {
      title: 'Follow-up',
      content: (
        <RenderHTML
          className="no-margin"
          htmlString={shortenString(medicalCaseV2?.medicalCaseInformation?.followUp?.html, 500)}
        />
      ),
    },
    {
      title: 'Diagnostic Tests',
      content: (
        <>
          {pastDiagnoses.map((d, i) => (
            <ul
              key={i}
              style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}
            >
              <li>
                {d.name}
                <ul>
                  <li>
                    <RenderHTML htmlString={d?.guidanceText.html || ''} />
                  </li>
                </ul>
              </li>
            </ul>
          ))}
        </>
      ),
    },
  ]

  const cardStepsRight = [
    {
      title: 'Diagnosis',
      content: (
        <div className="space-y-4 text-textDark">
          {newDiagnoses.length ? (
            <DiagnoseList
              setDisabledNext={() => {}}
              newDiagnoses={newDiagnoses}
            />
          ) : (
            <span className="text-textDark text-sm">No diagnoses found</span>
          )}
        </div>
      ),
    },
    {
      title: 'CIDP treatment',
      content: (
        <div className="space-y-4">
          {cidpTreatment?.length ? <AddCidpTreatment cidpTreatmentData={cidpTreatment} /> : null}
        </div>
      ),
    },
  ]

  const handleFinish = () => {
    router.push(medicalCaseV2.finishUrl || '/')
  }

  const totalCards = cardStepsLeft.length + cardStepsRight.length
  const getAudioFiles = () => {
    const original = (medicalCaseV2.medicalCaseInformation.audioUrl || []).map((a) => a.url)
    return Array.from({ length: totalCards }, (_, i) => original[i % original.length])
  }

  return (
    <div className="h-[calc(100vh-55px)] lg:h-[calc(100vh-96px)] flex flex-col overflow-hidden">
      <div className="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden px-4 md:px-12 pt-6 gap-4 md:gap-6">
        <div className="w-full md:w-1/3 flex flex-col md:h-full md:min-h-0 order-2 md:order-1">
          {/*
          <div className="py-6 px-4 flex-shrink-0">
            <TopProfileMedicalCaseV2
              patientCase={patientCase}
              medicalCaseV2={medicalCaseV2}
            />
          </div>
          */}
          <div className="md:flex-1 md:overflow-y-auto space-y-6 px-4 pb-6">
            {cardStepsLeft.map((step, i) => (
              <Card
                key={i}
                noBorder
                className={`p-6 space-y-4 transition-opacity duration-300  ${
                  currentCardIndex === i ? 'opacity-100' : 'opacity-30 pointer-events-none select-none'
                }`}
              >
                <h2 className="text-lg font-semibold text-textPrimary">{step.title}</h2>
                <hr />
                {step.content}
              </Card>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/3 flex flex-col items-center justify-start md:overflow-hidden order-1 md:order-2">
          <div className="hidden md:block w-full lg:h-full max-w-sm aspect-[3/4] relative rounded-xl overflow-hidden">
            <Image
              src={medicalCaseV2.silhouette?.url ?? '/silhouette.png'}
              alt="silhouette"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex items-center text-gray-800 m-6">
            <div className="flex-1 text-center">
              <div className="uppercase text-xs text-gray-500">GENDER</div>
              <div className="mt-1 font-semibold text-lg text-textPrimary">{medicalCaseV2.patient.gender}</div>
            </div>
            <div className="h-8 border-l border-gray-300 mx-6" />
            <div className="flex-1 text-center">
              <div className="uppercase text-xs text-gray-500">Age</div>
              <div className="mt-1 font-semibold text-lg whitespace-nowrap text-textPrimary">
                {medicalCaseV2.patient.age} years
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 flex flex-col md:h-full md:min-h-0 order-3">
          <div className="md:flex-1 md:overflow-y-auto space-y-6 px-4 pt-6 pb-4">
            {cardStepsRight.map((step, i) => {
              const idx = cardStepsLeft.length + i
              return (
                <Card
                  key={i}
                  noBorder
                  className={`p-6 space-y-4 transition-opacity duration-300 ${
                    currentCardIndex === idx ? 'opacity-100' : 'opacity-30 pointer-events-none'
                  }`}
                >
                  <h2 className="text-lg font-semibold text-textPrimary">{step.title}</h2>
                  <hr />
                  {step.content}
                </Card>
              )
            })}
          </div>
          <div className="px-6 py-4 border-t border-gray-200 flex-shrink-0">
            <Button
              className="w-full"
              onClick={handleFinish}
            >
              Finish
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white px-2 mb-6 mx-7 py-3 flex-shrink-0 border border-gray-200 rounded-full">
        <AudioStories
          sources={getAudioFiles()}
          onTrackChange={setCurrentCardIndex}
        />
      </div>
    </div>
  )
}
