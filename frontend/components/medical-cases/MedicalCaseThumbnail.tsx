import { MergedMedicalCase } from '@/lib/hygraph/getAllMedicalCases'
import ProfilePicPlaceholder from '../../public/profile-placeholder.png'
import ThumbnailPlaceholder from '../../public/thumbnail-background.png'
import { BookmarkButton } from '@/components/bookmark-button'

interface MedicalCaseThumbnailProps {
  medicalCase: MergedMedicalCase
  width?: string
  height?: string
  titleSize?: string
  avatarSize?: string
  showVersion?: boolean
  opacity?: string
  interactive?: boolean
  showHoverButtons?: boolean
  onStartTest?: () => void
  onClick?: () => void
}

export const MedicalCaseThumbnail = ({
  medicalCase,
  width = 'w-[395px]',
  height = 'h-[280px]',
  titleSize = 'text-[28px]',
  avatarSize = 'w-32 h-32',
  showVersion = true,
  opacity = 'opacity-100',
  interactive = true,
  showHoverButtons = false,
  onStartTest,
  onClick,
}: MedicalCaseThumbnailProps) => {
  return (
    <div
      className={`${width} ${height} rounded-2xl bg-cover bg-center px-5 flex flex-col justify-between py-5 shadow-xl relative overflow-hidden ${opacity} group ${
        interactive
          ? 'transform transition-transform duration-300 hover:scale-105 cursor-pointer'
          : 'pointer-events-none'
      }`}
      style={{
        backgroundImage: `url(${
          medicalCase.thumbnailBackground ? medicalCase.thumbnailBackground.url : ThumbnailPlaceholder.src
        })`,
      }}
      onClick={onClick}
    >
      <span className={`${titleSize} w-2/3 text-white leading-tight font-medium`}>
        {(medicalCase as any).name || medicalCase.title}
      </span>

      {/* Hover buttons */}
      {showHoverButtons && (
        <div className="hidden group-hover:flex flex-row gap-2 items-center z-10">
          <button
            className="flex-1 bg-white text-textPrimary hover:bg-white/90 font-medium py-2 px-4 rounded-lg text-sm"
            onClick={(e) => {
              e.stopPropagation()
              onStartTest?.()
            }}
          >
            View
          </button>
          <div
            className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg flex justify-center items-center"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <BookmarkButton
              caseId={medicalCase.id}
              bookmarked={medicalCase.isBookmarked || false}
              caseTitle={medicalCase.title}
              variant="white"
            />
          </div>
        </div>
      )}

      <div className={`flex items-end justify-between ${showHoverButtons ? 'group-hover:hidden' : ''}`}>
        {showVersion && (
          <span className="text-white text-sm font-medium p-2 rounded-2xl bg-black bg-opacity-25">
            {medicalCase.version}
          </span>
        )}
        <img
          src={medicalCase.patient.profileImage ? medicalCase.patient.profileImage.url : ProfilePicPlaceholder.src}
          alt="Patient profile pic"
          className={`absolute -bottom-4 -right-4 ${avatarSize} rounded-full object-cover border-white/70 border-4`}
        />
      </div>
    </div>
  )
}
