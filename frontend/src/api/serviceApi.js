
export const getServices = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, title: 'Ride Sharing', description: 'Affordable rides.', icon: '🚗' },
          { id: 2, title: 'Public Transit', description: 'Real-time schedules.', icon: '🚌' },
          { id: 3, title: 'Bike Sharing', description: 'Nearby bike stations.', icon: '🚴' },
        ]);
      }, 500);
    });
  };
  