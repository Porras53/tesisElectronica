import React, { Component } from "react";

class pdf extends Component {
    render() {
        console.log("algo")
        return(
            <div style = {{position:'absolute', width: '100%', height: '100%'}}>
                <object
                data = {require('./utils/proyecto.pdf')}
                type= "application/pdf"
                width= '100%'
                height= '100%'
                >
                </object>
            </div>
        )
    }
}
export default pdf