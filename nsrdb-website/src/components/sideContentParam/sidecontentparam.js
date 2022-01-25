import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Card } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SideSummaryParam from "./sidesummaryparam";
import SideGraphsParam from "./sidegraphsparam";
import SideDownloads from "./sidedownloadsparam";
import strings from "../../strings/es.json";
import colors from "../../assets/colors/colors.json";

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    background: colors.mainBackground,
    height: "85vh",
    width: "40vw",
    position: "absolute",
    marginTop: "11vh",
    left: "20px",
    zIndex: "1",
    overflowY: "auto",
    overflowWrap: "break-word",
    paddingBottom: "10px",
  },
  contentHeader: {
    fontSize: "30px",
    textAlign: "center",
    padding: "15px",
  },
  tab: {
    fontSize: "12px",
    minWidth: 50,
    width: 50,
    background: colors.tabParam,
  },
  tabGrid: {
    width: "100%",
  },
}));

function TabPanelParam(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
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

const SideContentParam = (props) => {
  const param = props.param;
  const coord = props.coord;
  const variable = props.variable;

  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card className={classes.contentContainer}>
      <Grid container>
        <AppBar position="sticky">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="tabs"
            centered
          >
            <Tab
              className={classes.tab}
              label={strings.summary}
              {...a11yProps(0)}
            />
            <Tab
              className={classes.tab}
              label={strings.graphs}
              {...a11yProps(1)}
            />
            <Tab
              className={classes.tab}
              label={strings.downloads}
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>
        <TabPanelParam value={value} index={0}>
        <SideSummaryParam param={param} coord={coord} variable={variable} />
        </TabPanelParam>
        <TabPanelParam value={value} index={1}>
        <SideGraphsParam coord={coord} param={variable} />
        </TabPanelParam>
        <TabPanelParam value={value} index={2}>
          <SideDownloads coord={coord} />
        </TabPanelParam>
      </Grid>
    </Card>
  );
};

export default SideContentParam;
