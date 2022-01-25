import { Divider, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MA1 from "./assets/images/equation_MA1.png";
import MA2 from "./assets/images/equation_MA2.png";
import MA3 from "./assets/images/equation_MA3.png";
import MA4 from "./assets/images/equation_MA4.png";
import MA5 from "./assets/images/equation_MA5.png";
import MA6 from "./assets/images/equation_MA6.png";
import MB from "./assets/images/equation_MB.png";
import PNS from "./assets/images/equation_PNS.png";
import PS1 from "./assets/images/equation_PS1.png";
import PS2 from "./assets/images/equation_PS2.png";
import RI1 from "./assets/images/equation_RI1.png";
import RI2 from "./assets/images/equation_RI2.png";
import RI3 from "./assets/images/equation_RI3.png";
import TC1 from "./assets/images/equation_TC1.png";
import TC2 from "./assets/images/equation_TC2.png";
import strings from "./strings/es.json";
import colors from "./assets/colors/colors.json";


const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "10vh",
    marginBottom: "10vh",
  },
  image: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    height: "70px",
  },
  image2: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    height: "30px",
  },
  heading: {
    color: colors.textDark,
    fontSize: 30,
  }, 

  subheading: {
    color: 'rgb(0, 0, 0)',
    fontSize: 25,
  }, 
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
  },
}));

const AccordionSummary = withStyles({
  root: {
    backgroundColor: colors.acordion,
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);


const AccordionSummary2 = withStyles({
  root: {
    backgroundColor: colors.subacordion,
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);


function Docs() {
  const classes = useStyles();
  return (
    <div>
      <Grid container justify="center" className={classes.container}>
        <Grid item xs={8}>
          <br />
          <Typography variant="h3" component="h1" align="center" gutterBottom>
            {strings.solarTitle} - {strings.colombia}
          </Typography>
          <Divider />
          <br />

          <Typography variant="h4" component="h2" gutterBottom>
            {strings.about}
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.aboutPp0}
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.aboutPp1}
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.aboutPp2}
          </Typography>

          <Accordion className={classes.root}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              >
              <Typography className={classes.heading}>{strings.solarExplorer}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              <Typography variant="h4" component="h2" gutterBottom>
              {strings.generationModels}
              </Typography>
              <Typography variant="body1" align="justify" gutterBottom>
               {strings.generationModelsP1}
             </Typography>


             <Accordion className={classes.root}>
              <AccordionSummary2
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              >
              <Typography className={classes.subheading}>{strings.inclinedRadiationCalculation}</Typography>
              </AccordionSummary2>
              <AccordionDetails>
              <Typography>
              <Typography variant="body1" align="justify" gutterBottom>
              {strings.inclinedRadiationCalculationP1}
               </Typography>
              <img
                src={RI1}
              alt="Radiacion inclinada eq1"
                className={classes.image}
               ></img>
                      <Typography variant="body1" align="justify" gutterBottom>
            {strings.inclinedRadiationCalculationP2}
          </Typography>
          <img
            src={RI2}
            alt="Radiacion inclinada eq2"
            className={classes.image2}
          ></img>
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.inclinedRadiationCalculationP3}
          </Typography>
          <img
            src={RI3}
            alt="Radiacion inclinada eq3"
            className={classes.image}
          ></img>
          <br />
              </Typography>
             </AccordionDetails>
            </Accordion>

            <Accordion className={classes.root}>
              <AccordionSummary2
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              >
              <Typography className={classes.subheading}>{strings.cellTemperatureCalculation}</Typography>
              </AccordionSummary2>
              <AccordionDetails>
              <Typography>
              <img
            src={TC1}
            alt="Temperatura en la celda eq1"
            className={classes.image}
          ></img>
          <br />
          <img
            src={TC2}
            alt="Temperatura en la celda eq2"
            className={classes.image2}
          ></img>
          <br />
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.cellTemperatureCalculationP1}
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.cellTemperatureCalculationP2}
          </Typography>
              </Typography>
             </AccordionDetails>
            </Accordion>


            <Accordion className={classes.root}>
              <AccordionSummary2
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              >
              <Typography className={classes.subheading}>{strings.nominalPowerCalculation}</Typography>
              </AccordionSummary2>
              <AccordionDetails>
              <Typography>
              <Typography variant="body1" align="justify" gutterBottom>
            {strings.nominalPowerCalculationP1}
          </Typography>
          <img
            src={PNS}
            alt="Potencia nominal eq1"
            className={classes.image}
          ></img>
          <br />
              </Typography>
             </AccordionDetails>
            </Accordion>



            <Accordion className={classes.root}>
              <AccordionSummary2
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              >
              <Typography className={classes.subheading}>{strings.outputPowerCalculation}</Typography>
              </AccordionSummary2>
              <AccordionDetails>
              <Typography>
              <Typography variant="h6" component="h4" gutterBottom>
            {strings.basicModel}
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.outputPowerCalculationP1}
          </Typography>
          <img src={MB} alt="Modelo básico eq1" className={classes.image}></img>
          <br />
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.outputPowerCalculationP2}
          </Typography>
          <Typography variant="h6" component="h4" gutterBottom>
            {strings.advancedModel}
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.outputPowerCalculationP3}
          </Typography>
          <img
            src={MA1}
            alt="Modelo avanzado eq1"
            className={classes.image}
          ></img>
          <br />
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.outputPowerCalculationP4}
          </Typography>
          <img
            src={MA2}
            alt="Modelo avanzado eq2"
            className={classes.image}
          ></img>
          <br />
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.outputPowerCalculationP5}
          </Typography>
          <img
            src={MA3}
            alt="Modelo avanzado eq3"
            className={classes.image2}
          ></img>
          <br />
          <img
            src={MA4}
            alt="Modelo avanzado eq4"
            className={classes.image2}
          ></img>
          <br />
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.outputPowerCalculationP6}
          </Typography>
          <img
            src={MA5}
            alt="Modelo avanzado eq5"
            className={classes.image}
          ></img>
          <br />
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.outputPowerCalculationP7}
          </Typography>
          <img
            src={MA6}
            alt="Modelo avanzado eq6"
            className={classes.image2}
          ></img>
          <br />
              </Typography>
             </AccordionDetails>
            </Accordion>





            <Accordion className={classes.root}>
              <AccordionSummary2
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              >
              <Typography className={classes.subheading}>{strings.dcacInverterAndSystemLoss}</Typography>
              </AccordionSummary2>
              <AccordionDetails>
              <Typography>
              <Typography variant="body1" align="justify" gutterBottom>
            {strings.dcacInverterAndSystemLossP1}
          </Typography>
          <img
            src={PS1}
            alt="Pérdidas del sistema eq1"
            className={classes.image2}
          ></img>
          <br />
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.dcacInverterAndSystemLossP2}
          </Typography>
          <img
            src={PS2}
            alt="Pérdidas del sistema eq2"
            className={classes.image}
          ></img>
              </Typography>
             </AccordionDetails>
            </Accordion>
          
              </Typography>
            </AccordionDetails>
         </Accordion>



         <Accordion className={classes.root}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              >
              <Typography className={classes.heading}>{strings.predict}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                El Atlas Solar Estimado...
              </Typography>
            </AccordionDetails>
         </Accordion>
          
          
        </Grid>
      </Grid>
    </div>
  );
}

export default Docs;
