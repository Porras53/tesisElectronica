const MongoUtils = require("../lib/MongoUtils");

const getYearlyData = (year, latitude, longitude, callback) => {
  MongoUtils.then((client) => {
    client
      .db("solarAtlas")
      .collection(year + "-y")
      .find({ latitude: latitude, longitude: longitude })
      .toArray((err, data) => {
        callback(data, err);
      });
  });
};


const getMonthlyData = (year, latitude, longitude, callback) => {
  MongoUtils.then((client) => {
    client
      .db("solarAtlas")
      .collection(year + "-m")
      .find({ latitude: latitude, longitude: longitude })
      .toArray((err, data) => {
        callback(data, err);
      });
  });
};

const getDailyData = (year, latitude, longitude, callback) => {
  MongoUtils.then((client) => {
    client
      .db("solarAtlas")
      .collection(year + "-d")
      .find({ latitude, longitude })
      .toArray((err, data) => {
        callback(data, err);
      });
  });
};

const getHourlyData = (year, latitude, longitude, callback) => {
  MongoUtils.then((client) => {
    client
      .db("solarAtlas")
      .collection(year + "-h")
      .find({ latitude: latitude, longitude: longitude })
      .toArray((err, data) => {
        callback(data, err);
      });
  });
};

const getNearCoordinates = (latitude, longitude, callback) => {
  MongoUtils.then((client) => {
    client
      .db("solarAtlas")
      .collection("coordinates_data")
      .find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
            $maxDistance: 5000,
          },
        },
      })
      .toArray((err, data) => {
        callback(data, err);
      });
  });
};

const getCoordinates = (latitude, longitude, callback) => {
  MongoUtils.then((client) => {
    client
      .db("solarAtlas")
      .collection("coordinates_data")
      .find({
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      })
      .toArray((err, data) => {
        callback(data, err);
      });
  });
};
//
const getMapData = (year, callback) => {
  MongoUtils.then((client) => {
    client
      .db("solarAtlas")
      .collection("map_data")
      .find({ year })
      .toArray((err, data) => {
        callback(data, err);
      });
  });
};

//------------------------------

const getRadData = (param, latitud, longitud, callback) => {
  MongoUtils.then((client) => {
    client
      .db("solarAtlas")
      .collection("rad" + param)
      .find({ latitud: latitud, longitud: longitud })
      .toArray((err, data) => {
        callback(data, err);
      });
  });
};

const getTempData = (param, latitud, longitud, callback) => {
  MongoUtils.then((client) => {
    client
      .db("solarAtlas")
      .collection("temp" + param)
      .find({ latitud: latitud, longitud: longitud })
      .toArray((err, data) => {
        callback(data, err);
      });
  });
};

const getWindData = (param, latitud, longitud, callback) => {
  MongoUtils.then((client) => {
    client
      .db("solarAtlas")
      .collection("wind" + param)
      .find({ latitud: latitud, longitud: longitud })
      .toArray((err, data) => {
        callback(data, err);
      });
  });
};

const getRadProm = (param, latitud, longitud, callback) => {
  MongoUtils.then((client) => {
    client
      .db("solarAtlas")
      .collection("promedioRad" + param)
      .find({ latitud: latitud, longitud: longitud })
      .toArray((err, data) => {
        callback(data, err);
      });
  });
};

const getTempProm = (param, latitud, longitud, callback) => {
  MongoUtils.then((client) => {
    client
      .db("solarAtlas")
      .collection("promedioTemp" + param)
      .find({ latitud: latitud, longitud: longitud })
      .toArray((err, data) => {
        callback(data, err);
      });
  });
};

const getWindProm = (param, latitud, longitud, callback) => {
  MongoUtils.then((client) => {
    client
      .db("solarAtlas")
      .collection("promedioWind" + param)
      .find({ latitud: latitud, longitud: longitud })
      .toArray((err, data) => {
        callback(data, err);
      });
  });
};
const getRadMonth = (param, latitud, longitud, callback) => {
  MongoUtils.then((client) => {
    client
      .db("solarAtlas")
      .collection("promMenRad" + param)
      .find({ latitud: latitud, longitud: longitud })
      .toArray((err, data) => {
        callback(data, err);
      });
  });
};
const getTempMonth = (param, latitud, longitud, callback) => {
  MongoUtils.then((client) => {
    client
      .db("solarAtlas")
      .collection("promMenTemp" + param)
      .find({ latitud: latitud, longitud: longitud })
      .toArray((err, data) => {
        callback(data, err);
      });
  });
};
const getWindMonth = (param, latitud, longitud, callback) => {
  MongoUtils.then((client) => {
    client
      .db("solarAtlas")
      .collection("promMenWind" + param)
      .find({ latitud: latitud, longitud: longitud })
      .toArray((err, data) => {
        callback(data, err);
      });
  });
};


const getNearCoordinatesParam = (latitude, longitude, callback) => {
  MongoUtils.then((client) => {
    client.db('solarAtlas')
    client
      .db("solarAtlas")
      .collection("coordinates_param")
      .find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
            $maxDistance: 25000,
          },
        },
      })
      .toArray((err, data) => {
        callback(data, err);
      });
  });
};



const getCoordinatesParam = (latitude, longitude, callback) => {
  MongoUtils.then((client) => {
    client
      .db("solarAtlas")
      .collection("coordinates_param")
      .find({
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      })
      .toArray((err, data) => {
        callback(data, err);
      });
  });
};

const getMapParam = (param, callback) => {
  MongoUtils.then((client) => {
    client
      .db("solarAtlas")
      .collection("map_param")
      .find({ param })
      .toArray((err, data) => {
        callback(data, err);
      });
  });
};


//------------------------------



const getData = {
  getYearlyData,
  getMonthlyData,
  getDailyData,
  getHourlyData,
  getNearCoordinates,
  getCoordinates,
  getMapData,
  getTempData,
  getWindData,
  getRadData,
  getNearCoordinatesParam,
  getCoordinatesParam,
  getMapParam, 
  getWindProm,
  getRadProm,
  getTempProm,
  getRadMonth,
  getTempMonth,
  getWindMonth
};

module.exports = getData;
