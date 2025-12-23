import SearchPageContent from './search-page-content'
import { getAllMedicalCasesForStaging } from '@/lib/hygraph/getAllMedicalCases'

export default async function SearchPage() {
  const medicalCases = await getAllMedicalCasesForStaging()

  return <SearchPageContent medicalCases={medicalCases} />
}
