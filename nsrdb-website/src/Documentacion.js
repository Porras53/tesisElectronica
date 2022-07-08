//Documentación
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import strings from "./strings/es.json";
import colors from "./assets/colors/colors.json";
import React from 'react';
import Divv from '@material-ui/core/Divider';
import InfoAlert from "./components/infoalert";
import { StyledEngineProvider } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "10vh",
    marginBottom: "10vh",
  },
  list: {

    marginLeft: "10vh"
  },
  container2: {
    marginTop: "5vh",
    marginBottom: "10vh",
    marginLeft: "5vh",
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
          <Divv />
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

        

        <Grid align="justify" className={classes.container2}>
        <Typography variant="h5" component="h2" gutterBottom>
            {strings.solarExplorer}
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.Historicp1}
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.Historicp2}
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.Historicp3}
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.Historicp4}
          </Typography>

          <Typography variant="body1" align="justify" gutterBottom  className={classes.list}>
            {strings.Historicp5}
          </Typography>

          <Typography variant="body1" align="justify" gutterBottom  className={classes.list}>
            {strings.Historicp6}
          </Typography>

        <br />
        <br />
          <Typography variant="h5" component="h2" gutterBottom>
            {strings.predict}
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.Estimp1}
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.Estimp2}
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.Estimp3}
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.Estimp4}
          </Typography>

          <Typography variant="body1" align="justify" gutterBottom  className={classes.list}>
            {strings.Estimp5}
          </Typography>

          <Typography variant="body1" align="justify" gutterBottom  className={classes.list}>
            {strings.Estimp6}
          </Typography>

          <br />
        <br />

          <Typography variant="h5" component="h2" gutterBottom>
            {strings.PotFotovol}
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            {strings.Estimp7}
          </Typography>



          <Typography variant="body1" align="justify" gutterBottom>
            Para mayor información 
                 Click
          </Typography>


        </Grid>
        
          
          
        </Grid>
        <StyledEngineProvider injectFirst>
    <InfoAlert />
    </StyledEngineProvider>
      </Grid>
    </div>
  );
}

export default Docs;
