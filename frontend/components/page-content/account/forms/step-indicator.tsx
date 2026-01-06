export const StepIndicator = ({ step }: { step: number }) => {
  // Step starts at 0, so have to increment it for it to look correct on the UI
  const stepPlus = step + 1
  return (
    <div className="mt-16">
      <p>STEP {stepPlus}</p>
      <div className="flex items-center gap-1 ">
        <div className="flex flex-col items-center">
          <div className={`w-12 h-1 mt-2 rounded-md ${step === 0 ? 'bg-textPrimary' : 'bg-gray-200'}`}></div>
        </div>
        <div className="flex flex-col items-center">
          <div className={`w-12 h-1 mt-2 rounded-md ${step === 1 ? 'bg-textPrimary' : 'bg-gray-200'}`}></div>
        </div>
        <div className="flex flex-col items-center">
          <div className={`w-12 h-1 mt-2 rounded-md ${step === 2 ? 'bg-textPrimary' : 'bg-gray-200'}`}></div>
        </div>
      </div>
    </div>
  )
}
