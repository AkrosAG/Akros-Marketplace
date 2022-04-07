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
      categories: {
        accomodation: {
          title: 'Accomodation',
          types: {
            room: 'Room',
            apartment: 'Apartment',
            house: 'House',
            parking: 'Parking space',
          },
          type: 'Type of accomodation',
          region: 'Region',
          postalCode: 'Zipcode',
          address: 'Address, No.',
          rooms: 'Rooms',
          size: 'Living space (m2)',
          price: 'Rent (CHF)',
          floor: 'Floor',
          priceUnit: 'Price unit',
          priceUnits: {
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
      },
      carShare: {
        title: 'Car sharing',
        types: {
          share: 'Car sharing',
        },
      },
    },
    de: {
      offer: 'Ich biete',
      request: 'Ich suche nach',
      publish: 'Vorschau anzeigen und veröffentlichen',
      categories: {
        accomodation: {
          title: 'Unterkünfte',
          types: {
            room: 'Zimmer',
            apartment: 'Wohnung',
            house: 'Haus',
            parking: 'Parkplatz',
          },
          type: 'Art der Unterkunft',
          region: 'Region',
          postalCode: 'PLZ',
          address: 'Strasse, Nr.',
          rooms: 'Zimmer',
          size: 'Wohnfläche (m2)',
          price: 'Miete (CHF)',
          floor: 'Etage',
          priceUnit: 'Preiseinheit',
          priceUnits: {
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
      },
      carShare: {
        title: 'Car sharing',
        types: {
          share: 'Car sharing',
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
