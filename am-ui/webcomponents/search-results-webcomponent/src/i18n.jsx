import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// TODO: or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      'no-results': 'Unfortunately your search criteria produced no result.',
    },
  },
  de: {
    translation: {
      'no-results':
        'Die gesetzten Suchkriterien haben leider keinen Treffer ergeben.',
    },
  },
};

const languageDetector = {
  init: Function.prototype,
  type: 'languageDetector',
  async: true,
  detect: async callback => {
    const storeLanguage = await AsyncStorage.getItem('language');
    const selectedLanguage = storeLanguage || initialLanguage;
    callback(selectedLanguage);
  },
  cacheUserLanguage: () => {},
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(languageDetector)
  .init({
    resources,
    lng: 'de', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
