import {createI18n} from 'vue-i18n';

export const i18n = createI18n({
  locale: 'en',
  legacy: false,
  globalInjection: true,
  messages: {
    en: {
      offer: 'I offer',
      request: 'Im looking for',
      publish: 'Preview and publish',
      category: 'Category',
      categories: {
        accomodation: {
          name: 'Accomodation',
          title: 'Title',
          type: 'Type of accomodation',
          type_options: {
            room: 'Room',
            apartment: 'Apartment',
            house: 'House',
            parking: 'Parking space',
          },
          region: 'Region',
          postalCode: 'Zipcode',
          address: 'Address, No.',
          rooms: 'Rooms',
          size: 'Living space (m2)',
          price: 'Rent (CHF)',
          floor: 'Floor',
          price_unit: 'Price unit',
          price_unit_options: {
            month: 'Per month',
            week: 'Per Week',
            day: 'Per Day',
          },
          furnished: 'Furnished',
          description: 'Description',
          expectations: 'My expectation on the tenant',
          about: 'Brief description about me',
          phone: 'Phone number',
          email: 'E-mail',
        },
        carShare: {
          name: 'Car sharing',
          title: 'Title',
          types: {
            share: 'Car sharing',
          },
        },
      },
    },
    de: {
      offer: 'Ich biete',
      request: 'Ich suche nach',
      publish: 'Vorschau anzeigen und veröffentlichen',
      category: 'Categorie',
      categories: {
        accomodation: {
          title: 'Title',
          type: 'Art der Unterkunft',
          type_options: {
            room: 'Zimmer',
            apartment: 'Wohnung',
            house: 'Haus',
            parking: 'Parkplatz',
          },
          region: 'Region',
          postalCode: 'PLZ',
          address: 'Strasse, Nr.',
          rooms: 'Zimmer',
          size: 'Wohnfläche (m2)',
          price: 'Miete (CHF)',
          floor: 'Etage',
          price_unit: 'Preiseinheit',
          price_unit_options: {
            month: 'Pro Monat',
            week: 'Pro Woche',
            day: 'Pro Tag',
          },
          furnished: 'Möbliert',
          description: 'Beschreibung',
          expectations: 'Meine Erwartung an den Mieter',
          about: 'Kurze Beschreibung über mich',
          phone: 'Telefonnummer',
          email: 'E-mail',
        },
        carShare: {
          title: 'Title',
          name: 'Car sharing',
          types: {
            share: 'Car sharing',
          },
        },
      },
    },
  },
});

export const translate = (key: string) => {
  if (!key) {
    return '';
  }
  return i18n.global.t(key);
};
