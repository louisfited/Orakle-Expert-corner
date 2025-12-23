import { cn } from '@/lib/utils'

export const RenderHTML = ({ htmlString, className }: { htmlString: string; className?: string }) => {
  return (
    <div
      className={cn('table', 'prose', 'richtext', 'text-textGray text-md', className)}
      dangerouslySetInnerHTML={{ __html: htmlString }}
    />
  )
}
