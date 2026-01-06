import { isCurrentUserAdmin } from '@/lib/actions/userActions'
import { redirect } from 'next/navigation'
import Container from '@/components/general/Container'
import { getApplicationsAction } from '@/lib/actions/adminActions'
import { ApplicantsTable } from '@/components/page-content/admin/applicants-table'

export default async function AdminPage() {
  const { data: isAdmin } = await isCurrentUserAdmin()

  if (!isAdmin) {
    redirect('/')
  }

  const { data, status } = await getApplicationsAction()

  if (status === 'error' || !data) {
    return (
      <div className="min-h-screen">
        <Container>
          <h1>Applications for SEI Healthcare</h1>
          <p>There was an error fetching the applications</p>
        </Container>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Container>
        <h1 className="my-4">Applications for SEI Healthcare</h1>
        <ApplicantsTable applications={data} />
      </Container>
    </div>
  )
}
