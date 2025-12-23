import CategoriesPageContent from './categories-page-content'
import { getAllMedicalCasesForStaging } from '@/lib/hygraph/getAllMedicalCases'

export default async function CategoriesPage() {
  const medicalCases = await getAllMedicalCasesForStaging()

  return <CategoriesPageContent medicalCases={medicalCases} />
}
