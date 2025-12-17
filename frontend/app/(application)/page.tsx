'use server'
import { MedicalCaseCard } from '@/components/medical-cases/MedicalCaseCard'
import { getAllMedicalCasesForStaging } from '@/lib/hygraph/getAllMedicalCases'
import { MedicalCasesRow } from '@/components/medical-cases/MedicalCasesRow'

const NewHomePage = async () => {
  const medicalCases = await getAllMedicalCasesForStaging()
  const recommendedCases = medicalCases.slice(0, 4) // will be changed after implementation of completed tests
  const topCases = [...medicalCases].sort((a, b) => b.likes - a.likes)
  return (
    <div className="flex flex-col px-[60px] mt-[110px] overflow-visible">
      {recommendedCases && recommendedCases.length > 0 && (
        <div>
          <div className="text-[28px] font-medium ">Recommended For You</div>
          <MedicalCasesRow medicalCases={recommendedCases} />
        </div>
      )}
      {topCases && topCases.length > 0 && (
        <>
          <div>
            <div className="text-[28px] font-medium overflow-visible">Popular Tests</div>
            <MedicalCasesRow medicalCases={topCases.slice(0, 8)} />
          </div>
        </>
      )}
    </div>
  )
}

export default NewHomePage
