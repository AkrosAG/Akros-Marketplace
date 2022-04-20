export default {
  searchForm: {
    search: 'Suche',
    offers: 'Angebote',
    searches: 'Anfragen',
    select: 'Art der Unterkunft',
    categories: {
      accomodation: {
        title: 'Unterkünfte',
        type: {
          placeholder: 'Art der Unterkunft',
          options:  {
            room: 'Zimmer',
            apartment: 'Wohnung',
            house: 'Haus',
            parking: 'Parkplatz'
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
      },
      carShare: {
        title: 'Mitfahrgelegenheiten',
        types: {
          share: 'Mitfahrgelegenheiten',
        },
      },
    },
  },
};
