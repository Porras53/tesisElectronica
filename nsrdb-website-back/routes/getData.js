var express = require("express");
var router = express.Router();
const getData = require("../controllers/getData");

router.get("/y/:year/:latlong", function (req, res, next) {
  latitude = parseFloat(req.params.latlong.split("+")[0]);
  longitude = parseFloat(req.params.latlong.split("+")[1]);
  getData.getYearlyData(
    parseInt(req.params.year),
    latitude,
    longitude,
    (result, error) => {
      if (error) {
        res.status(500).send(error);
      } else {
        if (!result || !result.length) res.status(404).send("Data not found");
        else return res.send(result);
      }
    }
  );
});
//Promedio 
router.get("/prom/:scene/:latlong", function (req, res, next) {
  latitude = parseFloat(req.params.latlong.split("+")[0]);
  longitude = parseFloat(req.params.latlong.split("+")[1]);
  getData.getYearlyData(
    parseInt(req.params.year),
    latitude,
    longitude,
    (result, error) => {
      if (error) {
        res.status(500).send(error);
      } else {
        if (!result || !result.length) res.status(404).send("Data not found");
        else return res.send(result);
      }
    }
  );
});

router.get("/m/:year/:latlong", function (req, res, next) {
  latitude = parseFloat(req.params.latlong.split("+")[0]);
  longitude = parseFloat(req.params.latlong.split("+")[1]);
  getData.getMonthlyData(
    parseInt(req.params.year),
    latitude,
    longitude,
    (result, error) => {
      if (error) {
        res.status(500).send(error);
      } else {
        if (!result || !result.length) res.status(404).send("Data not found");
        else return res.send(result);
      }
    }
  );
});

router.get("/d/:year/:latlong", function (req, res, next) {
  latitude = parseFloat(req.params.latlong.split("+")[0]);
  longitude = parseFloat(req.params.latlong.split("+")[1]);
  getData.getDailyData(
    parseInt(req.params.year),
    latitude,
    longitude,
    (result, error) => {
      if (error) {
        res.status(500).send(error);
      } else {
        if (!result || !result.length) res.status(404).send("Data not found");
        else return res.send(result);
      }
    }
  );
});

router.get("/h/:year/:latlong", function (req, res, next) {
  latitude = parseFloat(req.params.latlong.split("+")[0]);
  longitude = parseFloat(req.params.latlong.split("+")[1]);
  getData.getHourlyData(
    parseInt(req.params.year),
    latitude,
    longitude,
    (result, error) => {
      if (error) {
        res.status(500).send(error);
      } else {
        if (!result || !result.length) res.status(404).send("Data not found");
        else return res.send(result);
      }
    }
  );
});

router.get("/c/:latlong", function (req, res, next) {
  latitude = parseFloat(req.params.latlong.split("+")[0]);
  longitude = parseFloat(req.params.latlong.split("+")[1]);
  getData.getCoordinates(latitude, longitude, (result, error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      if (!result || !result.length) res.status(404).send("Data not found");
      else return res.send(result);
    }
  });
});

router.get("/c/near/:latlong", function (req, res, next) {
  latitude = parseFloat(req.params.latlong.split("+")[0]);
  longitude = parseFloat(req.params.latlong.split("+")[1]);
  getData.getNearCoordinates(latitude, longitude, (result, error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      if (!result || !result.length) res.status(404).send("Data not found");
      else return res.send(result);
    }
  });
});

router.get("/map/:year", function (req, res, next) {
  getData.getMapData(parseInt(req.params.year), (result, error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      if (!result || !result.length) res.status(404).send("Data not found");
      else return res.send(result);
    }
  });
});


//------------------------------------

router.get("/rsds/:param/:latlong", function (req, res) {
  latitude = parseFloat(req.params.latlong.split("+")[0]);
  longitude = parseFloat(req.params.latlong.split("+")[1]);
  variable = parseInt(req.params.param.replace('.', ''));
  getData.getRadData(
    variable,
    latitude,
    longitude,
    (result, error) => {
      if (error) {
        res.status(500).send(error);
      } else {
        if (!result || !result.length) res.status(404).send("Data not found");
        else return res.send(result);
      }
    }
  );
});

router.get("/temp/:param/:latlong", function (req, res) {
  latitude = parseFloat(req.params.latlong.split("+")[0]);
  longitude = parseFloat(req.params.latlong.split("+")[1]);
  variable = parseInt(req.params.param.replace('.', ''));
  getData.getTempData(
    variable,
    latitude,
    longitude,
    (result, error) => {
      if (error) {
        res.status(500).send(error);
      } else {
        if (!result || !result.length) res.status(404).send("Data not found");
        else return res.send(result);
      }
    }
  );
});

