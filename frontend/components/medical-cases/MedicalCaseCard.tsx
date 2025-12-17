'use client'
import { Bookmark } from 'lucide-react'
import { useDisclose } from '@/lib/hooks/useDisclose'
import { StartTestModal } from './StartTestModal'
import { MergedMedicalCase } from '@/lib/hygraph/getAllMedicalCases'
import ProfilePicPlaceholder from '../../public/profile-placeholder.png'
import ThumbnailPlaceholder from '../../public/thumbnail-background.png'

interface MedicalCaseCardProps {
  medicalCase: MergedMedicalCase
  hasDescription?: boolean
}

export const MedicalCaseCard = ({ medicalCase, hasDescription }: MedicalCaseCardProps) => {
  const { isOpen: isConfirmationOpen, onToggle: onConfirmationToggle } = useDisclose()
  return (
    <>
      <div className="flex flex-col w-[395px] group-hover:w-[500px] transition-transform duration-300 hover:scale-105 hover:-translate-y-2 group overflow-y-visible hover:rounded-2xl">
        <div
          className="flex flex-col relative h-[236px] rounded-xl group-hover:rounded-t-2xl group-hover:rounded-b-none bg-cover bg-center px-5 overflow-hidden mb-2"
          style={{
            backgroundImage: `url(${
              medicalCase.thumbnailBackground ? medicalCase.thumbnailBackground.url : ThumbnailPlaceholder.src
            })`,
          }}
        >
          <div className="flex flex-col mt-5 h-full">
            <span className="text-[36px] w-5/6 text-white">{medicalCase.title}</span>
            <div className="flex flex-row h-full">
              <span className="group-hover:hidden self-end mb-5 text-white text-sm font-medium p-2 rounded-2xl bg-black bg-opacity-25">
                {medicalCase.version}
              </span>
              <img
                src={
                  medicalCase.patient.profileImage ? medicalCase.patient.profileImage.url : ProfilePicPlaceholder.src
                }
                alt="Patient profile pic"
                className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full object-cover border-white/70 border-4"
              />
            </div>
          </div>
        </div>
        <div>
          {hasDescription && (
            <span className="text-lg text-darkBlue font-semibold line-clam-2 group-hover:hidden">
              {medicalCase.shortDescription}
            </span>
          )}

          <div className="hidden opacity-0 group-hover:flex flex-col group-hover:opacity-100 transition-opacity duration-300 px-6 py-4 bg-white rounded-b-2xl">
            <span className="text-lg text-darkBlue font-semibold line-clam-2 mb-3 w-full">
              {medicalCase.shortDescription}
            </span>
            <div className="self-start rounded-xl py-1 px-4 bg-grayBg mb-8">{medicalCase.version}</div>
            <div className="flex flex-row justify-between">
              <button
                className="w-[250px] bg-textPrimary text-white shadow hover:bg-textPrimary/90 dark:bg-gray-900 dark:text-gray-50 dark:hover:bg-gray-900/90 p-2 rounded-md"
                onClick={() => {
                  onConfirmationToggle()
                }}
              >
                <span className="text-white text-lg text-center">Start Test</span>
              </button>
              <button className="w-[46px] h-[46px] bg-textPrimary bg-opacity-10 rounded-full flex justify-center items-center">
                <Bookmark
                  size={16}
                  color="#1026C4"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <StartTestModal
        medicalCase={medicalCase}
        open={isConfirmationOpen}
        onOpenChange={onConfirmationToggle}
      />
    </>
  )
}
