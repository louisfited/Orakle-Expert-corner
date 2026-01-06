import SearchPageContent from './search-page-content'
import { getAllMedicalCases } from '@/lib/hygraph/getAllMedicalCases'

export default async function SearchPage() {
  const medicalCases = await getAllMedicalCases()

  return <SearchPageContent medicalCases={medicalCases} />
}
