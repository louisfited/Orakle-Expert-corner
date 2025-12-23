import CategoriesPageContent from './categories-page-content'
import { getAllMedicalCasesForStagingWithBookmarks } from '@/lib/hygraph/getAllMedicalCases'

export default async function CategoriesPage() {
  const medicalCases = await getAllMedicalCasesForStagingWithBookmarks()

  return <CategoriesPageContent medicalCases={medicalCases} />
}
