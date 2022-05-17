import { config } from '@vue/test-utils';

const tranlations = {
  locale: 'en',
  legacy: false,
  messages: {
    en: {
      offer: "I'm offering",
      request: "I'm looking for",
      categoriesPlaceholder: 'Ad category',
      publish: 'Preview and publish',
      categories: {
        accomodation: {
          typeTitle: 'Accomodation',
          type: {
            title: 'Type of accomodation',
            options: {
              room: 'Room',
              apartment: 'Apartment',
              house: 'House',
              parking: 'Parking space',
            },
          },
          title: 'Title',
          region: 'Location',
          postalCode: 'Zipcode',
          address: 'Address, No.',
          rooms: 'Rooms',
          size: 'Living space (m2)',
          price: 'Rent (CHF)',
          floor: 'Floor',
          price_unit: {
            title: 'Price unit',
            options: {
              month: 'Per month',
              week: 'Per Week',
              day: 'Per Day',
            },
          },
          furnished: 'Furnished',
          description: 'Description',
          expectations: 'My expectation of the tenant',
          about: 'Brief description about me',
          phone: 'Phone number',
          email: 'E-Mail',
          date: 'From date',
        },
        carShare: {
          typeTitle: 'Car sharing',
          types: {
            share: 'Car sharing',
          },
        },
      },
    },
    de: {
      offer: 'Ich biete',
      request: 'Ich suche nach',
      categoriesPlaceholder: 'Art des Angebots',
      publish: 'Vorschau anzeigen und veröffentlichen',
      categories: {
        accomodation: {
          typeTitle: 'Unterkünfte',
          type: {
            title: 'Art der Unterkunft',
            options: {
              room: 'Zimmer',
              apartment: 'Wohnung',
              house: 'Haus',
              parking: 'Parkplatz',
            },
          },
          title: 'Titel',
          region: 'Ort',
          postalCode: 'PLZ',
          address: 'Strasse, Nr.',
          rooms: 'Zimmer',
          size: 'Wohnfläche (m2)',
          price: 'Miete (CHF)',
          floor: 'Etage',
          price_unit: {
            title: 'Preiseinheit',
            options: {
              month: 'Pro Monat',
              week: 'Pro Woche',
              day: 'Pro Tag',
            },
          },
          furnished: 'Möbiliert',
          description: 'Beschreibung',
          expectations: 'Meine Erwartung an den Mieter',
          about: 'Kurze Beschreibung über mich',
          phone: 'Telefonnummer',
          email: 'E-Mail',
          date: 'Ab Datum',
        },
        carShare: {
          typeTitle: 'Car sharing',
          types: {
            share: 'Car sharing',
          },
        },
      },
    },
  },
};

config.global.mocks = {
  $t: (msg) => {}
};
