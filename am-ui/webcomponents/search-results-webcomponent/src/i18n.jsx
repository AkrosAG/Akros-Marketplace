import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// TODO: or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      noResults: 'Unfortunately your search criteria produced no result.',
      month: 'Month',
      week: 'Week',
      day: 'Day',
      room: 'Room',
      apartment: 'Apartment',
      house: 'House',
      parking: 'Parking',
      sortBy: 'Sort by: ',
      byPriceLowToHigh: 'Price: Increasing',
      byPriceHighToLow: 'Price: Decreasing',
      byDateNewToOld: 'Date: Newest First',
      byDateOldToNew: 'Date: Oldest First',
      location: 'Location: Alphabetical'
    }
  },
  de: {
    translation: {
      noResults: 'Die gesetzten Suchkriterien haben leider keinen Treffer ergeben.',
      month: 'Monat',
      week: 'Woche',
      day: 'Tag',
      room: 'Zimmer',
      apartment: 'Wohnung',
      house: 'Haus',
      parking: 'Parkplatz',
      sortBy: "Sortieren nach: ",
      byPriceLowToHigh: 'Preis: Aufsteigend',
      byPriceHighToLow: 'Preis: Absteigend',
      byDateNewToOld: 'Datum: Neuste zuerst',
      byDateOldToNew: 'Datum: Älteste zuerst',
      location: 'Ort: Alphabetisch'
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'de', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
