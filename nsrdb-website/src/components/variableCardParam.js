import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Card } from "@material-ui/core";
import colors from "../assets/colors/colors.json";

const useStyles = makeStyles((theme) => ({
  variableCard: {
    background: colors.cardBackgroundParam,
    padding: "5px",
    minHeight: "90%",
  },
  variableCardSelected: {
    background: colors.cardBackgroundSelectedParam,
    padding: "5px",
    minHeight: "90%",
  },
  variableCardTitle: {
    fontSize: "13px",
    textTransform: "uppercase",
  },
  variableCardValue: {
    fontSize: "14px",
    fontWeight: "bold",
  },
}));

const VariableCardParam = (props) => {
  const classes = useStyles();

  return (
    <Card
      className={
        props.selected ? classes.variableCardSelected : classes.variableCard
      }
    >
      <Grid container direction="column" justify="center">
        <Grid item>
          <Typography align="center" className={classes.variableCardTitle}>
            {props.title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography align="center" className={classes.variableCardValue}>
            {props.value}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default VariableCardParam;
