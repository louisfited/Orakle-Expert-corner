import { ReactNode } from 'react'

export const AccountInformationContainer = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className=" text-lg lg:text-[26px]">{title}</h1>
      <div className="bg-white p-8 rounded-md">{children}</div>
    </div>
  )
}
