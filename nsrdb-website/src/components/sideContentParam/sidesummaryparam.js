import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import VariableCardParam from "../variableCardParam";
import SummaryGraphParam from "../graphsParam/summaryGraphparam";
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
}));

const InnerContentP = (props) => {
  let x = ""
  if(props.variable==="2.6"){
    x = "Optimista";
  }
  else{
    x = "Pesimista";
  }
  const classes = useStyles();
  if (props.rsdsData === null || props.tempData === null || props.windData === null || props.monthlyData === null) {
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
            {strings.clickGetInformation}
          </Typography>
        </Grid>
      </Grid>
    );
  } else {
    var graphData = [];
    for (var i = 0; i < 12; i++) {
      graphData.push({
        month: constants.months[i],
        Irradiación: functions.round3(props.monthlyData.Irradiacion[i]),
      });
    }
    return (
      <Grid container direction="column">
        <Grid item>
          <Grid
            container
            spacing={1}
            justify="center"
            className={classes.variablesContainer}
          >
            <Grid item xs={4}>
              <VariableCardParam
                selected={"latitud" === props.variable}
                title={strings.latitude}
                value={
                  functions.round3(props.rsdsData.latitud) +
                  constants.variableMeasurements.latitude
                }
              />
            </Grid>
            <Grid item xs={4}>
              <VariableCardParam
                selected={"longitud" === props.variable}
                title={strings.longitude}
                value={
                  functions.round3(props.rsdsData.longitud) +
                  constants.variableMeasurements.longitude
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container className={classes.titleContainer}>
            <Typography className={classes.titleText}>
              {strings.yearlyAverageMeteoro} - Escenario {x} (RCP{props.variable})
            </Typography>
          </Grid>
          <Grid
            container
            spacing={1}
            justify="center"
            className={classes.variablesContainer}
          >
            <Grid item xs={4}>
              <VariableCardParam
                selected={constants.parameters[0] === props.param}
                title={strings.radiationGHI}
                value={
                  functions.round3(props.rsdsData.Irradiacion) +
                  " " +
                  constants.variableMeasurements.Irradiation
                }
              />
            </Grid>
            <Grid item xs={4}>
              <VariableCardParam
                selected={constants.parameters[1] === props.param}
                title={strings.temperature}
                value={
                  functions.round3(props.tempData.Temperatura) +
                  " " +
                  constants.variableMeasurements.Temperature
                }
              />
            </Grid>
            <Grid item xs={4}>
              <VariableCardParam
                selected={constants.parameters[2] === props.param}
                title={strings.windSpeed}
                value={
                  functions.round3(props.windData["Velocidad de viento"]) +
                  " " +
                  constants.variableMeasurements["Wind Speed"]
                }
              />
            </Grid>
          </Grid>
        </Grid>
        
        <Grid item>
          
        <SummaryGraphParam graphData={graphData} />

        </Grid>
      </Grid>
    );
  }
};

const SideSummaryParam = (props) => {
  const param = props.param;
  const coord = props.coord;
  const variable = props.variable.slice(3,6);


  const [rsdsData, setrsdsData] = useState(null);
  const [tempData, settempData] = useState(null);
  const [windData, setwindData] = useState(null);
  const [monthlyData, setmonthlyData] = useState(null);


  useEffect(() => {
    if (coord[0] !== 0 && coord[1] !== 0) {

        const getLon = coord[0];
        const getLat = coord[1];

        var requests = [
        
          axios.get(
            constants.backendURL + "/api/rsdsProm/" + variable + "/" + getLat + "+" + getLon
          ),
          axios.get(
            constants.backendURL + "/api/tempProm/" + variable + "/" + getLat + "+" + getLon
          ),
          axios.get(
              constants.backendURL + "/api/windProm/" + variable + "/" + getLat + "+" + getLon
          ), 
          axios.get(
            constants.backendURL + "/api/rsdsM/" + variable + "/" + getLat + "+" + getLon
        ), 
        ];
  
        axios.all(requests).then(
          axios.spread((...responses) => {
            if (
              responses[0].status === 200 &&
              responses[1].status === 200 &&
              responses[2].status === 200 &&
              responses[3].status === 200
            ) {
              setrsdsData(responses[0].data[0]);
              settempData(responses[1].data[0]);
              setwindData(responses[2].data[0]);
              setmonthlyData(responses[3].data[0]);
            }
          })
        );
      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variable, coord]);

  return (
    <InnerContentP
      param={param}
      coord={coord}
      variable={variable}
      rsdsData={rsdsData}
      tempData={tempData}
      windData={windData}
      monthlyData = {monthlyData}
    />
  );
};

export default SideSummaryParam;
