import CategoriesPageContent from './categories-page-content'
import { getAllMedicalCases } from '@/lib/hygraph/getAllMedicalCases'

export default async function CategoriesPage() {
  const medicalCases = await getAllMedicalCases()

  return <CategoriesPageContent medicalCases={medicalCases} />
}
