//PÁGINA PRINCIPAL PARA MAPA DE CAMBIO CLIMÁTICO
import React, { useState } from "react";
import MapParam from "./components/mapParam";
import SideContent from "./components/sideContentParam/sidecontentparam";
import ParamCard from "./components/paramCard";
import GenerationForm from "./components/generationParam/generationParam";
import axios from "axios";
import constants from "./utils/constants";
import functions from "./utils/functions";

function Prediction() {
  
  let [selectedCoord, setSelectedCoord] = useState([0, 0]);
  const [param, setParam] = useState("GHI");
  const [variable, setVariable] = useState("RCP2.6");
  const [variableLimits, setvariableLimits] = useState([0, 0]);
  const [content, setContent] = useState(0);
  const [reloadMap, setReloadMap] = useState(false);



  const nearCoordinatesMap = (newValue, callback) =>{
    axios
        .get(
          constants.backendURL +
            "/api/cp/near/" +
            functions.round3(newValue[1]) +
            "+" +
            functions.round3(newValue[0])
        )
        .then(
          (result) => {
            let auxi = result.data[0].location.coordinates[0];
            let auxi2 = result.data[0].location.coordinates[1];
            callback(auxi,auxi2);
          }
        );

  }

  const handleCoordChange = (newValue) => {
    
    nearCoordinatesMap(newValue,(var1, var2)=>{
      newValue=[var1, var2]
      setSelectedCoord(newValue);

      selectedCoord = newValue;
    })
    
  };

  const handleParamChange = (param) => {
    setParam(param);
  };

  const handleVariableChange = (variable) => {
    setVariable(variable);
  };

  const handleVariableLimitsChange = (variableLimits) => {
    setvariableLimits(variableLimits);
  };

  const handleContentChange = (content) => {
    setContent(content);
  };

  const handleReloadMap = (reload) => {
    setReloadMap(reload);
  };

  return (
    <div>
      {content === 0 ? (
        <SideContent coord={selectedCoord} param={param} variable={variable} />
      ) : (
        <GenerationForm coord={selectedCoord} param={param} variable={variable} />
      )}
     <ParamCard
        coord={selectedCoord}
        onCoordChange={handleCoordChange}
        param={param}
        variable={variable}
        variableLimits={variableLimits}
        content={content}
        reloadMap={reloadMap}
        onParamChange={handleParamChange}
        onVariableChange={handleVariableChange}
        onContentChange={handleContentChange}
        onReloadMap={handleReloadMap}
      />
     <MapParam
        coord={selectedCoord}
        onCoordChange={handleCoordChange}
        param={param}
        variable={variable}
        variableLimits={variableLimits}
        reloadMap={reloadMap}
        onParamChange={handleParamChange}
        onVariableChange={handleVariableChange}
        onVariableLimitsChange={handleVariableLimitsChange}
      />
    </div>
  );
}

export default Prediction;