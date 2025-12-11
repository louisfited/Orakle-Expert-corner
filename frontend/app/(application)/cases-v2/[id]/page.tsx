import { getBookmarkByCaseIdAction } from '@/lib/data/repository/bookmarks'
import { getLikesByMedicalCaseId } from '@/lib/data/repository/likes'
import { SimulationPageWrapperV2 } from '@/components/simulation-page-wrapper-v2'
import getMedicalCaseV2ById from '@/lib/hygraph/getMedicalCaseV2ById'

async function Page({
  searchParams,
  params,
}: {
  searchParams: Promise<{ password: string; email: string }>
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { email, password } = await searchParams

  const medicalCase = await getMedicalCaseV2ById(id, { email, password })
  if (!medicalCase) {
    return <div>Medical case v2 not found</div>
  }
  const patientId = medicalCase?.patient?.id
  if (!patientId) {
    return (
      <div className="flex items-center justify-center">
        <h3>Woops - seems like you&apos;ve forgot to add a patient, please do so in Hygraph (The CMS).</h3>
      </div>
    )
  }

  const patientCase = medicalCase?.patient || null
  if (!patientCase) {
    return <div className="min-h-screen">Patient case not found</div>
  }

  const { data: bookmark, error } = await getBookmarkByCaseIdAction(id)

  if (error) {
    return <div className="min-h-screen">Something went wrong, please try again or contact support.</div>
  }

  const { data: likes } = await getLikesByMedicalCaseId(id)

  return (
    <SimulationPageWrapperV2
      medicalCaseV2={medicalCase}
      patientCase={patientCase}
      medicalCaseV2Id={id}
      bookmark={bookmark as any}
      likes={likes as any}
    />
  )
}

export default Page
