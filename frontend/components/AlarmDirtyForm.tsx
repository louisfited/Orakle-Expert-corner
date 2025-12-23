import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

//This component takes cares of the Alarn when you change directly in the URL
const AlarmDirtyForm = ({ isFormDirty }: { isFormDirty: boolean }) => {
  const router = useRouter()
  const pathname = usePathname()
  const [currentPath, setCurrentPath] = useState(pathname)

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isFormDirty) {
        event.preventDefault()
        event.returnValue = '' // Triggers confirmation dialog
      }
    }
    const handleRouteChange = () => {
      if (isFormDirty && pathname !== currentPath) {
        const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave?')
        if (!confirmLeave) {
          // Prevent navigation by reverting to current path
          router.push(currentPath!)
          return
        }
        // Allow navigation
        setCurrentPath(pathname)
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    // Manually handle route changes
    handleRouteChange()
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isFormDirty, pathname, currentPath, router])
  return null // This is just a helper hook, nothing to render
}
export default AlarmDirtyForm
