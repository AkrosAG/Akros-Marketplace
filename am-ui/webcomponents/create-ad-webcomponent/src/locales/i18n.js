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
          typeTitle: 'Accomodation',
          type: {
            title: 'Type of accomodation',
            types: {
              room: 'Room',
              apartment: 'Apartment',
              house: 'House',
              parking: 'Parking space',
            },
          },
          title: 'Title',
          region: 'Region',
          postalCode: 'Zipcode',
          address: 'Address, No.',
          rooms: 'Rooms',
          size: 'Living space (m2)',
          price: 'Rent (CHF)',
          floor: 'Floor',
          price_unit: {
            title: 'Price unit',
            price_units: {
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
      categories: {
        accomodation: {
          typeTitle: 'Unterkünfte',
          type: {
            title: 'Art der Unterkunft',
            types: {
              room: 'Zimmer',
              apartment: 'Wohnung',
              house: 'Haus',
              parking: 'Parkplatz',
            },
          },
          title: 'Titel',
          region: 'Region',
          postalCode: 'PLZ',
          address: 'Strasse, Nr.',
          rooms: 'Zimmer',
          size: 'Wohnfläche (m2)',
          price: 'Miete (CHF)',
          floor: 'Etage',
          price_unit: {
            title: 'Preiseinheit',
            price_units: {
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
          typeTitle: 'Car sharing',
          types: {
            share: 'Car sharing',
          },
        },
      },
    },
  },
});
