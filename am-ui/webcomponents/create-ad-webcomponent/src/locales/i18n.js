import { createI18n } from 'vue-i18n';

export default createI18n({
  locale: 'en',
  legacy: false,
  messages: {
    en: {
      affirmative: "Yes",
      negative: "No",
      offer: "I'm offering",
      request: "I'm looking for",
      categoriesPlaceholder: 'Ad category',
      publish: 'Publish',
      preview: 'Preview',
      back: 'Back',
      delete: 'Delete',
      upload: 'Upload images',
      uploadThumbnail: 'Upload thumbnail',
      categories: {
        accomodation: {
          subCategories: {
            room: 'Room',
            apartment: 'Apartment',
            house: 'House',
            parking: 'Parking space'
          },
          typeTitle: 'Accommodation',
          title: 'Title',
          region: 'Location',
          postalCode: 'Zipcode',
          address: 'Address, No.',
          rooms: 'Rooms',
          size: 'Living space (M²)',
          price: 'Rent (CHF)',
          floor: 'Floor',
          lat: 'Latitude (x-coordinate)',
          lon: 'Longitude (y-coordinate)',
          priceUnit: {
            title: 'Price unit',
            options: {
              month: 'Per month',
              week: 'Per Week',
              day: 'Per Day'
            }
          },
          availability: {
            title: 'Available',
            options: {
              now: 'Immediately',
              date: 'Specific date',
              agreement: 'By agreement'
            }
          },
          temporary: 'Temporary',
          start_date: 'Moving Date',
          furnished: 'Furnished',
          description: 'Description',
          expectations: 'My expectation of the tenant',
          about: 'Brief description about me',
          phone: 'Phone number',
          email: 'E-Mail',
          date: 'From date',
          radius: 'Radius (KM)',
          toPrice: 'Max Rent',
          fromSize: 'Min Living space (M²)',
          propertySize: 'Property size (M²)',
          fromRooms: 'Min rooms'
        },
        carShare: {
          typeTitle: 'Car sharing',
          subCategories: {
            share: 'Car sharing'
          }
        }
      }
    },
    de: {
      affirmative: "Ja",
      negative: "Nein",
      offer: 'Ich biete',
      request: 'Ich suche nach',
      categoriesPlaceholder: 'Art des Angebots',
      publish: 'Veröffentlichen',
      preview: 'Vorschau anzeigen',
      back: 'Zurück',
      delete: 'Löschen',
      upload: 'Bilder hochladen',
      uploadThumbnail: 'Vorschaubild hochladen',
      categories: {
        accomodation: {
          subCategories: {
            room: 'Zimmer',
            apartment: 'Wohnung',
            house: 'Haus',
            parking: 'Parkplatz',
          },
          typeTitle: 'Unterkünfte',
          title: 'Titel',
          region: 'Ort',
          postalCode: 'PLZ',
          address: 'Strasse, Nr.',
          rooms: 'Zimmer',
          size: 'Wohnfläche (M²)',
          price: 'Miete (CHF)',
          floor: 'Etage',
          lat: 'Breitengrad (x-Koordinate)',
          lon: 'Längengrade (y-Koordinate)',
          priceUnit: {
            title: 'Preiseinheit',
            options: {
              month: 'Pro Monat',
              week: 'Pro Woche',
              day: 'Pro Tag'
            }
          },
          availability: {
            title: 'Verfügbar',
            options: {
              now: 'Ab sofort',
              date: 'Ab Datum',
              agreement: 'Auf Anfrage'
            }
          },
          temporary: 'Befristet',
          start_date: 'Umzugsdatum',
          furnished: 'Möbiliert',
          description: 'Beschreibung',
          expectations: 'Meine Erwartung an den Mieter',
          about: 'Kurze Beschreibung über mich',
          phone: 'Telefonnummer',
          email: 'E-Mail',
          date: 'Ab Datum',
          radius: 'Radius (KM)',
          toPrice: 'Maximale Miete',
          fromSize: 'Mindestwohnfläche (M²)',
          propertySize: 'Grundstücksgröße (M²)',
          fromRooms: 'Mindestzimmer'
        },
        carShare: {
          typeTitle: 'Car sharing',
          subCategories: {
            share: 'Car sharing'
          }
        }
      }
    }
  }
});
