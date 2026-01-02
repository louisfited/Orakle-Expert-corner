import { DialogV2, DialogContentV2, DialogCloseV2 } from '@/components/ui/dialogV2'
import { RenderHTML } from '@/components/RenderHTML'
import { X } from 'lucide-react'
import { MergedMedicalCase } from '@/lib/hygraph/getAllMedicalCases'
import ProfilePicPlaceholder from '../../public/profile-placeholder.png'
import ThumbnailPlaceholder from '../../public/thumbnail-background.png'
import { useRouter } from 'next/navigation'
import { BookmarkButton } from '@/components/bookmark-button'

interface StartTestModalProps {
  medicalCase: MergedMedicalCase
  open: boolean
  onOpenChange: () => void
}

export const StartTestModal = ({ medicalCase, open, onOpenChange }: StartTestModalProps) => {
  const router = useRouter()
  const handleStartTest = (id: string, version: string) => {
    if (version === '5m' || version === '5 min') {
      router.push(`/cases-v2/${id}`)
    } else {
      router.push(`/cases/${id}`)
    }
  }
  return (
    <DialogV2
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContentV2 className="sm:[&>button:first-of-type]:hidden">
        {/* Custom close button for sm and above - positioned outside to the right */}
        <button
          onClick={onOpenChange}
          className="hidden sm:block absolute -right-14 top-0 opacity-70 hover:opacity-100 transition-opacity focus:outline-none"
        >
          <X className="h-8 w-8 text-white" />
        </button>
        <div className="rounded-2xl">
          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col lg:w-1/2 w-full ltr">
              <div
                className="flex flex-col relative sm:rounded-2xl h-[236px] bg-cover bg-center px-5 overflow-hidden"
                style={{
                  backgroundImage: `url(${
                    medicalCase.thumbnailBackground ? medicalCase.thumbnailBackground.url : ThumbnailPlaceholder.src
                  })`,
                }}
              >
                <div className="flex flex-col mt-5">
                  <span className="text-[36px] w-5/6 text-white">{medicalCase.title}</span>
                  <img
                    src={
                      medicalCase.patient.profileImage
                        ? medicalCase.patient.profileImage.url
                        : ProfilePicPlaceholder.src
                    }
                    alt="Patient profile pic"
                    className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full object-cover border-white/70 border-4"
                  />
                </div>
              </div>
              <div className="lg:rounded-bl-2xl bg-grayBg flex flex-col h-[236px] p-10">
                <div className="flex flex-row justify-start items-start mb-8">
                  <div className="flex flex-col text-[15px] font-medium  mr-14">
                    <span className="text-textGray text-opacity-60">Supporter</span>
                    <span>{medicalCase.supporter}</span>
                  </div>
                  <div className="flex flex-col text-[15px] font-medium">
                    <span className="text-textGray text-opacity-60">Time</span>
                    <span>{medicalCase.version}</span>
                  </div>
                </div>
                <div className="flex flex-col text-[15px] font-medium">
                  <span className="text-textGray text-opacity-60">Faculty</span>
                  <span>{medicalCase.faculty}</span>
                </div>
              </div>
            </div>
            <div className="p-8 flex flex-col justify-between lg:w-1/2 w-full max-h-[472px]">
              <div className="flex flex-col overflow-y-auto flex-1 pr-2">
                <span className="font-medium tex-black text-xl">{medicalCase.shortDescription}</span>
                <div>
                  {medicalCase.preCaseInformation && (
                    <RenderHTML
                      className="text-base"
                      htmlString={medicalCase.preCaseInformation.html}
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-row justify-between mt-4 flex-shrink-0">
                <button
                  className="w-[118px] bg-textPrimary text-white shadow hover:bg-textPrimary/90 dark:bg-gray-900 dark:text-gray-50 dark:hover:bg-gray-900/90 p-3 rounded-md"
                  onClick={() => handleStartTest(medicalCase.id, medicalCase.version)}
                >
                  <span className="text-white text-lg text-center">Begin</span>
                </button>
                <div className="w-[46px] h-[46px] bg-white rounded-full flex justify-center items-center border-borderBottom">
                  <BookmarkButton
                    caseId={medicalCase.id}
                    bookmarked={medicalCase.isBookmarked || false}
                    caseTitle={medicalCase.title}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContentV2>
    </DialogV2>
  )
}
