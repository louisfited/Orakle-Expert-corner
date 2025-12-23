/* eslint-disable react/no-unescaped-entities */
'use client'

import { Button } from '@/components/ui/button'

interface PopupProps {
  onClose: () => void
}

export const PopupPrivacy: React.FC<PopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-black/60 to-black/90 z-50">
      <div className="bg-white rounded-lg p-6 w-full m-10">
        <h1 className="text-xl font-bold">Privacy Policy</h1>
        <div className="border flex flex-col text-left max-h-96 h-auto scroll-smooth overflow-auto p-4">
          <p>
            <b>Orakle Privacy policy</b>
          </p>
          <p>
            This Privacy Policy describes the privacy practices of Orakle and its affiliates (referred to collectively
            as "Orakle," "us," "we" and "our") in relation to your use of our websites, mobile applications and other
            resources intended for use by healthcare professionals and which we refer to as the "Orakle Network,"
            including the personalized information and services that meet the needs and interests of users of the Orakle
            Network, such as medical news, reference content, clinical tools, applications, sponsored programs,
            advertising, email communications, continuing medical education, market research opportunities and
            discussion forums (collectively, the "Services").
          </p>
          <p>
            We provide the Services as a professional resource intended to support healthcare professionals in their
            efforts to provide high quality medical care to patients. You can choose whether or not you want to use the
            Services. If you do choose to use the Services, you must agree to the Orakle Network Terms of Use which is a
            contract between us and users of the Services. By agreeing to the Orakle Network Terms of Use, you confirm
            that you have read and understand this Privacy Policy which explains how we collect, disclose, transfer,
            secure and use information about you in connection with your use of the Services and the rights and choices
            you have regarding these activities. If you do not want us to collect and use information about you as
            described in this Privacy Policy, then you should not use the Services. By using the Services, you
            acknowledge that we will store, use and otherwise process your information in the United States and any
            other country from where the applicable Orakle Network property is operated. Please be aware that the
            privacy laws and standards in certain countries may differ from those that apply in the country in which you
            reside. Unless otherwise specified herein or on the property from which you have accessed this Privacy
            Policy, Orakle is the controller of the personal information that we collect about you as described in this
            Privacy Policy.
          </p>
          <br></br>
          <p>
            <b>Information Collected</b>
          </p>
          <p>Information about your use of the Services is collected as follows:</p>
          <p>
            Registration. In order to use the Services, you may be required to register an account and provide certain
            personal information such as your name, email address, zip/postal code, profession, occupation, specialty
            and depending on your country of practice, your medical license number or equivalent. You may choose to
            update or supplement the personal information that you provided at registration at any time through your
            account settings or by contacting Our Customer Service.
          </p>
          <p>
            Services Information. We automatically collect and store information about your use of the Services, such as
            your engagement with particular content including editorial, advertisements, sponsored informational
            programs from our advertisers, which may include pharmaceutical companies ("Sponsored Programs"), whether
            you opened a particular email, clicked on a link, your search queries and how often and when you engage with
            the Services. We also collect information about your device when you access the Services including IP
            address, precise location information, browser information (including referring URL), cookie information and
            advertising ID (which is a unique, user-resettable identification number for advertising associated with a
            mobile device). We use cookies and other tracking technologies, such as pixels, tags, web beacons and
            software development kits, to collect the information about your use of the Services and your device. For
            more information about our use of cookies and other tracking technologies in relation to your use of the
            Orakle Network, see our Cookie Policy.
          </p>
          <p>
            Cross-Device Tracking. We and our service providers collect and store information about users' interactions
            with unaffiliated websites and applications that use our technologies, including cookies and similar
            tracking technologies. This allows us to infer the presence of a common user or household behind multiple
            devices. We do so in order to:
          </p>
          <p>
            provide personalized advertising on each device that is inferred from the browsing patterns on all of the
            devices;
          </p>
          <p>detect and prevent fraud;</p>
          <p>
            allow users to use our service on one device and pick up seamlessly where they left off on another device;
            and
          </p>
          <p>limit the number of times a user is shown the same advertisement, across known or inferred devices.</p>
          <p>
            For information on your advertising choices and opt-out, please see the “Choices and Control” section of
            this Privacy Notice.
          </p>
          <p>
            Market Research. You may be invited to participate in market research surveys conducted by us or on our
            behalf for our own internal business purposes and also market research surveys conducted by or on behalf of
            third party sponsors that commissioned the survey. For some surveys, you may be asked to provide personal
            information for re-contact (e.g., by email or phone) or payment fulfillment purposes.
          </p>
          <p>
            Information and Registration Forms. From time to time we may offer you the opportunity to receive additional
            information or services from us or from third parties, including our advertisers (e.g., sample request,
            sales rep visit, direct marketing, etc.), or to register to attend live events, either in-person or via
            livestream. If you wish to participate in such opportunities, you may be asked to provide personal
            information to fulfill the request. Unless otherwise specified in the request form, we may use such
            information as described in this Privacy Policy and the third party, if applicable, will be required to use
            such personal information as described at the point of collection.
          </p>
          <p>
            Information from Third Party Sources. We may obtain additional information about you from third party
            sources to assist us in providing the Services. For example, we may use third party information to verify
            and augment your registration information, for research purposes or to personalize the Services, including
            advertising.
          </p>
          <p>
            Non-registered Users. You must register with the Orakle Network to gain full access to Services, however,
            you may be able to access certain limited Services without registering. Even if you have not registered, we
            collect information about your use of the Services through the use of cookies and other tracking
            technologies. The information we collect includes the referring website, if applicable, the type of browser
            you use, the material viewed, and the time and date that you accessed the Services.
          </p>
          <br></br>
          <p>
            <b>How Your Information May be Used</b>
          </p>
          <p>Information about you may be used for the following purposes:</p>
          <p>
            Provision of the Services. We may use the information collected about you to provide and improve the
            Services, and to develop new Services.
          </p>
          <p>
            Member Profiles. We may associate information that we have collected about your use of the Services with
            your registration information and any other information we have about you, as described in this Privacy
            Policy, thereby creating a profile of you that we may update from time to time ("Member Profile"). This
            processing of your Member Profile is necessary to deliver the Services tailored according to your specialty
            and interests (known or inferred), as further described below in Personalize the Services Including
            Advertising.
          </p>
          <p>
            Network Profiles. We may use your registration information, as well as information from Third-Party sources
            such as IQVIA, to create a profile for you that is viewable by other members of the Orakle Network, which
            may be associated with content with which you engage and comments you may post (collectively, your "Network
            Profile").
          </p>
          <p>
            Communications. By registering as a member of the Orakle Network, you agree to the use of your registration
            information and other information collected about you as described in this Privacy Policy to communicate
            with you about the Services and other information that may be of interest to you. These communications may
            be conveyed through a variety of channels, subject to applicable law, including emails and may contain
            advertisements and other promotional materials from third party sponsors, including pharmaceutical
            companies.
          </p>
          <br></br>
          <p>
            <b>Personalize the Services Including Advertising.</b>
          </p>
          <p>
            We may personalize the Services, including the advertising you see within the Orakle Network, on third party
            websites and in our email communications, based on information included in your Member Profile.
          </p>
          <p>
            For example, a user who Orakle believes is a cardiologist or who has browsed cardiology content with the
            Orakle Network may be served an advertisement promoting a particular cardiac product within the Orakle
            Network, on third party websites and/or within an email that a user who Orakle believes is a neurologist or
            has not browsed cardiology content will not see.
          </p>
          <p>
            We partner with third parties to manage and conduct our advertising activities including advertising on our
            websites and on third party websites. These third parties may use cookies and other tracking technologies to
            deliver this advertising based on your activities and interests as inferred from your use of the Services
            and other information they have about you.
          </p>
          <p>
            Also, advertisers may use their own cookies and other tracking technologies in the advertisements served to
            you through the Services, some of which may enable the advertiser to obtain personal information that can be
            used to specifically identify you, including the fact that you saw the advertisement, to the extent that you
            have separately provided consent to the advertiser or to the third party providing the tracking technology.
          </p>
          <p>
            Some advertisers use companies other than Orakle to serve their advertisements on their behalf and to
            monitor users' responses to these advertisements through the use of cookies and other tracking technologies.
          </p>
          <p>
            While Orakle generally permits the use of third party tracking technologies based on an understanding that
            they comply with the Orakle Advertising Policy, we do not have control over these third parties' use of
            cookies and other tracking technologies or how they manage the information they gather through them and
            Orakle may be unable to verify compliance with the Orakle Advertising Policy.
          </p>
          <p>
            Personalization is necessary for the performance of the contract between you and us according to which we
            deliver the Services. We analyze or deduct your preferences and interests based on a number of factors
            including:
          </p>
          <p>
            Your profile (information provided at the registration time), enriched with other information obtained from
            third-party sources such as IQVIA to ensure accuracy of our data and comply with our legal obligations;
          </p>
          <p>Your interactions with our Services and the Orakle Network, such as:</p>
          <p>Your viewing and search history;</p>
          <p>The time and location of your access to our Services;</p>
          <p>The device you use;</p>
          <p>Answers you give to surveys and quiz;</p>
          <p>Our content you post, like, share or recommend, including through social media;</p>
          <p>Other users with similar tastes and preferences on our Service; and</p>
          <p>Your interactions with other websites including with the Orakle Network, subject to our Cookies Policy.</p>
          <p>
            This information is used to classify users into different groups or segments, using algorithms and
            machine-learning.
          </p>
          <p>
            This analysis helps identify links and patterns between different behaviors and characteristics to recommend
            relevant Services for you.
          </p>
          <p>
            This will never prevent you from accessing and browsing the Services available to you within the Orakle
            Network.
          </p>
          <p>
            Verification Purposes. We may use your information in conjunction with information from third parties to
            recognize you as a registered member when you visit one of our properties and to verify your identity and/or
            professional credentials.
          </p>
          <p>
            We may require you to provide proof of your identity, including that you are a healthcare professional, and
            if you are unable to do so to our reasonable satisfaction, we reserve the right to deny you access to the
            Services.
          </p>
          <p>
            While we take steps to verify that our members who identify as healthcare professionals are actually
            healthcare professionals, we make no guarantee as to their identity, professional credentials or licensure
            status.
          </p>
          <p>
            Account Management. We may use your information to administer your account, respond to your inquiries,
            fulfill your requests and send you administrative communications about the Services.
          </p>
          <p>
            Investigations. We may use your information to detect, investigate and defend against fraudulent or unlawful
            activity, violations of the Orakle Network Terms of Use and to otherwise establish, exercise and defend our
            legal rights.
          </p>
          <p>
            Legal Grounds Orakle is relying on to use personal data. The Services and Orakle Network provide tailored
            content from multiple sources through a single interface.
          </p>
          <p>
            We offer a free source of customized information for healthcare professionals. Being a free service, the
            Orakle Network and Services rely on advertising and partnership revenues to support the development of
            specialized content designed for practicing healthcare professionals to help in the diagnosis and treatment
            of diseases.
          </p>
          <p>
            The optimization of advertising to provide you with relevant commercial communications and messages
            therefore goes to the heart of our ability to support the creation of high-quality medical content, and is
            the reason behind many of the uses of personal data described below.
          </p>
          <p>The use of the personal data is necessary, to, respectively:</p>
          <p>
            Perform the contract entered into between Orakle and you in the context of your use of the Services. The
            performance of the contract includes knowing who you are, your specialty, your preferences, and centers of
            interests to provide tailored content, including interest-based sponsored content and tailored commercial
            communications.
          </p>
          <p>
            This is particularly important because the Services are designed to provide recommended content to you, and
            the Services are not available to the general public.
          </p>
          <p>Respond to Orakle's legitimate interests based on the maintenance and improvement of its Services;</p>
          <p>When it comes to:</p>
          <p>
            Newsletters, sending by email interest-based advertising or sharing granular data with sponsors, we process
            data based on the consent you gave us, our service providers, our sponsors, which may be revoked at any time
            (we may in some cases act as data processors for our sponsors);
          </p>
          <p>
            Interest-based advertising on our websites and mobile apps and third-party websites and apps including
            within the Orakle Network, we process and combine data to enrich your profile to respond to our legitimate
            interests based on our business model offering free and relevant Services to you.
          </p>
          <p>
            You may oppose the use of certain Cookies and data compiling (see our Cookie notice for more details on how
            to refuse Cookies and other technologies).
          </p>
          <p>
            Our use of the legitimate interest legal basis is without prejudice to additional requirements on Cookies
            that may flow from Directive 2002/58 or any subsequent European legislation.
          </p>
          <p>
            Process your personal data based on your consent to participate to the market research surveys and the
            performance of the contract entered into between Orakle and you in the context of such market research
            survey; and
          </p>
          <p>
            Comply with any legal constraints applicable to Orakle or satisfy Orakle's legitimate interests based on the
            protection of Orakle's legal rights in connection with the Services and Orakle Network.
          </p>
          <br></br>
          <p>
            <b>Sharing Your Information with Third Parties</b>
          </p>
          <p>Information about your use of the Services may be shared as follows:</p>
          <p>
            Service Providers. We work with third party service providers to help us provide the Services and to
            otherwise assist us in the operation of the Orakle Network, including in the areas of email management and
            deployment, analytics, marketing, advertising, market research, sweepstakes and contest administration,
            identity and professional credential validation, content distribution, customer service, payment
            fulfillment, event logistics, website maintenance and data storage and security.
          </p>
          <p>
            We may provide these service providers with personal information about users of our Services so that they
            can fulfill their responsibilities to us, however, we do require that they agree to limit their use of this
            personal information to the fulfillment of these responsibilities.
          </p>
          <p>
            To provide you with certain personalization and advertising services described herein, we may share certain
            information that we may collect from you, such as your email address (in hashed form), IP address or
            information about your browser or operating system, with our service provider, LiveRamp Inc. and its
            affiliates, which may in turn link demographic or interest-based information to your browser.
          </p>
          <p>You may opt out of this use here.</p>
          <p>
            Advertising and Sponsored Programs. We may provide your personal information to third party sponsors of
            advertisements and Sponsored Programs, subject to applicable law. Specifically, when you are exposed to an
            advertisement through the Services, whether on one of our websites or apps, in an email or through some
            other means, or when you engage in a Sponsored Program, e.g., access a sponsored information resource, open
            one of our sponsored emails, Orakle may provide your personal information, such as your name and specialty
            (but not your email or postal address) to the applicable sponsor and/or its agents on the sponsor's behalf.
          </p>
          <p>
            We may also provide such third parties with details about your engagement with the advertisement or
            Sponsored Program (e.g., whether you viewed or otherwise interacted with certain content), your answers to
            any questions contained in the Sponsored Program and information about you that we have received from third
            parties.
          </p>
          <p>
            Additionally, when you register as a member of the Orakle Network, we may provide your personal information
            (but not your email or postal address) to potential sponsors of advertisements and Sponsored Programs that
            may be offered or provided to you through the Services, subject to applicable law.
          </p>
          <p>Please review the Privacy Policies of these third parties to familiarize yourself with their practices.</p>
          <p>
            All advertisements and Sponsored Programs (including any links to Sponsored Programs) made available within
            the Orakle Network, including through emails, will be identified to you by the label Advertisement,
            Information from Industry, Sponsored, Orakle Professional or some similar designation indicating that the
            content, which may pertain to a particular medical condition, therapy, product or service, has been selected
            by a third-party sponsor.
          </p>
          <p>
            Member Profiles. Subject to applicable law, Orakle may provide Member Profiles, and portions thereof,
            (excluding contact information and information about your participation in specific named CME and CE
            activities) to third parties, including our advertising customers, which these third parties may use for
            their business purposes including marketing.
          </p>
          <p>
            Network Profiles. Your Network Profile may be viewable by other members of the Orakle Network for
            personalization purposes described above and to allow you to view and connect with other members of the
            Orakle Network.
          </p>
          <p>
            Market Research. If you receive remuneration for participating in a market research program offered through
            our Services, we may provide your personal information to our payment fulfillment vendor so that it can
            process and deliver your payment to you and for its recordkeeping and regulatory compliance purposes, and
            also to the program sponsor (or the market research company acting on its behalf) for its recordkeeping and
            regulatory compliance purposes.
          </p>
          <p>
            If you choose to access a survey that is conducted by a third party market research company, we may identify
            you to this company. Sometimes market research companies send us lists of individuals they wish to reach
            with particular market research opportunities and we may inform these companies which of these individuals
            are members of the Orakle Network so that they can manage their recruitment needs accordingly.
          </p>
          <p>
            Also, certain market research opportunities require us or the market research company to contact you
            directly to conduct the survey, including by telephone. We will inform you in the research invitation if you
            will be required to provide additional contact information, e.g., phone number, to participate so that you
            can decide at that time if you wish to proceed with the opportunity.
          </p>
          <p>We do not disclose your survey responses to the sponsor in a manner that identifies you.</p>
          <p>
            Continuing Medical Education. Orakle (“Orakle”) is jointly accredited by the Accreditation Council for
            Continuing Medical Education, the American Nurses Credentialing Center and the Accreditation Council for
            Pharmacy Education to deliver continuing education for the healthcare team (collectively, "CME/CE"), which
            CME/CE activities are hosted by Orakle on Orakle Education (Orakle.digital), which is part of the Orakle
            Network.
          </p>
          <p>
            As an accredited entity, Orakle is required to periodically submit personal information about CME/CE
            participation to the relevant accrediting entities.
          </p>
          <p>
            Orakle and its affiliates that develop independent medical education content (“IME”), including Orakle, may
            provide your personal information to accredited providers that certify CME/CE and IME offered through the
            Services as required to process your credits, fulfill their reporting obligations to the relevant
            accreditation bodies, and for their internal recordkeeping and regulatory purposes.
          </p>
          <p>
            Commercial supporters of CME/CE and IME activities receive only aggregated data about the activities that
            they support including participation and outcomes measurement reports.
          </p>
          <p>
            We may share your personal information among our affiliates for the purpose of sending you a survey with
            respect to a CME/CE or IME activity.
          </p>
          <p>
            Live and Virtual Events. When you register for and/or attend certain promotional webinars and non-CME/IME
            live and virtual events, we may report your participation and personal information (such as your name,
            specialty and contact information) to the partners and sponsors of such programs.
          </p>
          <p>
            Logging in to Another Website Using Your Orakle Network Credentials. Certain third party websites permit you
            to log in using your Orakle Network username and password.
          </p>
          <p>
            If you choose to log in to one of these websites using your Orakle Network access credentials, we may give
            this website information included in your registration profile including personal information such as your
            name, specialty, occupation and email address, (but not your Orakle username and password), which the
            operator of the website has agreed to use in accordance with its website's privacy policy.
          </p>
          <p>
            You should review the third party website's privacy policy before logging in. If the privacy policy of the
            third party site permits, we may receive information about your use of this third party site, which we may
            use in accordance with this Privacy Policy.
          </p>
          <p>
            Adverse Event Reporting. If you provide us information about an adverse event regarding a pharmaceutical
            product or medical device, we may be required to report such information along with your contact information
            to the manufacturer as required for it to fulfill its reporting obligations to the applicable regulatory
            authority.
          </p>
          <p>
            If you do not want this information reported to the applicable manufacturer and regulatory authority, then
            do not provide us with adverse event information.
          </p>
          <p>
            Consent. We may disclose your personal information to a third party in a manner not addressed by this
            Privacy Policy subject to your consent at such time.
          </p>
          <p>
            Aggregated Information. We may provide aggregated information about users of our Services to third parties
            as we deem appropriate in our sole discretion.
          </p>
          <p>
            For example, Orakle may tell a customer what percentage of registered users of the Orakle Network reside in
            a particular geographical area or specialize in a particular clinical area, or what percentage of
            participants in a market research survey selected a particular response to a survey question.
          </p>
          <p>
            Social Widgets. We may include social widgets within our websites and apps which enable you to interact with
            the associated social media services, e.g., to share an article.
          </p>
          <p>
            These widgets may collect browsing data which may be received by the third party that provided the widget,
            and are controlled by these third parties. You may be able to manage your privacy preferences directly with
            the applicable social network platform.
          </p>
          <p>
            Affiliates. We may share your information with any member of our group of companies (meaning our
            subsidiaries, our ultimate holding company and its subsidiaries) for their use for the purposes set forth in
            this Privacy Policy, including to market to you through a variety of channels as described herein, subject
            to applicable law.
          </p>
          <p>
            We partner with our affiliate, PulsePoint, Inc., for the purposes set forth in this Privacy Policy,
            including for measurement, analytics, identification, personalization and in connection with advertising and
            sponsored programs.
          </p>
          <p>
            Subject to applicable law, we may share your information with PulsePoint, which may also use cookies and
            other tracking technologies described herein, for behavioral or targeted advertising, and to provide to us
            analytics, insights, actions and other information related to your use of the Services or those of third
            parties and to its clients to provide similar services to you.
          </p>
          <p>Please review PulsePoint's privacy policy for more information on its privacy practices.</p>
          <p>
            Business Transfers. In connection with a corporate change in control resulting from, for example, a sale to,
            or merger with, another entity, or in the event of a sale of assets or a bankruptcy, we reserve the right to
            transfer your personal information to the new party in control or the party acquiring assets.
          </p>
          <p>
            In the event of such a change, your personal information will continue to be treated in accordance with this
            Privacy Policy, as may be modified as described below.
          </p>
          <p>
            Legal Requirements. We may release personal information when we believe release (i) is required to comply
            with valid legal requirements such as a law, regulation, search warrant, subpoena or court order and to meet
            national security or law enforcement requirements; or (ii) is reasonable in response to a physical threat to
            you or others, to protect property or defend or assert legal rights of us or others.
          </p>
          <br></br>
          <p>
            <b>Security of Information</b>
          </p>
          <p>
            We have implemented appropriate technical and organizational security measures to protect the personal
            information that we have under our control from unauthorized access, use, disclosure and accidental loss.
            When you enter personal information, we encrypt the transmission of that information or use SSL connections
            (Secure Socket Layer) technology. You are solely responsible for maintaining the security and
            confidentiality of your account username and password. Unfortunately, no method of transmission over the
            internet or method of electronic storage is completely secure. Therefore, while we strive to protect your
            personal information, we cannot guarantee its absolute security.
          </p>
          <p>
            Orakle shall retain a user's personal data up to one (1) year after the user's account deactivation subject
            to any relevant provisions of applicable law. Thereafter, the data will be archived (notably to comply with
            any applicable statute of limitations) or fully anonymized.
          </p>
          <br></br>
          <p>
            <b>Choice and Control</b>
          </p>
          <p>
            Account Information. You may update your registration information at any time through the Account Management
            feature available on each of our properties. You may also contact Customer Support at and request that your
            registration information be updated or deleted. Note that if we delete your account, we may maintain certain
            de-identified information about you for internal business purposes including research, analytics and
            reporting.
          </p>
          <p>
            Cookies. Most browser software can be set to reject all cookies, including third-party cookies, however, if
            you choose to reject our cookies, your ability to access and use the Services will be limited. Refer to our
            Cookie Policy for additional information about opting out of cookies.
          </p>
          <p>
            Interest-Based Ads. You can opt-out of interest-based advertising on our websites by rejecting cookies as
            described above and through preferences manager or, if you are located in the European Economic Area (EEA),
            you may also opt-out here. Please note that even if you reject cookies and opt-out of interest-based
            advertising, you will continue to receive generic advertisements through the Services. Note that our
            websites do not respond to web browser “do not track” signals. You can learn more about managing your
            preferences for ads online, particularly for many third-party advertising networks, through resources made
            available by the Digital Advertising Alliance at{' '}
            <a href="https://www.aboutads.info">https://www.aboutads.info</a> or the Network Advertising Initiative at{' '}
            <a href="https://optout.networkadvertising.org">https://optout.networkadvertising.org</a>. Note that if you
            delete cookies, use a different device, or change web browsers, you may need to opt out again.
          </p>
          <p>
            Mobile Opt-out. You may control interest-based advertising on your mobile device by enabling the “Limit Ad
            Tracking” setting in your iOS device's settings or “Opt out of Ads Personalization” in your Android device's
            settings. This will not prevent you from seeing advertisements, but will limit the use of device advertising
            identifiers to personalize ads based on your interests.
          </p>
          <p>
            Precise Location Information. You may disable the transmission of precise location information through your
            device settings. To change location settings on your device, please refer to your device's official
            knowledge base.
          </p>
          <p>
            Email Communications. If you no longer wish to receive a particular type of email communication from us, you
            may unsubscribe by clicking the "unsubscribe" link located at the bottom of the email and following the
            instructions. Also, you may manage your newsletter subscriptions within the newsletter subscriptions area
            within your account settings. Note that certain email communications that we send to members are
            service-related and as long as you are a member of the Orakle Network, you may not unsubscribe from such
            emails. Also, if you have provided us with more than one email address, we may continue to contact you using
            the other email address not associated with the emails from which you have unsubscribed, until you
            unsubscribe from emails sent to that other address.
          </p>
          <p>
            Push Notifications. We may send you push notifications from time-to-time to notify you of upcoming events or
            promotions we think may be relevant to you. If you no longer wish to receive these types of notifications,
            you may turn them off at the device level.
          </p>
          <p>
            U.S. Residents. If you are a resident of a U.S. state with applicable data privacy laws in effect, such laws
            may provide you with additional rights regarding our use of your personal information. For more information
            relevant to you, please click here.
          </p>
          <p>
            In so far as granted by applicable law (in particular in the European Union), you may ask for access to your
            personal data or ask us to rectify, erase, restrict or port your personal data and object to the use of your
            personal data. When the personal data processing is based on your consent, you have the right to withdraw
            your consent concerning such data processing, at any time, without affecting the lawfulness of processing
            based on consent before your withdrawal. For processing necessary to perform the contract, or based on
            legitimate interest, we may not be able to accommodate your request to stop the processing, or if we do so,
            it may mean that you can no longer access the Services as a Orakle Network member. To exercise these rights,
            please click here.
          </p>
          <p>
            If you have concerns, you have a right to complain to your local data protection authority if you are
            concerned about how your personal data is used through or in the context of the Orakle Network or Services.
          </p>
          <p>
            Some of the personal data is required if you become a Orakle Network member. If you do not want to provide
            your (or part of your) personal data, You may not enjoy all or part of the Orakle Network and Services.
          </p>
          <p>
            We make no automated decisions about you that create legal effects or otherwise significantly affect You.
          </p>
          <p>Note to Users Outside of the United States</p>
          <p>
            Orakle, Orakle and most of our group companies are located in the United States, as is a majority of the
            Orakle Network’s technical infrastructure including its data hosting facilities. In order to provide the
            Services to you, we likely will transfer your personal information outside of your country of residence
            including to the United States where it will be stored and processed in accordance with this Privacy Policy.
            We may transfer your information outside the United States to service providers with operations in other
            countries. As part of providing you the Services, personal data is transferred to Orakle in the US or a
            Orakle subsidiary located in The United Kingdom. This means that if you are located in the EU, your personal
            data is transferred to the US or to the UK, which are not considered to have the same level of data
            protection as in the EU. However, we have implemented appropriate safeguards by entering into standard
            contractual clauses with our affiliates located outside the EU so as to ensure an adequate level of
            protection. Information may be stored and processed in any country where Orakle has engaged service
            providers such as in the US. We may also transfer aggregated information and de-identified data or, if you
            have consented to it, your personal data to our sponsors and other third parties described herein located
            outside the EU. These operations may also involve transfers to countries which do not have data protection
            laws considered to be equivalent to those under EU law. However, we ensure all data transfers comply with
            applicable legal requirements (for example, by implementing appropriate contractual clauses).
          </p>
          <p>
            Note that your personal information may be available to the United States government or its agencies under
            legal processes made in the United States.
          </p>
          <br></br>
          <p>
            <b>Children's Privacy</b>
          </p>
          <p>
            The Orakle Network and the Services are designed and intended for use by adults, and are not intended for
            nor designed to be used by children under the age of 21. We do not collect personal information from any
            person we know is under the age of 21.
          </p>
          <br></br>
          <p>
            <b>Privacy Policy Changes</b>
          </p>
          <p>
            We reserve the right to modify this Privacy Policy at any time and any changes will be effective upon
            posting of the modified Privacy Policy unless we advise otherwise. If we make any material changes to this
            Privacy Policy we will notify you by email (sent to the email address included in your account profile)
            and/or by means of a notice on our websites before the change becoming effective. We encourage you to
            periodically review this Privacy Policy for the latest information on our privacy practices. By continuing
            to use the Services after changes are made to this Privacy Policy, you agree to such changes.
          </p>
          <br></br>
          <p>
            <b>Contacting Us</b>
          </p>
          <p>
            If you have general questions about your account or the Services, contact Customer Support at. For questions
            about this Privacy Policy or how your personal information may be used when you use the Services, please
            contact our Privacy Office at.
          </p>
          <p>Orakle's users from the EEA may contact our Data Protection Officer at.</p>
          <p>
            Please note that if you contact us to assist you, we may need to verify your identity before fulfilling your
            request.
          </p>
          <br></br>
          <p>Effective date: Jul 1, 2023.</p>
        </div>
        <Button
          onClick={onClose}
          className="mt-6 w-full"
        >
          Close
        </Button>
      </div>
    </div>
  )
}
