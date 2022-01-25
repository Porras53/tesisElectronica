//PARA GENERAR EL MAPA DE CAMBIO CLIMÁTICO
import React, { useRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import constants from "../utils/constants";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

//mapboxgl.accessToken =
//  "pk.eyJ1IjoiYWxlMTIwMSIsImEiOiJja3N5MjJxdDUwZ2cwMnVxb2ExZXlobWR2In0.UFH-8n44SjyQyLVEN-XtJQ";
  

const useStyles = makeStyles((theme) => ({
  mapcontainer: {
    height: "100vh",
  },
}));

const MapParam = (props) => {
  const classes = useStyles();
  const mapContainerRef = useRef(null);
  const param = props.param;
  const variable = props.variable.replace('.', '');
  const coord = props.coord;
  const reloadMap = props.reloadMap;

  const [lng, setLng] = useState(-77);
  const [lat, setLat] = useState(5.26);
  const [zoom, setZoom] = useState(4.7);



  var marker = new mapboxgl.Marker();

  const handleMarkerChange = (coord, map) => {
    if (map !== null) {
      marker.remove();
      marker.setLngLat(coord).addTo(map);
    }
  };

  // Initialize map when component mounts
  useEffect(() => {
    axios.get(constants.backendURL + "/api/mapP/" + param).then((result) => {
      if (result.data.length === 0) {
        console.log("Error retrieving map data");
      } else {
        const data = result.data[0];
        props.onVariableLimitsChange(data[variable]);
        const mapP = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/outdoors-v11",
          center: [lng, lat],
          zoom: zoom,
          maxZoom: 12,
          minZoom: 4.3,
        });

        // Add navigation control (the +/- zoom buttons)
        mapP.addControl(new mapboxgl.NavigationControl(), "bottom-right");

        if (coord[0] !== 0 && coord[1] !== 0) {
          marker.setLngLat(coord).addTo(mapP);
        }

        mapP.on("move", () => {
          setLng(mapP.getCenter().lng.toFixed(4));
          setLat(mapP.getCenter().lat.toFixed(4));
          setZoom(mapP.getZoom().toFixed(2));
        });

        mapP.on("load", function () {
          mapP.addSource("tileset", {
            type: "vector",
            url: data["mapURL"],
          });

          mapP.addLayer(
            {
              id: "puntos",
              type: "circle",
              source: "tileset",
              "source-layer": data["mapID"],
              minzoom: 1,
              paint: {
                // Size circle radius by earthquake magnitude and zoom level
                "circle-radius": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  3.5,
                  4,
                  15,
                  20,
                ],
                // Color circle by earthquake magnitude
                "circle-color": [
                  "interpolate",
                  ["linear"],
                  ["get", variable],
                  data[variable][0],
                  "#0000ff",
                  data[variable][0] +
                    0.2 * (data[variable][1] - data[variable][0]),
                  "#4169e1",
                  data[variable][0] +
                    0.4 * (data[variable][1] - data[variable][0]),
                  "#00ffff",
                  data[variable][0] +
                    0.6 * (data[variable][1] - data[variable][0]),
                  "#00ff00",
                  data[variable][0] +
                    0.8 * (data[variable][1] - data[variable][0]),
                  "#ffff00",
                  data[variable][1],
                  "#ff0000",
                ],
                "circle-opacity": 0.7,
              },
            },
            "waterway-label"
          );
        });

        // When a click event occurs on a feature in the places layer, open a popup at the
        // location of the feature, with description HTML from its properties.
        mapP.on("click", "puntos", function (e) {
          const coordinates = e.features[0].geometry.coordinates.slice();
          props.onCoordChange(coordinates);
          handleMarkerChange(coordinates, mapP);
        });

        // Change the cursor to a pointer when the mouse is over the places layer.
        mapP.on("mouseenter", "puntos", function () {
          mapP.getCanvas().style.cursor = "pointer";
        });

        // Change it back to a pointer when it leaves.
        mapP.on("mouseleave", "puntos", function () {
          mapP.getCanvas().style.cursor = "";
        });

        // Clean up on unmount
        return () => mapP.remove();
      }
    });
  }, [variable, param, reloadMap]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className={classes.mapcontainer} ref={mapContainerRef} />;
};

export default MapParam;
