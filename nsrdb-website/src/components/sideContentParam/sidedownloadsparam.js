import React from "react";
import axios from "axios";
import ObjectsToCsv from "objects-to-csv";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Button } from "@material-ui/core";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import VariableCardParam from "../variableCardParam";
import constants from "../../utils/constants";
import functions from "../../utils/functions";
import strings from "../../strings/es.json";
import colors from "../../assets/colors/colors.json";


const useStyles = makeStyles((theme) => ({
  errorContainer: {
    padding: "25px",
  },
  errorIcon: {
    width: "120px",
    height: "120px",
    color: colors.predictionSection,
  },
  alertText: {
    fontWeight: "bold",
    fontSize: "20px",
    color: colors.predictionSection,
  },
  titleContainer: {
    padding: "5px",
    background: colors.predictionSection,
    marginBottom: "5px",
    width: "100%",
  },
  titleText: {
    fontSize: "15px",
    fontWeight: "bold",
    color: colors.textBright,
  },
  variablesContainer: {
    padding: "10px",
    width: "100%",
  },
  button: {
    background: colors.buttonSearchPredict,
    color: colors.buttonText,
  },
}));



const SideDownloads = (props) => {
  const classes = useStyles();
  const coord = props.coord;

  const handleRsdsDownload = () => {
    
      var requests = [];
      constants.RCPnum.forEach((param) => {
        var q = axios.get(
          constants.backendURL +
            "/api/rsds/" +
            param +
            "/" +
            coord[1] +
            "+" +
            coord[0]
        );
        requests.push(q);
      });
      console.log("map", requests)

      axios.all(requests).then(
        axios.spread((...responses) => {
          var error = false;
          responses.forEach((response) => {
            if (response.status !== 200) {
              error = true;
            }
          });
          if (!error) {
            var newData = [];
              const lengthData = responses[0].data[0]["Irradiacion"].length;
              for (var i = 0; i < lengthData; i++) {
                newData.push({
                  "RCP2.6": responses[0].data[0]["Irradiacion"][i],
                  "RCP8.5": responses[1].data[0]["Irradiacion"][i],
                  day: i + 1
                });
              }
            (async () => {
              const csv = new ObjectsToCsv(newData);
              var hiddenElement = document.createElement("a");
              hiddenElement.href =
                "data:text/csv;charset=utf-8," + encodeURI(await csv.toString());
              hiddenElement.target = "_blank";
              hiddenElement.download =
                functions.round3(coord[1]) +
                "_" +
                functions.round3(coord[0]) +
                "_rsds.csv";
              hiddenElement.click();
            })();
          }
        })
      );
  }

  const handleTempDownload = () => {

      var requests = [];
      constants.RCPnum.forEach((param) => {
        var q = axios.get(
          constants.backendURL +
            "/api/temp/" +
            param +
            "/" +
            coord[1] +
            "+" +
            coord[0]
        );
        requests.push(q);
      });
      console.log("map", requests)

      axios.all(requests).then(
        axios.spread((...responses) => {
          var error = false;
          responses.forEach((response) => {
            if (response.status !== 200) {
              error = true;
            }
          });
          if (!error) {
            var newData = [];
              const lengthData = responses[0].data[0]["Temperatura"].length;
              for (var i = 0; i < lengthData; i++) {
                newData.push({
                  "RCP2.6": responses[0].data[0]["Temperatura"][i],
                  "RCP8.5": responses[1].data[0]["Temperatura"][i],
                  day: i + 1
                });
              }
            (async () => {
              const csv = new ObjectsToCsv(newData);
              var hiddenElement = document.createElement("a");
              hiddenElement.href =
                "data:text/csv;charset=utf-8," + encodeURI(await csv.toString());
              hiddenElement.target = "_blank";
              hiddenElement.download =
                functions.round3(coord[1]) +
                "_" +
                functions.round3(coord[0]) +
                "_temp.csv";
              hiddenElement.click();
            })();
          }
        })
      );
    
  };


  const handleWindDownload = () => {
      var requests = [];
      constants.RCPnum.forEach((param) => {
        var q = axios.get(
          constants.backendURL +
            "/api/wind/" +
            param +
            "/" +
            coord[1] +
            "+" +
            coord[0]
        );
        requests.push(q);
      });
      console.log("map", requests)

      axios.all(requests).then(
        axios.spread((...responses) => {
          var error = false;
          responses.forEach((response) => {
            if (response.status !== 200) {
              error = true;
            }
          });
          if (!error) {
            var newData = [];
              const lengthData = responses[0].data[0]["Velocidad de viento"].length;
              for (var i = 0; i < lengthData; i++) {
                newData.push({
                  "RCP2.6": responses[0].data[0]["Velocidad de viento"][i],
                  "RCP8.5": responses[1].data[0]["Velocidad de viento"][i],
                  day: i + 1
                });
              }
            (async () => {
              const csv = new ObjectsToCsv(newData);
              var hiddenElement = document.createElement("a");
              hiddenElement.href =
                "data:text/csv;charset=utf-8," + encodeURI(await csv.toString());
              hiddenElement.target = "_blank";
              hiddenElement.download =
                functions.round3(coord[1]) +
                "_" +
                functions.round3(coord[0]) +
                "_wind.csv";
              hiddenElement.click();
            })();
          }
        })
      );
  };


  if (coord[0] === 0 && coord[1] === 0) {
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.errorContainer}
      >
        <Grid item>
          <NotListedLocationIcon className={classes.errorIcon} />
        </Grid>
        <Grid item>
          <Typography className={classes.alertText} align="center">
            {strings.clickDownloadData}
          </Typography>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <div>
        <Grid
          container
          spacing={1}
          justify="center"
          className={classes.variablesContainer}
        >
          <Grid item xs={6}>
            <VariableCardParam
              selected={false}
              title={strings.latitude}
              value={functions.round3(coord[1]) + "°"}
            />
          </Grid>
          <Grid item xs={6}>
            <VariableCardParam
              selected={false}
              title={strings.longitude}
              value={functions.round3(coord[0]) + "°"}
            />
          </Grid>
        </Grid>
        <Grid container className={classes.titleContainer}>
          <Typography className={classes.titleText}>
            {strings.availableData}
          </Typography>
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          spacing={1}
        >
          <Grid item>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={6}>
                <Typography align="right">{strings.rsdsValues}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={handleRsdsDownload}
                >
                  {strings.download}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={6}>
                <Typography align="right">
                  {strings.tempValues}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={handleTempDownload}
                >
                  {strings.download}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={6}>
                <Typography align="right">{strings.windValues}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={handleWindDownload}
                >
                  {strings.download}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default SideDownloads;
