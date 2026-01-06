'use client'

import { Tables } from '@/lib/types/database.types'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { acceptApplicationAction, rejectApplicationAction, requestEvidenceAction } from '@/lib/actions/adminActions'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

type ApplicationsWithEmail = Tables<'profiles'> & { email: string }

type ApplicantsTableProps = {
  applications: ApplicationsWithEmail[]
}
export const ApplicantsTable = ({ applications }: ApplicantsTableProps) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [isRejecting, setIsRejecting] = useState<string | null>(null)
  const [isRequesting, setIsRequesting] = useState<string | null>(null)

  async function acceptApplication(userId: string) {
    setIsLoading(userId)

    const { status, message } = await acceptApplicationAction(userId)

    setIsLoading(null)
    toast({
      title: status === 'success' ? 'Application accepted' : 'Failed to accept application',
      variant: status === 'success' ? 'default' : 'destructive',
      description: message,
    })
  }

  async function rejectApplication(userId: string) {
    setIsRejecting(userId)

    const { status, message } = await rejectApplicationAction(userId)

    setIsRejecting('')
    toast({
      title: status === 'success' ? 'Application rejected' : 'Failed to reject application',
      variant: status === 'success' ? 'default' : 'destructive',
      description: message,
    })
  }

  async function requestEvidence(email: string, firstName: string) {
    setIsRequesting(email)
    const { status, message } = await requestEvidenceAction(email, firstName)
    toast({
      title: status === 'success' ? 'Evidence requested' : 'Failed to request evidence',
      variant: status === 'success' ? 'default' : 'destructive',
      description: message,
    })
    setIsRequesting('')
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>E-mail</TableHead>
          <TableHead>Full name</TableHead>
          <TableHead>Phone number</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      {applications?.length === 0 && (
        <TableBody>
          <TableRow>
            <TableCell colSpan={4}>No recent applications</TableCell>
          </TableRow>
        </TableBody>
      )}
      <TableBody>
        {applications.map((application) => {
          return (
            <TableRow key={application.id}>
              <TableCell>{application.email}</TableCell>
              <TableCell>
                {application.first_name} {application.last_name}
              </TableCell>
              <TableCell>{application.phone_number}</TableCell>
              <TableCell>
                <div className="space-x-4">
                  <Button
                    variant="destructive"
                    onClick={() => rejectApplication(application.id)}
                  >
                    {isRejecting === application.id && <Loader2 className="animate-spin mr-2" />}
                    Reject
                  </Button>

                  <Button
                    variant="primary"
                    onClick={() => acceptApplication(application.id)}
                  >
                    {isLoading === application.id && <Loader2 className="animate-spin mr-2" />}
                    Accept
                  </Button>

                  <Button
                    variant="secondary"
                    onClick={() => requestEvidence(application.email, application.first_name)}
                  >
                    {isRequesting === application.email && <Loader2 className="animate-spin mr-2" />}
                    Request evidence
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
