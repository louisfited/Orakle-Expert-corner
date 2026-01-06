'use server'

import { getAllMedicalCasesWithBookmarks } from '@/lib/hygraph/getAllMedicalCases'
import { MedicalCasesLandscapeRow } from '@/components/medical-cases/MedicalCasesLandscapeRow'
import { FeaturedSlideshow } from '@/components/medical-cases/FeaturedSlideshow'
import { MedicalCasesPortraitRow } from '@/components/medical-cases/MedicalCasesPortraitRow'
import { getCasesStartedForUser } from '@/lib/data/repository/case-status-per-user'
import { StatusEnum } from '@/lib/types/types'

const NewHomePage = async () => {
  const medicalCases = await getAllMedicalCasesWithBookmarks()
  const recommendedCases = medicalCases.filter((medicalCase) => medicalCase.isRecommended)
  const topCases = [...medicalCases].sort((a, b) => b.likes - a.likes)
  const newActivities = medicalCases.slice(0, 5) // Get first 5 cases for the slideshow
  const caseStatus = await getCasesStartedForUser(null, StatusEnum.started)
  const myCases = caseStatus.data && caseStatus.data.length > 0 && caseStatus.data.map((mycase) => mycase.case_id)
  const continueTestsRow =
    myCases &&
    myCases.length > 0 &&
    medicalCases
      .filter((medicalCase) => myCases?.includes(medicalCase.id))
      .map((medicalCase) => ({ ...medicalCase, status: StatusEnum.started }))

  return (
    <div className="flex flex-col overflow-visible">
      {/* Featured Slideshow */}
      {newActivities && newActivities.length > 0 && (
        <div className="mb-8 px-5 lg:px-[60px]">
          <div className="text-[28px] font-medium mb-5">New activities</div>
          <FeaturedSlideshow medicalCases={newActivities} />
        </div>
      )}

      <div className="px-5 lg:px-[60px] pb-4">
        {recommendedCases && recommendedCases.length > 0 && (
          <div>
            <div className="text-[28px] font-medium">Recommended For You</div>
            <MedicalCasesLandscapeRow medicalCases={recommendedCases} />
          </div>
        )}
        {continueTestsRow && continueTestsRow.length > 0 && (
          <div>
            <div className="text-[28px] font-medium">Continue Tests</div>
            <MedicalCasesLandscapeRow medicalCases={continueTestsRow} />
          </div>
        )}
        {topCases && topCases.length > 0 && (
          <>
            <div>
              <div className="text-[28px] font-medium mb-5">Popular Tests</div>
              <MedicalCasesPortraitRow medicalCases={topCases} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default NewHomePage
