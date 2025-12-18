'use client'
import { MergedMedicalCase } from '@/lib/hygraph/getAllMedicalCases'
import ProfilePicPlaceholder from '../../public/profile-placeholder.png'
import ThumbnailPlaceholder from '../../public/thumbnail-background.png'
import { useDisclose } from '@/lib/hooks/useDisclose'
import { StartTestModal } from './StartTestModal'

interface MedicalCasePortraitCardProps {
  medicalCase: MergedMedicalCase
}

export const MedicalCasePortraitCard = ({ medicalCase }: MedicalCasePortraitCardProps) => {
  const { isOpen: isConfirmationOpen, onToggle: onConfirmationToggle } = useDisclose()

  return (
    <>
      <div className="flex flex-col items-center w-[280px]">
        {/* Card */}
        <div
          className="w-full h-[380px] rounded-xl bg-cover bg-center px-5 py-5 shadow-xl relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 flex flex-col"
          style={{
            backgroundImage: `url(${
              medicalCase.thumbnailBackground ? medicalCase.thumbnailBackground.url : ThumbnailPlaceholder.src
            })`,
          }}
          onClick={onConfirmationToggle}
        >
          {/* Title at top */}
          <div className="text-white text-[24px] leading-tight font-medium text-center mb-auto">
            {medicalCase.title}
          </div>

          {/* Avatar and version at bottom */}
          <div className="flex flex-col items-center gap-3 mt-auto">
            <img
              src={
                medicalCase.patient.profileImage ? medicalCase.patient.profileImage.url : ProfilePicPlaceholder.src
              }
              alt="Patient profile pic"
              className="w-40 h-40 rounded-full object-cover border-white/70 border-4"
            />
            <span className="text-white text-sm font-medium px-3 py-2 rounded-2xl bg-black bg-opacity-25">
              {medicalCase.version}
            </span>
          </div>
        </div>

        {/* Description outside card */}
        <div className="mt-4 text-center">
          <p className="text-lg text-darkBlue font-semibold line-clamp-2">{medicalCase.shortDescription}</p>
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
