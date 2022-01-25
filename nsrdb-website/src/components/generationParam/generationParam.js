import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import { Card, Grid, Typography } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import BasicGeneration from "./basicGeneration";
import AdvancedForm from "./advancedGeneration";
import GenerationResult from "./resultParam";
import GenerationPopup from "./generationPopParam";
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
  contentContainer: {
    background: colors.mainBackground,
    height: "85vh",
    width: "40vw",
    position: "absolute",
    marginTop: "11vh",
    left: "20px",
    zIndex: "1",
    overflowY: "auto",
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
}));

const GenerationForm = (props) => {
  const param = props.param;
  const coord = props.coord;
  const variable = props.variable.slice(3,6);

  const classes = useStyles();

  const [model, setModel] = useState("basic");
  const [setup, setSetup] = useState("isolated");

  const [dailyData, setdailyData] = useState(null);
  const [dailyTemperature, setdailyTemperature] = useState(null);
  const [dailyWind, setdailyWind] = useState(null);
  const [dailyGraphData, setdailyGraphData] = useState(null);
  const [openDailyGraph, setOpenDailyGraph] = useState(false);
  const [capacityFactor, setCapacityFactor] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const [formData, setFormData] = useState({
    N: constants.basicModelVariables[0].defaultValue,
    Pmp: constants.basicModelVariables[1].defaultValue,
    gamma: constants.basicModelVariables[2].defaultValue,
    beta: constants.basicModelVariables[3].defaultValue,
    n: constants.basicModelVariables[4].defaultValue,
    PT: constants.basicModelVariables[5].defaultValue,
  });
  
  const [advancedFormData, setAdvancedFormData] = useState({
    N: constants.advancedModelVariables[0].defaultValue,
    s: constants.advancedModelVariables[1].defaultValue,
    beta: constants.advancedModelVariables[2].defaultValue,
    iscref: constants.advancedModelVariables[3].defaultValue,
    vocref: constants.advancedModelVariables[4].defaultValue,
    impref: constants.advancedModelVariables[5].defaultValue,
    vmpref: constants.advancedModelVariables[6].defaultValue,
    alphaisc: constants.advancedModelVariables[7].defaultValue,
    betavoc: constants.advancedModelVariables[8].defaultValue,
    n: constants.advancedModelVariables[9].defaultValue,
    PT: constants.advancedModelVariables[10].defaultValue,
  });
  

  const handleClickOpenDailyGraph = () => {
    setOpenDailyGraph(true);
  };

  const handleCloseDailyGraph = () => {
    setOpenDailyGraph(false);
  };

  const handleFormDataChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: parseFloat(event.target.value) });
  };
  const handleAdvancedFormDataChange = (prop) => (event) => {
    setAdvancedFormData({
      ...advancedFormData,
      [prop]: parseFloat(event.target.value),
    });
  };
  const handleModelChange = (event) => {
    setModel(event.target.value);
    setdailyGraphData(null);
  };
  const handleSetupChange = (event) => {
    setSetup(event.target.value);
  };
  const handleButtonClick = () => {
    setdailyGraphData(null);
    setOpenDailyGraph(false);
    if (model === "basic") {
      const data_bas = functions.getBasicPowerGenerationParam(
        functions.round2(coord[1]),
        dailyData,
        dailyTemperature,
        dailyWind,
        setup,
        formData.N,
        formData.gamma,
        formData.beta,
        formData.Pmp,
        formData.n,
        formData.PT
      );
      setCapacityFactor(data_bas.CF);
      setMin(data_bas.min);
      setMax(data_bas.max);
      setdailyGraphData(data_bas.PAC_array);

    } else {
      const data_adv = functions.getAdvancedPowerGenerationParam(
        functions.round2(coord[1]),
        dailyData,
        dailyTemperature,
        dailyWind,
        setup,
        advancedFormData.s,
        advancedFormData.N,
        advancedFormData.beta,
        advancedFormData.iscref,
        advancedFormData.vocref,
        advancedFormData.impref,
        advancedFormData.vmpref,
        advancedFormData.alphaisc,
        advancedFormData.betavoc,
        advancedFormData.n,
        advancedFormData.PT
      );
      setCapacityFactor(data_adv.CF);
      setMin(data_adv.min);
      setMax(data_adv.max);
      setdailyGraphData(data_adv.PAC_array);
    }
  };

  useEffect(() => {
    if (coord[0] !== 0 && coord[1] !== 0) {
        const getLon = coord[0];
        const getLat = coord[1];
  
        var requests = [
          axios.get(
            constants.backendURL + "/api/rsds/" + variable + "/" + getLat + "+" + getLon
          ), 
          axios.get(
            constants.backendURL + "/api/temp/" + variable + "/" + getLat + "+" + getLon
          ),
          axios.get(
            constants.backendURL + "/api/wind/" + variable + "/" + getLat + "+" + getLon
          )
        ];
  
        axios.all(requests).then(
          axios.spread((...responses) => {
            var error = false;
            responses.forEach((response) => {
              if (response.status !== 200) {
                error = true;
              }
            });
            if (!error) {
              setdailyData(responses[0].data[0]);
              setdailyTemperature(responses[1].data[0]);
              setdailyWind(responses[2].data[0]);
              setdailyGraphData(null);
            }
          })
        );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variable, coord]);

  if (dailyData === null ) {
    return (
      <Card className={classes.contentContainer}>
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
              {strings.clickUseTool}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    );
  } else {
    return (
      <Card className={classes.contentContainer}>
        <Grid container direction="column">
          <Grid item>
            <Grid container className={classes.titleContainer}>
              <Typography className={classes.titleText}>
                {strings.selectGenerationModel}
              </Typography>
            </Grid>
            <Grid container justify="center">
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="model"
                  name="model-radio"
                  value={model}
                  onChange={handleModelChange}
                >
                  <FormControlLabel
                    value="basic"
                    control={<Radio />}
                    label={strings.basic}
                  />
                  <FormControlLabel
                    value="advanced"
                    control={<Radio />}
                    label={strings.advanced}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          {model === "basic" ? (
            <BasicGeneration
              setup={setup}
              handleSetupChange={handleSetupChange}
              handleFormDataChange={handleFormDataChange}
              handleButtonClick={handleButtonClick}
            />
            ):(
              <AdvancedForm
              setup={setup}
              handleSetupChange={handleSetupChange}
              handleAdvancedFormDataChange={handleAdvancedFormDataChange}
              handleButtonClick={handleButtonClick}
            />
            )
          }
          <Grid item>
            <GenerationResult
              title={strings.powerGeneratedByMonth + " - RCP" + variable}
              data={dailyGraphData}
              param={param}
              CF={capacityFactor}
              min={min}
              max={max}
              colors={"dark2"}
              isPredict={false}
            />
            <GenerationPopup
              title={strings.powerGeneratedByDay + " - " + param}
              data={dailyGraphData}
              handleClickOpenDailyGraph={handleClickOpenDailyGraph}
              openDailyGraph={openDailyGraph}
              handleCloseDailyGraph={handleCloseDailyGraph}
            />
          </Grid>
          
        </Grid>
      </Card>
    );
  }
};

export default GenerationForm;
