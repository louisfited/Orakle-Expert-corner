'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'

const DialogV2 = DialogPrimitive.Root

const DialogTriggerV2 = DialogPrimitive.Trigger

const DialogPortalV2 = DialogPrimitive.Portal

const DialogCloseV2 = DialogPrimitive.Close

const DialogOverlayV2 = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))
DialogOverlayV2.displayName = DialogPrimitive.Overlay.displayName

const DialogContentV2 = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortalV2>
    <DialogOverlayV2 />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid sm:w-[60vw] max-w-[900px] rounded-2xl translate-x-[-50%] translate-y-[-50%] max-sm:left-0 max-sm:top-0 max-sm:w-full max-sm:h-full max-sm:max-w-full max-sm:max-h-full max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-none gap-4 border border-gray-200 bg-white shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] dark:border-gray-800 dark:bg-gray-950',
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="max-sm:absolute max-sm:right-4 max-sm:top-4 max-sm:rounded-full max-sm:bg-white max-sm:w-10 max-sm:h-10 max-sm:flex max-sm:items-center max-sm:justify-center max-sm:shadow-md sm:absolute sm:-right-[50px] sm:top-4 sm:block sm:opacity-70 sm:hover:opacity-100 ring-offset-white transition-opacity focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none max-sm:data-[state=open]:bg-white">
        <Cross2Icon
          className="h-5 w-5 text-textGray max-sm:opacity-100 sm:h-8 sm:w-8 sm:text-white"
          fontSize={20}
        />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortalV2>
))
DialogContentV2.displayName = DialogPrimitive.Content.displayName

const DialogHeaderV2 = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
    {...props}
  />
)
DialogHeaderV2.displayName = 'DialogHeaderV2'

const DialogFooterV2 = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
)
DialogFooterV2.displayName = 'DialogFooterV2'

const DialogTitleV2 = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg text-black font-semibold ', className)}
    {...props}
  />
))
DialogTitleV2.displayName = DialogPrimitive.Title.displayName

const DialogDescriptionV2 = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-gray-500 dark:text-gray-400', className)}
    {...props}
  />
))
DialogDescriptionV2.displayName = DialogPrimitive.Description.displayName

export {
  DialogV2,
  DialogPortalV2,
  DialogOverlayV2,
  DialogTriggerV2,
  DialogCloseV2,
  DialogContentV2,
  DialogHeaderV2,
  DialogFooterV2,
  DialogTitleV2,
  DialogDescriptionV2,
}
