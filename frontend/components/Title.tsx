export const Title = ({ title }: { title: string }) => {
  return <h1 className="text-textPrimary font-semibold text-3xl">{title}</h1>
}

export const H2 = ({ title }: { title: string }) => {
  return <h2 className="text-textPrimary font-semibold text-xl">{title}</h2>
}

export const Subtitle = ({ title }: { title: string }) => {
  return <h2 className="text-textPrimary font-semibold text-lg">{title}</h2>
}

export const Label = ({ title }: { title: string }) => {
  return <h3 className="text-textPrimaryFaded text-md uppercase font-medium">{title}</h3>
}

export const MedicationLabel = ({ title }: { title: string }) => {
  return <h3 className="text-textGray font-bold text-md">{title}</h3>
}

export const DialogTitle = ({ title }: { title: string }) => {
  return <h2 className="text-black font-semibold text-xl">{title}</h2>
}
