import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LngDetector from 'i18next-browser-languagedetector'
import vi from './vi.json'
import jp from './jp.json'
import en from './en.json'

i18n
  .use(initReactI18next)
  .use(LngDetector)
  .init({
    resources: {
      vi: {
        translations: vi
      },
      en: {
        translations: en
      },
      jp: {
        translations: jp
      }
    },
    lng: 'vi',
    fallbackLng: ['vi', 'en', 'jp'],
    debug: true,
    ns: ['translations', 'signup', 'createService'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    },
    react: {
      wait: true
    }
  })

export default i18n
