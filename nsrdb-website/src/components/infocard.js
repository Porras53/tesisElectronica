//PANEL DE LA DERECHA DEL MAPA HISTÓRICO
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Select, Tooltip, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import GenerationIcon from "../assets/icons/generation.svg";
import DataIcon from "../assets/icons/data.svg";
import axios from "axios";
import constants from "../utils/constants";
import functions from "../utils/functions";
import strings from "../strings/es.json";
import colors from "../assets/colors/colors.json";


const useStyles = makeStyles((theme) => ({
  titleContainer: {
    padding: "5px",
    background: colors.mainTheme,
    marginBottom: "5px",
  },
  titleText: {
    fontSize: "12px",
    fontWeight: "bold",
    color: colors.textBright,
  },
  coordTitle: {
    fontSize: "13px",
  },
  coordContent: {
    fontSize: "13px",
    fontWeight: "bold",
    color: colors.textDark,
  },
  container: {
    background: colors.mainBackground,
    width: "15vw",
    position: "absolute",
    marginTop: "11vh",
    right: "20px",
    zIndex: "1",
    paddingBottom: "5px",
  },
  menuitem: {
    textTransform: "capitalize",
  },
  searchContainer: {
    padding: "10px",
    paddingTop: "5px",
  },
  searchBar: {
    width: "100%",
  },
  searchButton: {
    background: colors.buttonBackground,
    color: colors.buttonText,
  },
  icon: {
    width: "30px",
    height: "30px",
    cursor: "pointer",
  },
  button:{
    background: colors.selectedButton
  },
  colorBar: {
    marginLeft: "10px",
    marginRight: "10px",
    height: "10px",
    backgroundImage:
      "linear-gradient(to right, #0000ff,#4169e1,#00ffff,#00ff00,#ffff00,#ff0000)",
  },
  colorBarLabel: {
    fontSize: "10px",
  },
}));

const verifyLat = (latitude) => {
  var error = false;
  if (latitude < -90 || latitude > 90) {
    error = true;
  }
  return error;
};

const verifyLon = (longitude) => {
  var error = false;
  if (longitude < -180 || longitude > 180) {
    error = true;
  }
  return error;
};

const disableButton = (lon, lat) => {
  var disable = false;
  if (
    verifyLat(lat) ||
    verifyLon(lon) ||
    lat === 0 ||
    lon === 0 ||
    lat === null ||
    lon === null
  ) {
    disable = true;
  }
  return disable;
};

