import { de } from './languages-objects.ts/de'
import { en } from './languages-objects.ts/en'
import { fr } from './languages-objects.ts/fr'

export const languageTexts = (lang: 'en' | 'fr' | 'de' = 'en') => {
  // const lang = Cookies.get("language")

  if (lang == 'fr') {
    return fr
  }

  // if lang = de
  if (lang == 'de') {
    return de
  }

  // if !lang || lang == "en"
  return en
}

export default languageTexts
