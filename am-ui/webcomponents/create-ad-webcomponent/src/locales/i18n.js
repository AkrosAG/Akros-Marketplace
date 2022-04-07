import {createI18n} from 'vue-i18n';

export default createI18n({
  locale: 'en',
  legacy: false,
  messages: {
    en: {
      offer: "I'm offering",
      request: "I'm looking for",
      categoriesPlaceholder: 'Ad category',
      categories: {
        accomodation: {
          title: 'Accomodation',
          type: {
            title: 'Type of accomodation',
            types: {
              room: 'Room',
              apartment: 'Apartment',
              house: 'House',
              parking: 'Parking space',
            },
          },
          region: 'Region',
          postalCode: 'Zipcode',
          address: 'Address, No.',
          rooms: 'Rooms',
          size: 'Living space (m2)',
          price: 'Rent (CHF)',
          floor: 'Floor',
          frequency: {
            title: 'Price unit',
            frequencies: {
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
          publish: 'Preview and publish',
        },
        carShare: {
          title: 'Car sharing',
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
      categories: {
        accomodation: {
          title: 'Unterkünfte',
          type: {
            title: 'Art der Unterkunft',
            types: {
              room: 'Zimmer',
              apartment: 'Wohnung',
              house: 'Haus',
              parking: 'Parkplatz',
            },
          },
          region: 'Region',
          postalCode: 'PLZ',
          address: 'Strasse, Nr.',
          rooms: 'Zimmer',
          size: 'Wohnfläche (m2)',
          price: 'Miete (CHF)',
          floor: 'Etage',
          frequency: {
            title: 'Preiseinheit',
            frequencies: {
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
          publish: 'Vorschau anzeigen und veröffentlichen',
        },
        carShare: {
          title: 'Car sharing',
          types: {
            share: 'Car sharing',
          },
        },
      },
    },
  },
});
