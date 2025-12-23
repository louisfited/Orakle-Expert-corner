import { getBookmarks } from '@/lib/data/repository/bookmarks'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { BookmarkButton } from '@/components/bookmark-button'
import { HStack } from '@/components/h-stack'
import { RenderHTML } from '@/components/RenderHTML'
import { getAllMedicalCasesWithBookmarks } from '@/lib/hygraph/getAllMedicalCases'
import { shortenString } from '@/lib/utils'

export const BookmarksTable = async () => {
  const { data } = await getBookmarks()
  const medicalCases = await getAllMedicalCasesWithBookmarks()

  return (
    <Table id="bookmarks">
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/4">Title</TableHead>
          <TableHead>Case Description</TableHead>
          <TableHead>Bookmarked</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((bookmark) => {
          const medicalCase = medicalCases?.find((medicalCase) => medicalCase.id === bookmark.case_id)
          return (
            <TableRow key={bookmark.id}>
              <TableCell>{medicalCase?.title || ''}</TableCell>
              <TableCell>
                <RenderHTML
                  className="no-margin"
                  htmlString={shortenString(medicalCase?.caseDescription?.html || '')}
                />
              </TableCell>
              <TableCell>
                <BookmarkButton
                  caseId={bookmark.case_id}
                  bookmarked={true}
                  caseTitle={bookmark.case_title!}
                />
              </TableCell>
              <TableCell>
                <Link
                  href={
                    medicalCase?.version === '5m' || medicalCase?.version === '5 min'
                      ? `/cases-v2/${bookmark.case_id}`
                      : `/cases/${bookmark.case_id}`
                  }
                >
                  <HStack className="gap-0">
                    <p>Go to case</p>
                    <ChevronRight />
                  </HStack>
                </Link>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
