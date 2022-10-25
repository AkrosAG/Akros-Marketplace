export default {
  searchForm: {
    search: 'Search',
    offers: 'Offers',
    searches: 'Requests',
    furnished: 'Furnished',
    categories: {
      all: {
        title: 'Search over all'
      },
      accomodation: {
        title: 'Accomodation',
        subType: {
          options:  {
            room: 'Room',
            apartment: 'Apartment',
            house: 'House',
            parking: 'Parking space'
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
        region: 'Region, City or Canton',
        fromDate: 'From',
        toDate: 'To',
        fromRooms: 'Minimum rooms',
        toRooms: 'Maximum rooms',
        fromPrice: 'Minimum price',
        toPrice: 'Maximum price',
        fromSize: 'Minimum size',
        toSize: 'Maximum size',
        radius: 'Radius (KM)',
      },
      carShare: {
        title: 'Car sharing',
        subType: {
          options: {
            share: 'Car sharing',
          }
        },
        region: 'Region, City or Canton',
      },
    },
  },
};
