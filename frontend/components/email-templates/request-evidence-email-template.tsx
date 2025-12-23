import * as React from 'react'

interface EmailTemplateProps {
  firstName: string
}

export const RequestEvidenceEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ firstName }) => (
  <div>
    <h3>Hello, {firstName}!</h3>
    <p>
      Thank you for registering with Expert&apos;s Corner. Expert&apos;s Corner, by Orakle, is the world&apos;s foremost
      case-based learning platform, and we&apos;re excited to have you join our community. As a platform exclusively for
      qualified healthcare providers, it is essential that we verify your credentials before granting access.
    </p>
    <br />
    <p>
      To proceed with your account approval, we kindly ask you to provide proof of your medical qualifications. Please
      reply to this email with a copy of your credentials at your earliest convenience.
    </p>

    <br />

    <p>
      We take your privacy seriously and fully comply with GDPR and other data privacy regulations. Your submitted
      documents will be securely handled and used solely for the purpose of verifying your medical qualifications. Once
      the verification process is complete, your data will be permanently destroyed, and your account approved.
    </p>

    <br />
    <p>
      Thank you for your cooperation.
      <br />
      Best regards, The Orakle Team
    </p>
  </div>
)
