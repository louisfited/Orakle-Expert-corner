import { ChangeEmailForm } from '@/components/page-content/account/forms/change-email-form'
import { getUserProfile } from '@/lib/data/repository/user-profile'
import { GeneralInformationForm } from '@/components/page-content/account/forms/general-information-form'
import { ProfessionalInformationForm } from '@/components/page-content/account/forms/professional-information-form'
import { ChangePasswordDisplay } from '@/components/page-content/account/forms/change-password-display'
import { AccountSettingsForm } from '@/components/page-content/account/forms/account-settings-form'
import { AccountInformationContainer } from '@/components/page-content/account/account-information-container'

export default async function Account() {
  const { data: profileData, error } = await getUserProfile()

  if (error) {
    return <div>Something went wrong with getting your profile.</div>
  }

  return (
    <div className="flex flex-col gap-16">
      <AccountInformationContainer title="General">
        <GeneralInformationForm
          defaultValues={{
            firstName: profileData?.first_name || '',
            lastName: profileData?.last_name || '',
            countryOfPractice: profileData?.country_of_practice || '',
          }}
        />
      </AccountInformationContainer>

      <AccountInformationContainer title="Professional">
        <ProfessionalInformationForm
          defaultValues={{
            licenseNumber: profileData?.license_number || '',
            qualifications: profileData?.qualifications || '',
            occupation: profileData?.occupation || '',
            primarySpecialization: profileData?.primary_specialization || '',
            secondarySpecialization: profileData?.secondary_specialization || '',
          }}
        />
      </AccountInformationContainer>

      <AccountInformationContainer title="Account Settings">
        {/* Separate forms here as each of these need different actions to change*/}
        <ChangeEmailForm />
        <ChangePasswordDisplay />
        <AccountSettingsForm
          defaultValues={{
            phoneNumber: profileData?.phone_number || '',
          }}
        />
      </AccountInformationContainer>
    </div>
  )
}
