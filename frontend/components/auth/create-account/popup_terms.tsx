/* eslint-disable react/no-unescaped-entities */
'use client'

import { Button } from '@/components/ui/button'

interface PopupProps {
  onClose: () => void
}

export const PopupTerms: React.FC<PopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-black/60 to-black/90 z-50">
      <div className="bg-white rounded-lg p-6 w-full m-10">
        <h1 className="text-xl font-bold">Terms and Conditions</h1>
        <div className="border flex flex-col text-left max-h-96 h-auto scroll-smooth overflow-auto p-4">
          <p>
            <b>ORAKLE Terms of Use</b>
          </p>
          <p>
            These Terms of Use ("Terms") apply to your use of the websites, mobile applications and other resources
            provided by ORAKLE LLC and its affiliates (referred to collectively as "ORAKLE," "us," "we" and "our") that
            are intended for use by healthcare professionals, which we refer to as the "ORAKLE Network," including the
            personalized information and services that meet the needs and interests of users of the ORAKLE Network such
            as medical news, reference content, clinical tools, applications, sponsored programs, advertising, email
            communications, continuing medical education, market research opportunities and discussion forums
            (collectively, the "Services"). You will always be able to view the most current version of these Terms by
            clicking on the Terms of Use link at the bottom of any page of a ORAKLE Network property. Note that these
            Terms do not apply to our properties and services that display a link to different terms of use. In the
            event that we expand the ORAKLE Network through our acquisition of another company and/or its properties,
            that company may operate its properties subject to its own terms of use accessible via a link on such
            properties until we integrate its practices with ours, at which point a link to these Terms will be
            displayed on its properties. By using the Services, you agree to these Terms, whether or not you are a
            registered member of the ORAKLE Network. These Terms govern your use of the Services and create a binding
            legal agreement that we may enforce against you in the event of a violation. If you do not agree to all of
            these Terms of Use, do not use the Services!
          </p>
          <br></br>
          <p>
            <b>Account Registration</b>
          </p>
          <p>
            You must register an account with the ORAKLE Network to access all of the Services. Registration requires
            you to provide us with your name, email address, profession, specialty and other information specified in
            the registration form ("Registration Information"), and to select a username and password that will be
            associated with your account. You agree that your Registration Information is true, accurate, current, and
            complete, and you will promptly update your Registration Information as necessary so that it continues to be
            true, accurate, current and complete. We may attempt to verify the accuracy of the Registration Information
            that you have provided and update it as necessary. You are solely responsible for maintaining the
            confidentiality and security of your Orakle account username and password and you may not permit another
            person to use your username and password to access the Services. You are responsible for all activity that
            occurs under your account. If you believe that the security of your account information has been
            compromised, you should immediately change your username and password through the account settings feature
            or notify us and we will assist you. We shall have no liability for any unauthorized access to or use of
            your account information.
          </p>
          <p>
            <b>Use of the Services</b>
          </p>
          <p>
            The Services are intended for physicians and other healthcare professionals. By using the Services, you
            represent and warrant that you have the right, authority, and capacity to agree to and abide by these Terms
            and that you are not prohibited from using the Services or any portion thereof.
          </p>
          <p>
            The information and tools that we make available through the Services are provided for educational and
            informational purposes only. While we hope you find the Services useful to you as a healthcare professional,
            they are in no way intended to serve as a diagnostic service or platform, to provide certainty with respect
            to a diagnosis, to recommend a particular product or therapy or to otherwise substitute for the clinical
            judgment of a qualified healthcare professional. You agree that you will not use the Services with the
            intention of creating any kind of physician/patient relationship, e.g., to diagnose or treat users. You are
            solely responsible for evaluating the information obtained from the Services and for your use or misuse of
            such information in connection with your treatment decisions or otherwise. You agree that you shall be
            solely responsible for your compliance with all laws and standards of professional practice applicable to
            you and the practice of medicine or other relevant health profession.
          </p>
          <p>
            Notwithstanding anything stated herein, you may be subject to certain obligations and responsibilities
            associated with the jurisdiction in which you practice medicine or another health profession. We make no
            representation or warranty as to the legal compliance of the Services or the Orakle Content and you are
            solely responsible for compliance with the laws of your jurisdiction, with respect to your use and misuse of
            the Services and the Orakle Content. We reserve the right, at any time in our sole discretion, to limit the
            availability and accessibility of the Orakle Network, the Services and the Orakle Content to any person,
            geographic area or jurisdiction we so desire.
          </p>
          <p>
            If you are a consumer who chooses to access the professional-level information made available through the
            Services, you should not rely on that information as professional medical advice or use the Services as a
            replacement for any relationship with your physician or other qualified healthcare professional. For medical
            concerns, including decisions about medications and other treatments, consumers should always consult their
            physician or, in serious cases, seek immediate assistance from emergency medical personnel.
          </p>
          <p>
            Subject to your compliance with these Terms, you are granted a limited, non-exclusive, non-transferable and
            non-sublicensable license to use the Services and to view the information and materials made available
            through the Services, including User Content, as defined below, ("Orakle Content") solely for your personal
            and professional use. You shall not use, copy, adapt, modify, prepare derivative works based upon,
            distribute, license, sell, transfer, publicly display, publicly perform, transmit, stream, broadcast or
            otherwise exploit the Services, Orakle Content, or Orakle Network properties, except as expressly permitted
            in these Terms. All rights not expressly granted herein are reserved by us and our respective licensors, as
            applicable.
          </p>
          <p>
            The Orakle Network may contain links to third-party websites or resources which are not part of the Orakle
            Network. You agree that we are not responsible or liable for these websites and resources including, without
            limitation, their availability or the content and information that they provide. The inclusion in the Orakle
            Network of third-party resources, including links to third-party websites, does not imply our endorsement of
            these resources.
          </p>
          <p>
            You agree that you will not engage in any of the following activities in connection with your use of the
            Services:
          </p>
          <p>
            Forge headers or otherwise manipulate identifiers in order to disguise the origin of any content transmitted
            through the Services;
          </p>
          <p>
            Use, display, mirror or frame an Orakle Site or Orakle App, or any component thereof, or Orakle's trademark,
            logo or other proprietary information, without the written consent of Orakle, as applicable;
          </p>
          <p>
            Remove any copyright, trademark or other proprietary rights notices contained within the Orakle Network,
            including those of Orakle and any of their respective licensors;
          </p>
          <p>
            Infringe or use any of our brands, logos trademarks or other proprietary marks in any business name, email,
            URL or other context unless expressly approved in writing by Orakle, as applicable;
          </p>
          <p>Attempt to circumvent any protective technological measure associated with the Services;</p>
          <p>
            Attempt to access or search any Orakle Network properties or any content contained therein through the use
            of any engine, software, tool, agent, device or mechanism (including scripts, bots, spiders, scraper,
            crawlers, data mining tools or the like) other than through software generally available through web
            browsers;
          </p>
          <p>Post, upload, transmit or otherwise distribute chain letters, pyramid schemes, advertising or spam;</p>
          <p>Impersonate or misrepresent your affiliation with another person or entity;</p>
          <p>Harvest or otherwise collect information about others, including email addresses;</p>
          <p>Interfere with or disrupt any of the Services or the associated computer or technical delivery systems;</p>
          <p>
            Interfere with, or attempt to interfere with, the access of any user, host or network, including, without
            limitation, sending a virus, overloading, flooding, spamming, or mail-bombing a Orakle Site or a Orakle App;
          </p>
          <p>
            Fail to respect another user's privacy. This includes revealing another user's password, phone number,
            address, instant messenger I.D. or address or any other personally identifiable information; or
          </p>
          <p>
            Use any Orakle Network property, the Services or any Orakle Content in any manner not permitted by these
            Terms.
          </p>
          <p>We may (but are not obligated to) do any or all of the following without notice:</p>
          <p>Record or pre-screen User Content submissions to public areas within the Orakle Network;</p>
          <p>
            Investigate your use of the Services as we deem appropriate to comply with any applicable law, regulation,
            government request or legal process;
          </p>
          <p>Remove User Content which we believe does not comply with these Terms of Use;</p>
          <p>
            Terminate your access to the Orakle Network upon our determination that you have violated these Terms of
            Use; and
          </p>
          <p>Edit Orakle Content.</p>
          <br></br>
          <p>
            <b>Information that you Make Available through the Services</b>
          </p>
          <p>
            Certain Services enable users to submit content which may include, without limitation, text, images,
            photographs, figures, charts, graphics, reports, data and sound ("User Content"). User Content does not
            include Registration Information. When you submit User Content through the Services you automatically grant
            to us a perpetual, non-exclusive, worldwide, royalty-free, fully paid up, transferable, sub-licensable
            (through multiple tiers) license to distribute, transmit, copy, host, publicly display and perform, excerpt,
            index, tag, modify, adapt, sell, create derivative works from, and otherwise use and exploit such User
            Content in any media, form or format now known or hereafter developed, both within and outside of the Orakle
            Network for any purpose that is consistent with the Orakle Privacy Policy. You agree that you are solely
            responsible for all User Content that you submit through the Services. You represent and warrant that you
            either are the sole and exclusive owner of all User Content or you have all rights, licenses, consents and
            releases that are necessary to grant to us the rights in such User Content as specified in these Terms.
          </p>
          <p>
            You are solely responsible for ensuring that the User Content that you make available through the Services
            complies with applicable laws including, without limitation, those relating to privacy, and also best
            clinical and ethical practices. Prior to submitting any User Content to the Services, you must remove any
            information that identifies an individual or could reasonably enable the identification of an individual,
            e.g., name, e-mail address, social security number, insurance number or other unique identification number,
            biometric identifiers, facial photographs, photographs of identifying marks such as tattoos or scars. You
            shall be solely responsible for any claims arising from your failure to de-identify User Content that you
            submit through the Services.
          </p>
          <p>You agree that you will not use the Services to make available User Content that:</p>
          <p>you do not have the right to make available under any contractual or fiduciary agreement or law;</p>
          <p>
            infringes, misappropriates or violates a third party's patent, copyright, trademark, trade secret, moral
            rights or other intellectual property rights, or rights of publicity or privacy;
          </p>
          <p>
            results in the violation of any applicable law or regulation, including, but not limited to, the Health
            Insurance Portability and Accountability Act (HIPAA) or any other applicable privacy laws;
          </p>
          <p>
            is unlawful, harmful, obscene, defamatory, threatening, harassing, abusive, slanderous, offensive, or
            embarrassing to any other person or entity;
          </p>
          <p>promotes discrimination, bigotry, racism, hatred, harassment or harm against any individual or group;</p>
          <p>promotes illegal activity;</p>
          <p>is fraudulent, false, misleading or deceptive;</p>
          <p>constitutes an advertisement or solicitation of business; or</p>
          <p>
            contains viruses or other harmful computer code designed to interrupt, destroy or limit the use of any
            computer software or hardware.
          </p>
          <br></br>
          <p>
            <b>Orakle For You</b>
          </p>
          <p>
            Orakle For You is a free, personalized web service offered solely to registered users of the Orakle Network.
            The service is uniquely tied to each registered user's registration information and interests provided to
            the Orakle Network. Orakle For You algorithmically uses this information to locate and identify news,
            journal and magazine article headlines and Orakle original content tailored for each registered user based
            on profession, specialty and other information provided to us by such users and which are then selected by
            such users for reference. The headlines, active links and other source identifiers have not been altered,
            edited, or deleted from original sources, except as permitted by license, are not a substitute for the
            original source and are protected by copyright owned by the attributed party. For the full article, users
            are encouraged to follow the applicable active link to the original website.
          </p>
          <br></br>
          <p>
            <b>Proprietary Rights</b>
          </p>
          <p>
            You acknowledge and agree that the Orakle Network and any software used in connection with the Orakle
            Network ("Software") contain proprietary and confidential information that is protected by applicable
            intellectual property and other laws. You further acknowledge and agree that the Orakle Content is protected
            by copyrights, trademarks, service marks, patents or other proprietary rights and laws. Except as expressly
            permitted by applicable law or as authorized by us or the applicable licensor, you agree not to modify,
            rent, lease, loan, sell, distribute, transmit, broadcast, publicly perform, create derivative works from, or
            "scrape" for commercial or any other purpose, the Orakle Network, the Orakle Content or the Software, in
            whole or in part. Any use of the Orakle Network or the Services not expressly permitted by these Terms is a
            breach of these Terms and may violate our and third parties' intellectual property rights.
          </p>
          <p>
            You may view information provided through the Services online, download individual articles to your computer
            or mobile device for later reading or print a copy of an article for yourself. You may not remove any
            copyright notices from our materials. You agree not to access the Services by any means other than through
            the interface that is provided by us for use in accessing the Services.
          </p>
          <br></br>
          <p>
            <b>Privacy Policy</b>
          </p>
          <p>
            The Orakle Network Privacy Policy, located at https://www.orakle.healthcare/privacy-policy, provides
            information about our collection, use and disclosure of information about users of the Services. By
            accessing and using the Services, you agree to the terms of the Privacy Policy and acknowledge and agree
            that the Privacy Policy forms an integral part of these Terms.
          </p>
          <br></br>
          <p>
            <b>Dealing with Third Parties</b>
          </p>
          <p>
            Your correspondence or business dealings with, or participation in promotions of, advertisers or other third
            parties found on or through the Services, including requests for and delivery of goods or services, and any
            other terms, conditions, warranties or representations associated with such dealings, are solely between you
            and such third party. You agree that we shall not be responsible or liable for any loss or damage of any
            sort incurred as the result of any such dealings or as the result of the introduction of such third parties
            through the Services.
          </p>
          <br></br>
          <p>
            <b>Laws that Govern this Agreement</b>
          </p>
          <p>
            We control those components of the Services made available through our respective websites from our offices
            within the state of New York in the United States of America. By accessing the Services, you agree that the
            statutes and laws of the state of New York, without regard to choice of laws principles, will apply to all
            matters relating to use of the Services.
          </p>
          <br></br>
          <p>
            <b>Termination and Modification</b>
          </p>
          <p>
            You agree that we may, under certain circumstances and without prior notice, discontinue, temporarily or
            permanently, the Services (or any part thereof) or eliminate your account and remove any User Content that
            you have made available through the Services, with or without notice, for any of the following reasons
            (which are not intended to be exclusive): (a) breaches or violations of these Terms or other incorporated
            agreements or guidelines, (b) requests by law enforcement or other government agencies, (c) a request by
            you, (d) discontinuance or material modification to the Services (or any part thereof), (e) technical or
            security issues or problems, (f) extended periods of inactivity, and/or (g) your engagement in fraudulent or
            illegal activities. You agree that all terminations for cause shall be made at our sole discretion, and we
            shall not be liable to you or any third party for any termination of your account or access to the Services.
          </p>
          <br></br>
          <p>
            <b>Disclaimer</b>
          </p>
          <p>
            THE Orakle NETWORK, PROPERTIES, SERVICES, AND Orakle CONTENT ARE PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
            KIND, EITHER EXPRESS OR IMPLIED. WITHOUT LIMITING THE FOREGOING, WE EXPRESSLY DISCLAIM ANY WARRANTIES,
            EXPRESS IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, QUIET ENJOYMENT
            OR NON-INFRINGEMENT, AND ANY WARRANTIES ARISING OUT OF COURSE OF DEALING OR USAGE OF TRADE. WE MAKE NO
            WARRANTY THAT THE Orakle NETWORK, SERVICES OR Orakle CONTENT WILL MEET YOUR REQUIREMENTS OR BE AVAILABLE ON
            AN UNINTERRUPTED, SECURE, OR ERROR-FREE BASIS. WE MAKE NO WARRANTY AS TO THE ACCURACY, TIMELINESS,
            COMPLETENESS OR RELIABILITY OF ANY CONTENT OBTAINED THROUGH THE SERVICES. NO INFORMATION PROVIDED THROUGH
            THE SERVICES OR BY US IN ORAL OR WRITTEN FORM WILL CREATE ANY WARRANTY NOT EXPRESSLY MADE HEREIN YOUR
            RELIANCE UPON THE CONTENT OBTAINED OR USED BY YOU THROUGH THE SERVICES IS SOLELY AT YOUR OWN RISK. YOU ARE
            SOLELY RESPONSIBLE FOR ALL OF YOUR COMMUNICATIONS AND INTERACTIONS WITH OTHER USERS OF THE Orakle NETWORK.
            YOU UNDERSTAND THAT WE DO NOT ASSUME RESPONSIBILITY FOR SCREENING ANY USER OF THE Orakle NETWORK NOR DO WE
            VERIFY OR TAKE RESPONSIBILITY FOR USER CONTENT. WE DO NOT PROVIDE MEDICAL ADVICE AND WE DO NOT RECOMMEND OR
            ENDORSE ANY SPECIFIC PRODUCTS, PRODUCT USERS, THERAPIES, TESTS, PHYSICIANS, HEALTHCARE PROFESSIONS OR
            OPINIONS.
          </p>
          <br></br>
          <p>
            <b>Liability</b>
          </p>
          <p>
            In no event will any of us or our respective directors, officers, employees, contractors, agents, sponsors,
            licensors or any other person or entity involved in creating, developing or delivering the Orakle Network,
            the Services or the Orakle Content be liable for any damages (including, without limitation, incidental and
            consequential damages, personal injury/wrongful death, lost profits, or damages resulting from lost data or
            business interruption) arising out of or in connection with these Terms or from the use of or inability to
            access or use the Orakle Network, the Services or the Orakle Content, or from any communications or
            interactions with other persons with whom you communicate or interact as a result of your use of the
            Services, whether based on warranty, contract, tort, or any other legal theory, and whether or not we, our
            licensors, ours suppliers, or any third parties mentioned with the Services are advised of the possibility
            of such damages. We, our licensors, our suppliers, or any third parties mentioned within the Services are
            not liable for any personal injury, including death, caused by your use or misuse of the Services or any
            information provided through the Services. Any claims arising in connection with your use of the Services
            must be brought within one (1) year of the date of the event giving rise to such action occurred. Remedies
            under these Terms are exclusive and are limited to those expressly provided for in these Terms. The
            limitations of damages set forth above are fundamental elements of the basis of the bargain between us and
            you.
          </p>
          <br></br>
          <p>
            <b>Indemnity</b>
          </p>
          <p>
            If you believe in good faith any materials within the Orakle Network infringe your copyright, you may
            request removal of those materials (or access thereto) by contacting our copyright agent (identified below)
            and providing the following information:
          </p>
          <p>
            Identification of the copyrighted work that you believe to be infringed. Please describe the work, and where
            possible include a copy or the location (e.g., URL) of an authorized version of the work.
          </p>
          <p>
            Identification of the material that you believe to be infringing and its location. Please describe the
            material, and provide us with its URL or any other pertinent information that will allow us to locate the
            material.
          </p>
          <p>Your name, address, telephone number and (if available) e-mail address.</p>
          <p>
            A statement that you have a good faith belief that the complained of use of the materials is not authorized
            by the copyright owner, its agent, or the law.
          </p>
          <p>
            A statement that the information that you have supplied is accurate, and indicating that "under penalty of
            perjury," you are the copyright owner or are authorized to act on the copyright owner's behalf.
          </p>
          <p>A signature or the electronic equivalent from the copyright holder or authorized representative.</p>
          <p>Our team member for copyright issues relating to this website is as follows: contact</p>
          <p>
            Any notification by a copyright owner or a person authorized to act on its behalf that fails to comply with
            requirements specified above shall not be considered sufficient notice and shall not be deemed to confer
            upon us actual knowledge of facts or circumstances from which infringing material or acts are evident. We
            may terminate the account of any user who we determine is a repeat infringer.
          </p>
          <br></br>
          <p>
            <b>Modifications</b>
          </p>
          <p>
            We reserve the right, at our sole discretion, to modify, discontinue or terminate any of the Services, the
            Orakle Content or these Terms, at any time and without prior notice. If we modify these Terms in a material
            way, we will provide notice of such modification within the Orakle Network. By continuing to access or use
            the Services after we have modified these Terms, you agree to be bound by the modified Terms. If the
            modified Terms are not acceptable to you, you agree to immediately stop using the Orakle Network and the
            Services.
          </p>
          <br></br>
          <p>
            <b>Complete Agreement</b>
          </p>
          <p>
            Except as expressly provided in a particular "legal notice" on the website, these Terms (including the
            Orakle Network Privacy Policy) constitute the entire agreement between you, Orakle and Orakle with respect
            to your use (and prior use) of the Orakle Network and the associated Services and Orakle Content.
          </p>
          <p>
            These Terms constitute the entire and exclusive understanding and agreement between Orakle, Orakle and you
            regarding Orakle Network and the Services and these Terms supersede and replace any and all prior oral or
            written understandings or agreements between Orakle, Orakle and you regarding the Orakle Network and the
            Services.
          </p>
          <br></br>
          <p>
            <b>Assignment</b>
          </p>
          <p>
            You may not assign or transfer these Terms, by operation of law or otherwise, without our prior written
            consent. Any attempt by you to assign or transfer these Terms, without such consent, will be null and of no
            effect. We may assign or transfer these Terms, at our sole discretion, without restriction. Subject to the
            foregoing, these Terms will bind and inure to the benefit of the parties, their successors and permitted
            assigns. Further, any of us may exercise the rights described in these Terms.
          </p>
          <br></br>
          <p>
            <b>Notices</b>
          </p>
          <p>
            Any notices or other communications permitted or required hereunder, including those regarding material
            modifications to these Terms, will be in a written form and given: (i) by us via email (in each case to the
            email address included in your Registration Information); or (ii) by posting within the Orakle Network. For
            notices made by e-mail, the date of receipt will be deemed the date on which such notice is transmitted.
          </p>
          <br></br>
          <p>
            <b>No Waiver</b>
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will not constitute a waiver of future
            enforcement of that right or provision. Except as expressly set forth in these Terms, the exercise by either
            party of any of its remedies under these Terms will be without prejudice to its other remedies under these
            Terms or otherwise.
          </p>
          <br></br>
          <p>
            <b>Survival</b>
          </p>
          <p>
            All provisions of these Terms shall survive termination of your Orakle Network account except for your
            license to access and use the Services and the Orakle Content.
          </p>
          <br></br>
          <p>
            <b>Contact Us</b>
          </p>
          <p>
            If you have questions about the Services or these Terms, or you wish to provide feedback, please contact us
            at via our contact form here. By submitting feedback and suggestions, you grant a non-exclusive, perpetual,
            irrevocable, and royalty-free license to any intellectual property rights you may have in your feedback and
            suggestions to us to use to improve the Services.
          </p>
          <br></br>
          <p>Last updated: Jul 12, 2023.</p>
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
