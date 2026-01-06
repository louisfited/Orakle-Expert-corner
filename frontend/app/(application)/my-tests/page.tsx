import { getAllMedicalCases } from '@/lib/hygraph/getAllMedicalCases'
import { getCasesStartedForUser } from '@/lib/data/repository/case-status-per-user'
import { MyTestsContent } from './my-tests-content/my-tests-content'
import { MergedMedicalCase } from '@/lib/hygraph/getAllMedicalCases'
import { getBookmarks } from '@/lib/data/repository/bookmarks'
import Link from 'next/link'

const MyTests = async () => {
  const caseStatus = await getCasesStartedForUser()
  const bookmarks = await getBookmarks()
  let updatedCases: MergedMedicalCase[] = []
  const myCases = caseStatus.data?.map(({ case_id, status }) => ({ case_id, status })) ?? []
  const bookmarkIds = bookmarks?.data?.map((bookmark) => bookmark.case_id) ?? []
  const myCasesIds = [...(myCases.map((mycase) => mycase.case_id) ?? []), ...bookmarkIds]
  if (myCasesIds && myCasesIds.length > 0) {
    const medicalCases = await getAllMedicalCases(myCasesIds)
    const statusMap = new Map(myCases?.map((item) => [item.case_id, item.status]) ?? [])

    updatedCases = medicalCases.map((medicalCase) => {
      const status = statusMap.get(medicalCase.id)
      return status !== undefined
        ? { ...medicalCase, status, ...(bookmarkIds.includes(medicalCase.id) && { isBookmarked: true }) }
        : { ...medicalCase, isBookmarked: true }
    })
  }

  return (
    <div className="px-4 md:px-8 lg:px-[60px]">
      {updatedCases.length > 0 ? (
        <MyTestsContent medicalCases={updatedCases} />
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="text-textDark font-medium text-[28px] mb-4">No tests here yet</div>
          <span className="text-center text-textGray  text-lg">
            {' '}
            You haven«t started or bookmarked any tests yet<br></br>Explore the test library to begin.
          </span>
          <Link href={'/'}>
            <div className="w-[150px] flex justify-center items-center bg-textPrimary cursor-pointer text-white shadow hover:bg-textPrimary/90 dark:bg-gray-900 dark:text-gray-50 dark:hover:bg-gray-900/90 p-3 rounded-md mt-12">
              <span className="text-white text-lg text-center">Explore Tests</span>
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}

export default MyTests
