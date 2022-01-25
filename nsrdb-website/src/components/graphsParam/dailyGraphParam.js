import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, CircularProgress } from "@material-ui/core";
import { ResponsiveLine } from "@nivo/line";
import constants from "../../utils/constants";
import functions from "../../utils/functions";
import strings from "../../strings/es.json";
import colors from "../../assets/colors/colors.json";

const useStyles = makeStyles((theme) => ({
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
  graphContainer: {
    height: "390px",
    padding: "10px",
    paddingRight: "20px",
  },
  loadingContainer: {
    paddingTop: "30px",
  },
}));

const InnerContent = (props) => {
  const classes = useStyles();
  if (props.data === null) {
    return (
      <Grid container justify="center" className={classes.loadingContainer}>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  } else {
    let auxi = props.variable
    let medi = 0;
    if (props.variable ==='Irradiacion'){
      auxi = 'Irradiación';
      medi = constants.parametersMeasurements.Radiation;
    }
    if (props.variable ==='Temperatura'){
      medi = constants.parametersMeasurements.Temperature;
    }
    if (props.variable ==='Velocidad de viento'){
      medi = constants.parametersMeasurements["Wind Speed"];
    }

    const graphData = [
      {
        id: props.variable,
        data: props.data,
      },
    ];
    return (
      <Grid container direction="column">
        <Grid item>
          <Grid container className={classes.titleContainer}>
            <Typography className={classes.titleText}>
              {constants.parametersTitles2[props.variable]} - RCP{props.param} (
              {constants.variableMeasurements2[props.variable]})
            </Typography>
          </Grid>
          <div className={classes.graphContainer}>
            <ResponsiveLine
              data={graphData}
              margin={{ top: 10, right: 10, bottom: 80, left: 50 }}
              colors={{ scheme: "category10" }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: true,
                reverse: false,
              }}
              yFormat=" >-.2f"
              axisTop={null}
              axisRight={null}
              enablePointLabel={true}
              axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 90,
                legend: strings.days,
                legendOffset: 50,
                legendPosition: "middle",
              }}
              axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: auxi + " (" + medi+")",
                legendOffset: -40,
                legendPosition: "middle",
              }}
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabelYOffset={-12}
              useMesh={true}
            />
          </div>
        </Grid>
      </Grid>
    );
  }
};

const DailyGraphParam = (props) => {
    const coord = props.coord;
    const variable = props.variable;
    console.log(props.param)
    const param = props.param.slice(3,6);
  
    const [data, setData] = useState(null);
  
  
      useEffect(() => {
          if (coord[0] !== 0 && coord[1] !== 0) {
  
              const getLon = coord[0];
              const getLat = coord[1];
              setData(null);
              
              if(variable === "Irradiacion"){
                  axios
              .get(
                constants.backendURL + "/api/rsds/" + param + "/" + getLat + "+" + getLon
              )
              .then((result) => {
                if (result.status === 200) {
                  var newData = [];
                  console.log(constants.days)
                  for (let index = 0; index < result.data[0][variable].length; index+=10) {
                      if(index === 0){
                        newData.push({
                            x:constants.days[index],
                            y:functions.round2(result.data[0][variable][index])
                        })
                      }else{
                      newData.push({
                          x:constants.days[index-1],
                          y:functions.round2(result.data[0][variable][index-1])
                      })}
                      if(index===350){
                        console.log(constants.days[index+9])
                        newData.push({
                            x:constants.days[index+9],
                            y:functions.round2(result.data[0][variable][index+9])
                        })
                      }
                  }
                  
                  setData(newData);
                }
              });
              }
              if(variable === "Temperatura"){
                  axios
              .get(
                constants.backendURL + "/api/temp/" + param + "/" + getLat + "+" + getLon
              )
              .then((result) => {
                if (result.status === 200) {
                    var newData = [];
                    console.log(constants.days)
                    for (let index = 0; index < result.data[0][variable].length; index+=10) {
                        if(index === 0){
                          newData.push({
                              x:constants.days[index],
                              y:functions.round2(result.data[0][variable][index])
                          })
                        }else{
                        newData.push({
                            x:constants.days[index-1],
                            y:functions.round2(result.data[0][variable][index-1])
                        })}
                        if(index===350){
                          console.log(constants.days[index+9])
                          newData.push({
                              x:constants.days[index+9],
                              y:functions.round2(result.data[0][variable][index+9])
                          })
                        }
                    }
                    
                    setData(newData);
                }
              });
              }
              if(variable === "Velocidad de viento"){
                  axios
              .get(
                constants.backendURL + "/api/wind/" + param + "/" + getLat + "+" + getLon
              )
              .then((result) => {
                if (result.status === 200) {
                    var newData = [];
                    console.log(constants.days)
                    for (let index = 0; index < result.data[0][variable].length; index+=10) {
                        if(index === 0){
                          newData.push({
                              x:constants.days[index],
                              y:functions.round2(result.data[0][variable][index])
                          })
                        }else{
                        newData.push({
                            x:constants.days[index-1],
                            y:functions.round2(result.data[0][variable][index-1])
                        })}
                        if(index===350){
                          console.log(constants.days[index+9])
                          newData.push({
                              x:constants.days[index+9],
                              y:functions.round2(result.data[0][variable][index+9])
                          })
                        }
                    }
                    
                    setData(newData);
                }
              });
              }
            
          }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [coord, variable, param]);
      
        return (
          <InnerContent coord={coord} variable={variable} data={data} param={param} />
        );
      };
      
      export default DailyGraphParam;
      