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
  isStarted?: boolean
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
  isStarted = false,
  onStartTest,
  onClick,
}: MedicalCaseThumbnailProps) => {
  const text = 'Virtual Patient: Hausa Street Operation Orakle Solution Christain Jehover'
  // console.log(text.length)

  const actualText = (medicalCase as any).name ? (medicalCase as any).name : medicalCase.title
  return (
    <div
      className={`${width} ${height} rounded-2xl bg-cover bg-center px-5 flex flex-col justify-between py-5 shadow-xl relative overflow-hidden ${opacity} group ${
        interactive ? 'transform transition-transform duration-300 hover:scale-105' : 'pointer-events-none'
      }`}
      style={{
        backgroundImage: `url(${
          medicalCase.thumbnailBackground ? medicalCase.thumbnailBackground.url : ThumbnailPlaceholder.src
        })`,
      }}
    >
      {/* ${titleSize} */}
      <span
        className={`
         w-2/3 text-white leading-tight font-medium ${
           actualText.length > 70
             ? 'text-[0.9rem]'
             : actualText.length > 60
               ? 'text-[0.1rem]'
               : actualText.length > 50
                 ? 'text-[0.1.1rem]'
                 : actualText.length > 40
                   ? 'text-[1.2rem]'
                   : actualText.length > 25
                     ? 'text-[1.3rem]'
                     : actualText.length > 15
                       ? 'text-[1.4rem]'
                       : 'text-[1.6rem]'
         }`}
      >
        {actualText}
      </span>

      <div className={`flex items-end justify-between ${showHoverButtons ? 'group-hover:hidden' : ''}`}>
        {showVersion && (
          <span className="text-white text-sm font-medium p-2 rounded-2xl bg-opacity-25 capitalize">
            {medicalCase.version}
          </span>
        )}
        <img
          src={
            medicalCase.patient && medicalCase.patient.profileImage
              ? medicalCase.patient.profileImage.url
              : ProfilePicPlaceholder.src
          }
          alt="Patient profile pic"
          className={`absolute h-[153px] w-[153px] xl:h-[118px] xl:w-[118px] 2xl:h-[153px] 2xl:w-[153px] -bottom-4 -right-4 ${avatarSize} rounded-full object-cover border-white/70 border-4`}
        />
      </div>
      {/* Hover buttons */}
      {showHoverButtons && (
        <div className="hidden group-hover:flex absolute bottom-0 left-0 right-0 py-4 px-2 gap-3 items-center justify-around bg-white rounded-b-2xl">
          <button
            className="flex-1 bg-textPrimary text-white font-medium py-2 px-4 rounded-lg text-sm"
            onClick={(e) => {
              e.stopPropagation()
              onStartTest?.()
            }}
          >
            Begin Activity
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
            />
          </div>
        </div>
      )}
      {isStarted && <div className="absolute bottom-0 left-0 h-1 w-1/2 bg-textPrimary" />}
    </div>
  )
}
