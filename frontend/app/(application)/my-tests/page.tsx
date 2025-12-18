'use server'
import { getAllMedicalCasesForStaging } from '@/lib/hygraph/getAllMedicalCases'
import { getCasesStartedForUser } from '@/lib/data/repository/case-status-per-user'
import { MyTestsContent } from './my-tests-content/my-tests-content'
import { MergedMedicalCase } from '@/lib/hygraph/getAllMedicalCases'
import { getBookmarks } from '@/lib/data/repository/bookmarks'

const MyTests = async () => {
  const caseStatus = await getCasesStartedForUser()
  const bookmarks = await getBookmarks()
  let updatedCases: MergedMedicalCase[] = []
  const myCases = caseStatus.data?.map(({ case_id, status }) => ({ case_id, status })) ?? []
  const bookmarkIds = bookmarks?.data?.map((bookmark) => bookmark.case_id) ?? []
  const myCasesIds = [...(myCases.map((mycase) => mycase.case_id) ?? []), ...bookmarkIds]
  if (myCasesIds && myCasesIds.length > 0) {
    const medicalCases = await getAllMedicalCasesForStaging(myCasesIds)
    const statusMap = new Map(myCases?.map((item) => [item.case_id, item.status]) ?? [])

    updatedCases = medicalCases.map((medicalCase) => {
      console.log(medicalCase)
      const status = statusMap.get(medicalCase.id)
      return status !== undefined
        ? { ...medicalCase, status, ...(bookmarkIds.includes(medicalCase.id) && { isBookmarked: true }) }
        : { ...medicalCase, isBookmarked: true }
    })
  }

  return (
    <div className="px-4 md:px-8 lg:px-[60px]">
      <MyTestsContent medicalCases={updatedCases} />
    </div>
  )
}

export default MyTests
