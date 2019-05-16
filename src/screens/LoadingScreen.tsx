import React, { Component } from "react";
import Schemadata from "../models/Schemadata";
import { observer } from "mobx-react";
import NavStore from "../models/NavStore";
import { ProgressBar } from "@blueprintjs/core";
import logo from '../assets/images/Deluxe_enterprise_logo_RGB.png';

/**
 * This screen is used to preload data then go to the home screen when everything is loaded...
 */
@observer
class LoadingScreen extends Component
{
    perc : number = 0;
    aggrFields : Array<string> = ['ENGINE', 'TABLE_CATALOG', 'TABLE_SCHEMA', 'OWNER', 'DATA_TYPE', 'TABLE_NAME'];

    /**
     * Load some data when the components are available
     */
    public componentDidMount()
    {
        this.aggrFields.map(e => Schemadata.aggregate(e) );
    }

    /**
     * 
     */
    componentDidUpdate()
    {
        if (this.perc === 100) setTimeout(() => NavStore.setActive('HomeScreen'), 100);
    }

    /**
     * 
     */
    render()
    {
        this.perc = (Object.keys(Schemadata.aggragateddata).length / this.aggrFields.length)*100;
        return (
            <div style={{textAlign: 'center', padding: 100}}>
                <div style={{padding: 20}}>
                    <img src={logo} alt="Deluxe logo" width={180}/>
                </div>
                <ProgressBar intent='primary' value={this.perc} />
                <div style={{padding: 10}}>Loading ... {this.perc.toFixed(0)+'%'}</div>
            </div>

        );
    }

}


export default LoadingScreen;

