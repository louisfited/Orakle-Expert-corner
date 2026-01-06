import React, { ReactNode, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { ChevronsRight } from 'lucide-react'
import languageTexts from '@/lib/utils/language'
import Cookies from 'js-cookie'

type GenericDialogProps = {
  asDrawer?: boolean
  open: boolean
  onOpenChange: () => void
  title?: string | ReactNode
  icon?: React.ReactNode
  content: React.ReactNode
  showButton?: boolean
}

export const GenericDialog = (props: GenericDialogProps) => {
  const lang: 'en' | 'fr' | 'de' | undefined = Cookies.get('language') as 'en' | 'fr' | 'de' | undefined

  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const titleGap = props.title ? 'p-10' : 'p-10 gap-0'
  if (props.asDrawer) {
    return (
      <Drawer
        open={props.open}
        onOpenChange={props.onOpenChange}
      >
        <DrawerContent>
          <div
            className="cursor-pointer px-4"
            onClick={() => props.onOpenChange()}
          >
            <ChevronsRight
              className="text-textPrimary"
              size={48}
            />
          </div>
          <DrawerHeader className="overflow-hidden">
            <DrawerTitle className="flex items-center gap-2 mb-4">
              {props.icon}
              {props.title}
            </DrawerTitle>
            <div className="overflow-y-auto scrollbar-hide">{props.content}</div>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              variant="primary"
              className="py-6"
              onClick={props.onOpenChange}
            >
              {isMounted && languageTexts(lang).close}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog
      open={props.open}
      onOpenChange={props.onOpenChange}
    >
      <DialogContent className={titleGap}>
        <DialogHeader>
          {props.title && (
            <div className="flex items-center gap-2 mb-4">
              {props.icon}
              {props.title}
            </div>
          )}
        </DialogHeader>
        <div className="max-h-[50vh] gap-8 flex flex-col overflow-y-auto">{props.content}</div>
        {props.showButton && (
          <Button
            variant="primary"
            className="py-6"
            onClick={props.onOpenChange}
          >
            {isMounted && languageTexts(lang).gotIt + '!'}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  )
}
