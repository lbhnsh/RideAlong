// backend/controllers/transportController.js
exports.getAllTransportOptions = (req, res) => {
    // Dummy transport options data
    const options = [
      {
        _id: "1",
        name: "Car",
        description: "Quick and convenient personal car service",
        // icon: "https://example.com/car-icon.png",
      },
      {
        _id: "2",
        name: "Bus",
        description: "Eco-friendly public transport option",
        // icon: "https://example.com/bus-icon.png",
      },
      {
        _id: "3",
        name: "Bike",
        description: "Fast and efficient bike-sharing service",
        // icon: "https://example.com/bike-icon.png",
      },
    //   {
    //     _id: "4",
    //     name: "Train",
    //     description: "Reliable and quick urban trains",
    //     icon: "https://example.com/train-icon.png",
    //   },
    ];
  
    res.status(200).json(options);
  };
  