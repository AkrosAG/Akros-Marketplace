export default {
  searchForm: {
    search: 'Suche',
    offers: 'Angebote',
    searches: 'Anfragen',
    select: 'Art der Unterkunft',
    furnished: 'Möbiliert',
    categories: {
      all: {
        title: 'Alle Anzeigen'
      },
      accomodation: {
        title: 'Unterkünfte',
        subType: {
          placeholder: 'Art der Unterkunft',
          options:  {
            room: 'Zimmer',
            apartment: 'Wohnung',
            house: 'Haus',
            parking: 'Parkplatz'
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
        region: 'Region, Stadt oder Kanton',
        fromDate: 'Ab',
        toDate: 'Bis',
        fromRooms: 'Von Zimmer',
        toRooms: 'Bis Zimmer',
        fromPrice: 'Von Preis',
        toPrice: 'Bis Preis',
        fromSize: 'Von Grösse',
        toSize: 'Bis Grösse',
        radius: 'Radius (KM)',
      },
      carShare: {
        title: 'Mitfahrgelegenheiten',
        subType: {
          options: {
            share: 'Mitfahrgelegenheiten',
          }
        },
        region: 'Region, Stadt oder Kanton',
      },
    },
  },
};
