'use server'
import { MedicalCaseCard } from '@/components/medical-cases/MedicalCaseCard'
import { MedicalCasePortraitCard } from '@/components/medical-cases/MedicalCasePortraitCard'
import { getAllMedicalCasesForStaging } from '@/lib/hygraph/getAllMedicalCases'
import { MedicalCasesRow } from '@/components/medical-cases/MedicalCasesRow'
import { FeaturedSlideshow } from '@/components/medical-cases/FeaturedSlideshow'

const NewHomePage = async () => {
  const medicalCases = await getAllMedicalCasesForStaging()
  const recommendedCases = medicalCases.slice(0, 4) // will be changed after implementation of completed tests
  const topCases = [...medicalCases].sort((a, b) => b.likes - a.likes)
  const newTests = medicalCases.slice(0, 5) // Get first 5 cases for the slideshow

  return (
    <div className="flex flex-col overflow-visible">
      {/* Featured Slideshow */}
      {newTests && newTests.length > 0 && (
        <div className="mb-8 px-[60px]">
          <div className="text-[28px] font-medium mb-5">New Tests</div>
          <FeaturedSlideshow medicalCases={newTests} />
        </div>
      )}

      <div className="px-[60px]">
        {recommendedCases && recommendedCases.length > 0 && (
          <div>
            <div className="text-[28px] font-medium ">Recommended For You</div>
            <MedicalCasesRow medicalCases={recommendedCases} />
          </div>
        )}
        {topCases && topCases.length > 0 && (
          <>
            <div>
              <div className="text-[28px] font-medium overflow-visible mb-5">Popular Tests</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                {topCases.slice(0, 8).map((medicalCase) => (
                  <MedicalCasePortraitCard
                    key={medicalCase.id}
                    medicalCase={medicalCase}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default NewHomePage
