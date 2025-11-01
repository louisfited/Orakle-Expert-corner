export interface PastVisit {
  startDate: number
  rr: string
  kg: string
  bmi: string
  actionText: {
    text: {
      html: any
    }
  }[]
}

export interface PastTest {
  startDate: number
  name: string
  actionText: {
    text: {
      html: any
    }
  }[]
  actionResult: {
    result: string
    units: string
    rangeStart: number
    rangeEnd: number
  }[]
  actionFinding: {
    name: string
    value: {
      html: any
    } // Rich Text
    range: string
  }[]
  findingsText: {
    html: any
  }
}

export interface Test {
  id: string
  date: string
  name: string
  guidance: boolean
  findings: {
    html: any
  }
  guidanceText: {
    html: any
  }
}

export interface Diagnose {
  id: string
  name: string
  startDate: number
  endDate: number
  guidance: boolean
  isExisting: boolean
  guidanceText: {
    html: any
  }
  reviewed: boolean
  url: string
}

export interface treatment {
  id: string
  name: string
  guidance: boolean
  guidanceType: string
  actionText: {
    text: {
      html: any
    }
  }[]
  rationales: string[]
}

export interface Order {
  id: string
  name: string
  startDate: number
  endDate: number
  continue: boolean
  isExisting: boolean
  actionText: {
    text: {
      html: any
    }
  }[]
}

export type NonMedicationOrder = {
  id: string
  name: string
  category: string
  actionText: {
    text: {
      html: any
    }
  }[]
  isExisting: boolean
  guidance: boolean
}

// Used for guidance logic
export type PastOrderWithChecked = Order & { isChecked?: boolean }

export type MedicationSelection = {
  reviewed: boolean
  name: string
  guidanceType: string
  actionText: {
    text: {
      html: any
    }
  }[]
  rationales: string[]
}

export type MedicalCaseInformation = {
  title: string
  clinicalBackground: {
    html: string
  }
  followUp: {
    html: string
  }
  audioUrl: Audio[]
}

export type Video = {
  videoTitle: string
  transcript: {
    html: string
  }
  url: string
}

export type Audio = {
  audioTitle: string
  url: string
}


export interface WebinarVideo {
 
    id: string;
    name: string;
    description: string;
    videoUrl: string;
    contentType: string;
    supporter: string;
    faculty: string;
    title: string;
    finishUrl:string;
    caseDescription: {
      html: string;
    } | null;
  
}

export interface MedicalCase {
  id: string
  title: string
  supporter: string
  faculty: string
  medicationAmount: number
  quizHtml: {
    html: string
  }
  quizStepPosition: number
  prescribingInformation: {
    html: string
  }
  caseDescription: {
    html: string
  }
  historyOfPresentIllness: {
    html: string
  }
  familyAndSocialHistory: {
    html: string
  }
  importantInformation: {
    html: string
  }
  physicalExaminationNotes: {
    html: string
  }
  pastVisits: PastVisit[]
  pastTests: PastTest[]
  tests: Test[]
  videoUrl: Video[]
  diagnose: Diagnose[]
  order: Order[]
  nonMedicationOrder: NonMedicationOrder[]
  medicationSelection: MedicationSelection[]
  countries: []
  categories: []
  finishUrl: string
  showBannerTopBarImage: boolean
  bannerTopBarImage: {
    url: string
  }
  patient: {
    id: string
    firstName: string
    lastName: string
    patientDescription: string
    age: number
    showAgeAsMonths: boolean
    weight: number
    bmi: number
    gender: string
    height: number
    allergies: string[]
    profileImage: {
      url: string
    }
  }
  closingRemarks: {
    html: string
  }
  literatureReview: {
    html: string
  }
  references: {
    html: string
  }
  likes: number
  preCaseInformation: {
    html: string
  }
}

export interface MedicalCaseV2 {
  id: string
  title: string
  supporter: string
  faculty: string
  medicalCaseInformation: MedicalCaseInformation
  diagnose: Diagnose[]
  treatment: treatment[]
  finishUrl: string
  patient: {
    id: string
    firstName: string
    lastName: string
    patientDescription: string
    age: number
    showAgeAsMonths: boolean
    weight: number
    bmi: number
    gender: string
    height: number
    allergies: string[]
    profileImage: {
      url: string
    }
  }
  silhouette: {
    url: string
  }
  likes: number
}

export interface PatientCase {
  id: string
  firstName: string
  lastName: string
  patientDescription: string
  age: number
  showAgeAsMonths: boolean
  weight: number
  bmi: number
  gender: string
  height: number
  allergies: string[]
  profileImage: {
    url: string
  }
}

export interface Export {
  name: string
  data: Array<any>
}