const InfoCard = (props) => {
  const classes = useStyles();
  const selectedCoord = props.coord;
  const year = props.year;
  let variable = props.variable;
  const reloadMap = props.reloadMap;
  const lowerLimit = props.variableLimits[0];
  const upperLimit = props.variableLimits[1];
  const limitDiff = upperLimit - lowerLimit;

  const [anchorElYear, setAnchorElYear] = useState(null);
  const [anchorElVariable, setAnchorElVariable] = useState(null);
  const [searchCoords, setSearchCoords] = useState({ lat: 0, lon: 0 });
  const [openError, setOpenError] = useState(false);

  const handleCloseError = () => {
    setOpenError(false);
  };

  const handleYear = (year) => {
    props.onYearChange(year);
    setAnchorElYear(null);
  };

  const handleYearClick = (event) => {
    setAnchorElYear(event.currentTarget);
  };

  const handleVariable = (variable) => {
    if (variable === "Temperatura"){
      variable = "Temperature"
    }
    if (variable === "Velocidad de Viento"){
      variable = "Wind Speed"
    }
    if (variable === "Global Horizontal"){
      variable = "GHI"
    }
    if (variable === "Difusa Horizontal"){
      variable = "DHI"
    }
    if (variable === "Directa Normal"){
      variable = "DNI"
    }
    props.onVariableChange(variable);
    setAnchorElVariable(null);
  };

  const handleVariableClick = (event) => {
    setAnchorElVariable(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElVariable(null);
    setAnchorElYear(null);
  };

  const handleContentClick = (content) => {
    props.onContentChange(content);
  };

  const handleSearchCoordsChange = (prop) => (event) => {
    setSearchCoords({
      ...searchCoords,
      [prop]: parseFloat(event.target.value),
    });
  };

  const handleSearchButtonClick = () => {
    if (searchCoords.lat !== 0 && searchCoords.lon !== 0) {
      axios
        .get(
          constants.backendURL +
            "/api/c/near/" +
            searchCoords.lat +
            "+" +
            searchCoords.lon
        )
        .then(
          (result) => {
            props.onCoordChange(result.data[0].location.coordinates);
            props.onReloadMap(!reloadMap);
          },
          () => setOpenError(true)
        );
    }
  };

  if(variable === "Wind Speed"){variable="Velocidad de Viento"}
  if(variable === "Temperature"){variable="Temperatura"}
  if (variable === "GHI"){variable = "Global Horizontal"}
  if (variable === "DHI"){variable = "Difusa Horizontal"}
  if (variable === "DNI"){variable = "Directa Normal"}
  return (
    <Card className={classes.container}>
      <Grid container className={classes.titleContainer}>
        <Typography className={classes.titleText}>
          {strings.resources.toUpperCase()}
        </Typography>
      </Grid>
      <Grid container justify="center">
        <Grid item>
          <Tooltip title={strings.seeMeteorologicalData}>
            <IconButton
              aria-label="delete"
              onClick={() => handleContentClick(0)}
            >
              <img
                src={DataIcon}
                className={classes.icon}
                alt={strings.meteorologicalDataIcon}
              />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title={strings.estimatePhotovoltaicGeneration}>
            <IconButton
              aria-label="delete"
              onClick={() => handleContentClick(1)}
            >
              <img
                src={GenerationIcon}
                className={classes.icon}
                alt={strings.generationIcon}
              />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid container className={classes.titleContainer}>
        <Typography className={classes.titleText}>
          {strings.currentMap.toUpperCase()}
        </Typography>
      </Grid>
      <Grid container justify="center">
        <Grid item>
          <FormControl>
          <InputLabel id="demo-simple-select-label"></InputLabel>
          <Select
            id="year-menu"
            value={year}
            onClick={handleYearClick}
            onClose={handleClose}
            anchorEl={anchorElYear}
          >
            {constants.years.map((year) => (
              <MenuItem
                className={classes.menuitem}
                value={year}
                onClick={() => handleYear(year)}
              >
                {year}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
        </Grid>
        <Grid item>
        <FormControl>
        <InputLabel id="demo-simple-select-label2"></InputLabel>
          <Select
            id="variable-menu"
            value={variable}
            onClick={handleVariableClick}
            onClose={handleClose}
            anchorEl={anchorElVariable}
            
          >
            <MenuItem
              className={classes.menuitem}
              value={"Global Horizontal"}
              onClick={() => handleVariable("Global Horizontal")}
              >
              {"Global Horizontal"}
            </MenuItem>
            <MenuItem
              className={classes.menuitem}
              value={"Difusa Horizontal"}
              onClick={() => handleVariable("Difusa Horizontal")}
              >
              {"Difusa Horizontal"}
            </MenuItem>
            <MenuItem
              className={classes.menuitem}
              value={"Directa Normal"}
              onClick={() => handleVariable("Directa Normal")}
              >
              {"Directa Normal"}
            </MenuItem>
            <MenuItem
              className={classes.menuitem}
              value={"Velocidad de Viento"}
              onClick={() => handleVariable("Velocidad de Viento")}
              >
              {"Velocidad de Viento"}
            </MenuItem>
            <MenuItem
              className={classes.menuitem}
              value={"Temperatura"}
              onClick={() => handleVariable("Temperatura")}
              >
              {"Temperatura"}
            </MenuItem>
          </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} className={classes.colorBar} />
        <Grid item xs={2}>
          <Typography align="center" className={classes.colorBarLabel}>
            {functions.round2(lowerLimit)}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography align="center" className={classes.colorBarLabel}>
            {functions.round2(lowerLimit + 0.2 * limitDiff)}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography align="center" className={classes.colorBarLabel}>
            {functions.round2(lowerLimit + 0.4 * limitDiff)}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography align="center" className={classes.colorBarLabel}>
            {functions.round2(lowerLimit + 0.6 * limitDiff)}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography align="center" className={classes.colorBarLabel}>
            {functions.round2(lowerLimit + 0.8 * limitDiff)}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography align="center" className={classes.colorBarLabel}>
            {functions.round2(upperLimit)}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.titleContainer}>
        <Typography className={classes.titleText}>
          {strings.selectedCoordinates.toUpperCase()}
        </Typography>
      </Grid>
      <Grid container justify="center">
        <Grid item xs={6}>
          <Typography align="center" className={classes.coordTitle}>
            {strings.latitude.toUpperCase()}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align="center" className={classes.coordTitle}>
            {strings.longitude.toUpperCase()}
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item xs={6}>
          <Typography align="center" className={classes.coordContent}>
            {selectedCoord[0] === 0 ? "--" : functions.round2(selectedCoord[1])}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align="center" className={classes.coordContent}>
            {selectedCoord[1] === 0 ? "--" : functions.round2(selectedCoord[0])}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.titleContainer}>
        <Typography className={classes.titleText}>
          {strings.search.toUpperCase()}
        </Typography>
      </Grid>
      <Grid
        container
        alignItems="center"
        spacing={1}
        className={classes.searchContainer}
      >
        <Grid item xs={6} align="center">
          <TextField
            id="latSearch"
            type="number"
            variant="outlined"
            size="small"
            label={strings.latitude}
            error={verifyLat(searchCoords.lat)}
            className={classes.searchBar}
            onChange={handleSearchCoordsChange("lat")}
          />
        </Grid>
        <Grid item xs={6} align="center">
          <TextField
            id="lonSearch"
            type="number"
            variant="outlined"
            size="small"
            label={strings.longitude}
            error={verifyLon(searchCoords.lon)}
            className={classes.searchBar}
            onChange={handleSearchCoordsChange("lon")}
          />
        </Grid>
        <Grid container justify="center">
          <Button
            variant="contained"
            className={classes.searchButton}
            onClick={handleSearchButtonClick}
            disabled={disableButton(searchCoords.lon, searchCoords.lat)}
          >
            {strings.search}
          </Button>
          <Dialog
            open={openError}
            onClose={handleCloseError}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Error</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {strings.coordinatesNotFoundError}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseError} color="primary" autoFocus>
                {strings.close}
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Card>
  );
};

export default InfoCard;
