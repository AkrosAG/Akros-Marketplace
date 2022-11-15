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
      adIsPublished:'Ad is published',
      adError:'An error has occured',
      errorMessage_title_tooLongOrTooShort: 'Title is too long or too short',
      errorMessage_address_tooLongOrTooShort: 'Address is too long or too short',
      errorMessage_region: 'Region missing',
      errorMessage_expectations_exdeab: 'Please state your expectations',
      errorMessage_description_exdeab: 'Please provide a description',
      errorMessage_about_exdeab: 'Please provide a description about yourself',
      errorMessage_postalCode: 'Postcode missing',
      errorMessage_email: 'E-Mail wrong',
      errorMessage_singleFileTooBig: 'One picture is too big',
      errorMessage_sumOfFilesTooBig: 'The total size of all images is too large',
      errorMessage_size_NaN: 'Invalid value',
      errorMessage_floor_NaN: 'Invalid value',
      errorMessage_price_NaN: 'Invalid value',
      errorMessage_phone_NaN: 'Invalid phone number',
      errorMessage_size_missing: 'Living space is missing',
      errorMessage_floor_missing: 'Floors are missing',
      errorMessage_price_missing: 'Rent is missing',
      errorMessage_phone_missing: 'Please enter a telephone number',
      errorMessage_priceUnit_nothingSelected: 'Please select a price unit',
      errorMessage_availability_nothingSelected: 'Please select availability',
      preview: 'Preview',
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
      adIsPublished:'Anzeige wird veröffentlicht',
      adError:'Ein Fehler ist aufgetreten',
      errorMessage_title_tooLongOrTooShort: 'Titel zu lange oder zu kurz',
      errorMessage_address_tooLongOrTooShort: 'Adresse zu lange oder zu kurz',
      errorMessage_region: 'Ort fehlt',
      errorMessage_expectations_exdeab: 'Bitte geben Sie Ihre Erwartungen an',
      errorMessage_description_exdeab: 'Bitte geben Sie eine Beschreibung an',
      errorMessage_about_exdeab: 'Bitte geben Sie eine Beschreibung über sich an',
      errorMessage_postalCode: 'Postleitzahl falsch',
      errorMessage_email: 'E-Mail falsch',
      errorMessage_singleFileTooBig: 'Ein Bild ist zu gross',
      errorMessage_sumOfFilesTooBig: 'Die Gesamtgrösse aller Bilder ist zu gross',
      errorMessage_size_NaN: 'Ungültiger Wert',
      errorMessage_floor_NaN: 'Ungültiger Wert',
      errorMessage_price_NaN: 'Ungültiger Wert',
      errorMessage_phone_NaN: 'Ungültige Telefonnummer',
      errorMessage_size_missing: 'Wohnfläche fehlt',
      errorMessage_floor_missing: 'Etagen fehlen',
      errorMessage_price_missing: 'Miete fehlt',
      errorMessage_phone_missing: 'Bitte geben Sie eine Telefonnummer an',
      errorMessage_priceUnit_nothingSelected: 'Bitte wählen Sie eine Preiseinheit aus',
      errorMessage_availability_nothingSelected: 'Bitte wählen Sie die Verfügbarkeit aus',
      preview: 'Vorschau',
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
          price: 'Miete',
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
