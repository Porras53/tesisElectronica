/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
//Documentación
import { Grid, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import colors from "./assets/colors/colors.json";
import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Ejemplo_1 from "./assets/images/Ejemplo_1.png";
import Ejemplo_2 from "./assets/images/Ejemplo_2.png";
import Ejemplo_3 from "./assets/images/Ejemplo_3.png";
import InfoCard from "./components/infocard";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "10vh",
    marginBottom: "10vh",
  },
  list: {
    marginLeft: "10vh",
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
    color: "rgb(0, 0, 0)",
    fontSize: 25,
  },
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
  },
}));

function Tutorials() {
  const classes = useStyles();
  const [tutorialActual, setTutorial] = useState("Uso básico del mapa");
  let titulo1="Como mirar el dato histórico de cualquier punto de Colombia:";
  let titulo2="Como mirar diversas gráficas informativas:";
  let paso11=" Se tiene que presionar al icóno para ver los datos meteorológicos";
  let imgpaso11=Ejemplo_1;
  let paso12="Presionar en cualquier punto del mapa de colombia.";
  let imgpaso12=Ejemplo_2;
  let paso13=" Observar resultados a mano izquierda de la pantalla en varias variables.";
  let imgpaso13=Ejemplo_3;
  let paso21=" Se tiene que presionar al icóno para ver los datos meteorológicos";
  let imgpaso21=Ejemplo_1;
  let paso22="Presionar en cualquier punto del mapa de colombia.";
  let imgpaso22=Ejemplo_2;
  let paso23=" Observar resultados a mano izquierda de la pantalla en varias variables.";
  let imgpaso23=Ejemplo_3;

  function cambiarTutorial(element) {
    let info=element.target.parentNode.children;
    console.log(info[0].innerHTML);
    setTutorial(info[0].innerHTML);
  }


  useEffect(() => {


    if(tutorialActual==="Uso básico del mapa")
    {
       titulo1="Como mirar el dato histórico de cualquier punto de Colombia:";
       titulo2="Como mirar diversas gráficas informativas:";
       paso11=" Se tiene que presionar al icóno para ver los datos meteorológicos";
       imgpaso11=Ejemplo_1;
       paso12="Presionar en cualquier punto del mapa de colombia.";
       imgpaso12=Ejemplo_2;
       paso13=" Observar resultados a mano izquierda de la pantalla en varias variables.";
       imgpaso13=Ejemplo_3;
       paso21=" Se tiene que presionar al icóno para ver los datos meteorológicos";
       imgpaso21=Ejemplo_1;
       paso22="Presionar en cualquier punto del mapa de colombia.";
       imgpaso22=Ejemplo_2;
       paso23=" Observar resultados a mano izquierda de la pantalla en varias variables.";
       imgpaso23=Ejemplo_3;

    }
    else if(tutorialActual==="Mirar datos históricos")
    {
      titulo1="Prueba #1";
      titulo2="Prueba #2";
      paso11=" Se tiene que presionar al icóno para ver los datos meteorológicos";
      imgpaso11=Ejemplo_1;
      paso12="Presionar en cualquier punto del mapa de colombia.";
      imgpaso12=Ejemplo_2;
      paso13=" Observar resultados a mano izquierda de la pantalla en varias variables.";
      imgpaso13=Ejemplo_3;
      paso21=" Se tiene que presionar al icóno para ver los datos meteorológicos";
      imgpaso21=Ejemplo_1;
      paso22="Presionar en cualquier punto del mapa de colombia.";
      imgpaso22=Ejemplo_2;
      paso23=" Observar resultados a mano izquierda de la pantalla en varias variables.";
      imgpaso23=Ejemplo_3;
    }
    else{
      titulo1="Prueba #1";
      titulo2="Prueba #2";
      paso11=" Se tiene que presionar al icóno para ver los datos meteorológicos";
      imgpaso11=Ejemplo_1;
      paso12="Presionar en cualquier punto del mapa de colombia.";
      imgpaso12=Ejemplo_2;
      paso13=" Observar resultados a mano izquierda de la pantalla en varias variables.";
      imgpaso13=Ejemplo_3;
      paso21=" Se tiene que presionar al icóno para ver los datos meteorológicos";
      imgpaso21=Ejemplo_1;
      paso22="Presionar en cualquier punto del mapa de colombia.";
      imgpaso22=Ejemplo_2;
      paso23=" Observar resultados a mano izquierda de la pantalla en varias variables.";
      imgpaso23=Ejemplo_3;
    }

  }, [tutorialActual]);


  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" onClick={cambiarTutorial}>
          Uso básico del mapa
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" onClick={cambiarTutorial}>
                Mirar datos históricos
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" onClick={cambiarTutorial}>
                Tutorial #3
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" onClick={cambiarTutorial}>
                Tutorial #4
              </a>
            </li>
          </ul>
        </div>
      </nav>


      <Grid container justify="center" className={classes.container}>
        <Grid item xs={8}>
          <Typography variant="h4" component="h2" gutterBottom justify="center">
            {titulo1}
          </Typography>

          <Carousel variant="dark">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={imgpaso11}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Primer Paso</h3>
                <p>
                 {paso11}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={imgpaso12}
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3>Segundo Paso</h3>
                <p>{paso12}</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={imgpaso13}
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Tercer paso</h3>
                <p>
                 {paso13}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Grid>
      </Grid>
      <Grid container justify="center" className={classes.container}>
        <Grid item xs={8}>
          <Typography variant="h4" component="h2" gutterBottom justify="center">
           {titulo2}
          </Typography>

          <Carousel variant="dark">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={imgpaso21}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Primer Paso</h3>
                <p>
                  {paso21}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={imgpaso22}
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3>Segundo Paso</h3>
                <p>{paso22}</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={imgpaso23}
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Tercer paso</h3>
                <p>
                  {paso23}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Grid>
      </Grid>
    </div>
  );
}

export default Tutorials;
