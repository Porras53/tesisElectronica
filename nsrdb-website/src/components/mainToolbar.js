//TOOLBAR DE LA PÁGINA
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Toolbar from "@material-ui/core/Toolbar";
import uniandesLogo from "../assets/images/logouniandes_0.png";
import strings from "../strings/es.json";
import colors from "../assets/colors/colors.json";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: colors.colorToolbar,
    opacity: "1",
  },
  menuButton: {
    marginRight: "30-px",
    marginLeft: "30-px",
    background: colors.buttonToolbar,
    height: "8vh",
  },
  miniSpace:{
    width: "2vh",
  },
  link: {
    color: colors.textBright,
    width: "27vh",
    textDecoration: "none",
  },
  mainLogo: {
    height: "6vh",
    padding: "1vh",
    marginRight: "50px",
  },
  title: {
    flexGrow: 1,
  },
  space: {
    width: "33vh",
  },
  atlas: {
    flexGrow: 1,
    color: colors.black,
    textDecoration: "none",
    fontSize: 25,
    fontWeight: 700,
    
  },
  tab: {
    background : colors.buttonToolbar,
  },
  tab2: {
    
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  console.log(window.location.pathname.slice(1))
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      className={classes.tabGrid}
      {...other}
    >
      {value === index && <Grid>{children}</Grid>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function MainToolbar(props) {
  const classes = useStyles();
  var ini = 0;
  var c1 = classes.tab2;
  var c2 = classes.tab2;
  var c3 = classes.tab2;
  var c4 = classes.tab2;
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if(window.location.pathname.slice(1)===""){
    ini = 0;
    c1 = classes.tab;
  }
  if(window.location.pathname.slice(1)==="prediction"){
    ini = 2;
    c2 = classes.tab;
  }
  if(window.location.pathname.slice(1)==="docs"){
    ini = 4;
    c3 = classes.tab;
  }
  if(window.location.pathname.slice(1)==="tutorial"){
    ini = 6;
    c4 = classes.tab;
  }

  return (
    <div>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar variant="dense">
          <img
            src={uniandesLogo}
            alt="Uniandes Logo"
            className={classes.mainLogo}
          ></img>
          <Tabs
            value={ini}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="tabs"
            centered
            indicatorColor="primary"
          >
            <Tab
              className={c1}
              label={strings.solarExplorer}
              {...a11yProps(0)}
              href = "/"
            >
            </Tab>
            <Typography className={classes.miniSpace}></Typography>
            <Tab
              className={c2}
              label={strings.predict}
              {...a11yProps(2)}
              href = "/prediction"

            >
            </Tab>
            <Typography className={classes.miniSpace}></Typography>
            <Tab
              className={c3}
              label={strings.documentation}
              {...a11yProps(4)}
              href = "/docs"
            >
            </Tab>
            <Typography className={classes.miniSpace}></Typography>
            <Tab
              className={c4}
              label={strings.tutorial}
              {...a11yProps(6)}
              href = "/tutorial"
            >
            </Tab>
          </Tabs>
          <TabPanel value={value} index={0} href = "/">
            <Link className={classes.link} to="/">
            </Link>
          </TabPanel>
          <TabPanel value={value} index={2} href = "/prediction">
            <Link className={classes.link} to="/prediction">
            </Link>
          </TabPanel>
          <TabPanel value={value} index={4} href = "/docs">
            <Link className={classes.link} to="/docs">
            </Link>
          </TabPanel>
          <TabPanel value={value} index={6} href = "/tutorial">
            <Link className={classes.link} to="/tutorial">
            </Link>
          </TabPanel>

          <Typography className = {classes.space}>
          </Typography>
          <Typography className = {classes.atlas}>
            {"ATLAS SOLAR"}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );

}
