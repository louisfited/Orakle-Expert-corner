export const LoadingPage = ({ text = 'Loading cases...' }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        <div className="mt-4 text-gray-900">{text}</div>
      </div>
    </div>
  )
}
