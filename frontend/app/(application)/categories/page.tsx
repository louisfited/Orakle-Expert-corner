import CategoriesPageContent from './categories-page-content'
import { getAllMedicalCasesWithBookmarks } from '@/lib/hygraph/getAllMedicalCases'

export default async function CategoriesPage() {
  const medicalCases = await getAllMedicalCasesWithBookmarks()

  return <CategoriesPageContent medicalCases={medicalCases} />
}