router.get("/wind/:param/:latlong", function (req, res) {
  latitude = parseFloat(req.params.latlong.split("+")[0]);
  longitude = parseFloat(req.params.latlong.split("+")[1]);
  variable = parseInt(req.params.param.replace('.', ''));
  getData.getWindData(
    variable,
    latitude,
    longitude,
    (result, error) => {
      if (error) {
        res.status(500).send(error);
      } else {
        if (!result || !result.length) res.status(404).send("Data not found");
        else return res.send(result);
      }
    }
  );
});

router.get("/rsdsProm/:param/:latlong", function (req, res) {
  latitude = parseFloat(req.params.latlong.split("+")[0]);
  longitude = parseFloat(req.params.latlong.split("+")[1]);
  variable = parseInt(req.params.param.replace('.', ''));
  getData.getRadProm(
    variable,
    latitude,
    longitude,
    (result, error) => {
      if (error) {
        res.status(500).send(error);
      } else {
        if (!result || !result.length) res.status(404).send("Data not found");
        else return res.send(result);
      }
    }
  );
});

router.get("/tempProm/:param/:latlong", function (req, res) {
  latitude = parseFloat(req.params.latlong.split("+")[0]);
  longitude = parseFloat(req.params.latlong.split("+")[1]);
  variable = parseInt(req.params.param.replace('.', ''));
  getData.getTempProm(
    variable,
    latitude,
    longitude,
    (result, error) => {
      if (error) {
        res.status(500).send(error);
      } else {
        if (!result || !result.length) res.status(404).send("Data not found");
        else return res.send(result);
      }
    }
  );
});


router.get("/windProm/:param/:latlong", function (req, res) {
  latitude = parseFloat(req.params.latlong.split("+")[0]);
  longitude = parseFloat(req.params.latlong.split("+")[1]);
  variable = parseInt(req.params.param.replace('.', ''));
  getData.getWindProm(
    variable,
    latitude,
    longitude,
    (result, error) => {
      if (error) {
        res.status(500).send(error);
      } else {
        if (!result || !result.length) res.status(404).send("Data not found");
        else return res.send(result);
      }
    }
  );
});

router.get("/rsdsM/:param/:latlong", function (req, res) {
  latitude = parseFloat(req.params.latlong.split("+")[0]);
  longitude = parseFloat(req.params.latlong.split("+")[1]);
  variable = parseInt(req.params.param.replace('.', ''));
  getData.getRadMonth(
    variable,
    latitude,
    longitude,
    (result, error) => {
      if (error) {
        res.status(500).send(error);
      } else {
        if (!result || !result.length) res.status(404).send("Data not found");
        else return res.send(result);
      }
    }
  );
});

router.get("/tempM/:param/:latlong", function (req, res) {
  latitude = parseFloat(req.params.latlong.split("+")[0]);
  longitude = parseFloat(req.params.latlong.split("+")[1]);
  variable = parseInt(req.params.param.replace('.', ''));
  getData.getTempMonth(
    variable,
    latitude,
    longitude,
    (result, error) => {
      if (error) {
        res.status(500).send(error);
      } else {
        if (!result || !result.length) res.status(404).send("Data not found");
        else return res.send(result);
      }
    }
  );
});

router.get("/windM/:param/:latlong", function (req, res) {
  latitude = parseFloat(req.params.latlong.split("+")[0]);
  longitude = parseFloat(req.params.latlong.split("+")[1]);
  variable = parseInt(req.params.param.replace('.', ''));
  getData.getWindMonth(
    variable,
    latitude,
    longitude,
    (result, error) => {
      if (error) {
        res.status(500).send(error);
      } else {
        if (!result || !result.length) res.status(404).send("Data not found");
        else return res.send(result);
      }
    }
  );
});

router.get("/cp/:latlong", function (req, res) {
  latitude = parseFloat(req.params.latlong.split("+")[0]);
  longitude = parseFloat(req.params.latlong.split("+")[1]);
  getData.getCoordinatesParam(latitude, longitude, (result, error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      if (!result || !result.length) res.status(404).send("Data not found");
      else return res.send(result);
    }
  });
});

router.get("/cp/near/:latlong", function (req, res, next) {
  latitude = parseFloat(req.params.latlong.split("+")[0]);
  longitude = parseFloat(req.params.latlong.split("+")[1]);
  getData.getNearCoordinatesParam(latitude, longitude, (result, error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      if (!result || !result.length) res.status(404).send("Data not found");
      else return res.send(result);
    }
  });
});

router.get("/mapP/:param", function (req, res) {
  getData.getMapParam(req.params.param, (result, error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      if (!result || !result.length) res.status(404).send("Data not found");
      else return res.send(result);
    }
  });
});



module.exports = router;
