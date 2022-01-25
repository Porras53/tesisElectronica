import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  InputLabel,
  MenuItem,
  ListSubheader,
  FormControl,
  Select,
  Typography,
} from "@material-ui/core";
import SingleYearGraphParam from "../graphsParam/yearGraphParam";
import DailyGraphParam from "../graphsParam/dailyGraphParam";
import strings from "../../strings/es.json";
import colors from "../../assets/colors/colors.json";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  graphMenu: {
    padding: "5px",
    paddingTop: "15px",
  },
  errorContainer: {
    padding: "25px",
  },
  alertText: {
    fontWeight: "bold",
    fontSize: "16px",
    color: colors.predictionSection,
  },
}));

const Graphs = (props) => {
  const classes = useStyles();
  switch (props.graphID) {
    case 11:
      return (<SingleYearGraphParam coord={props.coord} variable="Irradiacion" param={props.param} />);
    case 12:
      return (<DailyGraphParam coord={props.coord} variable="Irradiacion" param={props.param} />);

    case 16:
      return (<SingleYearGraphParam coord={props.coord} variable="Temperatura" param={props.param} />);
    case 17:
      return (<DailyGraphParam coord={props.coord} variable="Temperatura" param={props.param} />);

    case 21:
      return (<SingleYearGraphParam coord={props.coord} variable="Velocidad de viento" param={props.param} />);
    case 22:
      return (<DailyGraphParam coord={props.coord} variable="Velocidad de viento" param={props.param} />);


    
    default:
      return (
        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.errorContainer}
        >
          <Typography className={classes.alertText} align="center">
            {strings.selectAPointAndGraph}
          </Typography>
        </Grid>
      );
  }
};

const SideGraphs = (props) => {
  const classes = useStyles();
  const coord = props.coord;
  const param = props.param;

  const [graphID, setGraphID] = useState("");
  const handleGraphChange = (event) => {
    setGraphID(event.target.value);
  };

  return (
    <div>
      <Grid container className={classes.graphMenu}>
        <Grid item>
          <FormControl className={classes.formControl} fullWidth={true}>
            <InputLabel htmlFor="grouped-select">{strings.graph}</InputLabel>
            <Select
              id="grouped-select"
              value={graphID}
              onChange={handleGraphChange}
              disabled={coord[0] === 0 && coord[1] === 0}
            >
              <ListSubheader>{strings.radiation}</ListSubheader>
              <MenuItem value={11}>{strings.radiation} - {strings.monthlyCycle} {param}</MenuItem>
              <MenuItem value={12}>{strings.radiation} - {strings.dailyCycle} {param}</MenuItem>

              <ListSubheader>{strings.temperature}</ListSubheader>
              <MenuItem value={16}>{strings.averageTemperature} - {strings.monthlyCycle} {param}</MenuItem>
              <MenuItem value={17}>{strings.averageTemperature} - {strings.dailyCycle} {param}</MenuItem>

              <ListSubheader>{strings.wind}</ListSubheader>
              <MenuItem value={21}>{strings.windSpeed} - {strings.monthlyCycle} {param}</MenuItem>
              <MenuItem value={22}>{strings.windSpeed} - {strings.dailyCycle} {param}</MenuItem>

            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container>
        <Graphs graphID={graphID} coord={coord} param={param} />
      </Grid>
    </div>
  );
};

export default SideGraphs;
