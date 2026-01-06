'use client'
import { MergedMedicalCase } from '@/lib/hygraph/getAllMedicalCases'
import ProfilePicPlaceholder from '../../public/profile-placeholder.png'
import ThumbnailPlaceholder from '../../public/thumbnail-background.png'
import { useDisclose } from '@/lib/hooks/useDisclose'
import { StartTestModal } from './StartTestModal'
import categoriesData from '@/lib/categories.json'

interface MedicalCasePortraitCardProps {
  medicalCase: MergedMedicalCase
}

export const MedicalCasePortraitCard = ({ medicalCase }: MedicalCasePortraitCardProps) => {
  const { isOpen: isConfirmationOpen, onToggle: onConfirmationToggle } = useDisclose()

  return (
    <>
      <div
        className="flex flex-col items-center gap-2 "
        style={{ width: '395px' }}
      >
        {/* Card */}
        <div
          className="w-full rounded-xl bg-cover bg-center px-5 shadow-xl relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 flex flex-col pt-[82px]"
          style={{
            height: '472px',
            backgroundImage: `url(${
              medicalCase.thumbnailBackground ? medicalCase.thumbnailBackground.url : ThumbnailPlaceholder.src
            })`,
          }}
          onClick={onConfirmationToggle}
        >
          {/* Title at top */}
          <div className="text-white h-16 text-[36px] leading-tight font-normal text-center mb-[60px]">
            {medicalCase.title}
          </div>

          {/* Avatar */}
          <div className="flex justify-center">
            <img
              src={medicalCase.patient.profileImage ? medicalCase.patient.profileImage.url : ProfilePicPlaceholder.src}
              alt="Patient profile pic"
              className="rounded-full object-cover border-white/70 border-4"
              style={{ width: '174px', height: '174px' }}
            />
          </div>

          {/* Version badge - absolute positioned 18px from bottom */}
          <span
            className="absolute left-1/2 -translate-x-1/2 text-white text-sm font-medium px-3 py-2 rounded-2xl bg-black bg-opacity-25"
            style={{ bottom: '18px' }}
          >
            {medicalCase.version}
          </span>
        </div>

        {/* Description outside card */}
        <div className="w-full">
          <p
            className="text-[17px] font-medium line-clamp-2"
            style={{ color: '#18276D' }}
          >
            {medicalCase.shortDescription}
          </p>

          {/* Categories */}
          {medicalCase.categories && medicalCase.categories.length > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              {medicalCase.categories
                .slice(0, 3)
                .map((cat) => categoriesData.categories[cat as keyof typeof categoriesData.categories] || cat)
                .join(' • ')}
            </p>
          )}
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
