import { DialogV2, DialogContentV2 } from '@/components/ui/dialogV2'
import { RenderHTML } from '@/components/RenderHTML'
import { Bookmark } from 'lucide-react'
import { MergedMedicalCase } from '@/lib/hygraph/getAllMedicalCases'
import ProfilePicPlaceholder from '../../public/profile-placeholder.png'
import ThumbnailPlaceholder from '../../public/thumbnail-background.png'
import { useRouter } from 'next/navigation'

interface StartTestModalProps {
  medicalCase: MergedMedicalCase
  open: boolean
  onOpenChange: () => void
}

export const StartTestModal = ({ medicalCase, open, onOpenChange }: StartTestModalProps) => {
  const router = useRouter()
  const handleStartTest = (id: string, version: string) => {
    if (version === '5m') {
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
      <DialogContentV2>
        <div className="rounded-2xl">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col w-1/2 ltr">
              <div
                className="flex flex-col relative rounded-s-2xl h-[236px] bg-cover bg-center px-5 overflow-hidden"
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
              <div className="rounded-bl-2xl bg-grayBg flex flex-col h-[236px] p-10">
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
            <div className="p-8 flex flex-col justify-between w-1/2">
              <div className="flex flex-col">
                <span className="font-medium tex-black text-xl">{medicalCase.shortDescription}</span>
                <div>
                  {medicalCase.caseDescription && (
                    <RenderHTML
                      className="text-base"
                      htmlString={medicalCase.caseDescription.html}
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <button
                  className="w-[118px] bg-textPrimary text-white shadow hover:bg-textPrimary/90 dark:bg-gray-900 dark:text-gray-50 dark:hover:bg-gray-900/90 p-3 rounded-md"
                  onClick={() => handleStartTest(medicalCase.id, medicalCase.version)}
                >
                  <span className="text-white text-lg text-center">Start Test</span>
                </button>
                <button className="w-[46px] h-[46px] bg-white rounded-full flex justify-center items-center border-2 border-borderBottom">
                  <Bookmark
                    size={16}
                    color="#454A6C"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContentV2>
    </DialogV2>
  )
}
