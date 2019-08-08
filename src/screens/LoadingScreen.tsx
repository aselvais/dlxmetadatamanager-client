import React, { Component } from "react";
import { observer } from "mobx-react";
import NavStore from "../models/NavStore";
import Schemadata from "../models/orm/Schemadata";
import { ProgressBar } from "@blueprintjs/core";
import logo from '../assets/images/Deluxe_enterprise_logo_RGB.png';
import Users from "../models/orm/Users";
/*
import Origins from "../models/orm/Origins";
import Databases from "../models/orm/Databases";
import Tables from "../models/orm/Tables";
import Fields from "../models/orm/Fields";
*/

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
        Users.initUserFromToken();

        // load all the possible tags values
        /*
        Origins.loadAllTags();
        Databases.loadAllTags();
        Tables.loadAllTags();
        Fields.loadAllTags();
        this.aggrFields.map(e => Schemadata.aggregate(e) );
        */
        //if (this.aggrFields.length === 0) 
            NavStore.setActive('SearchScreen');
    }

    /**
     * 
     */
    componentDidUpdate()
    {
        if (this.perc === 100) setTimeout(() => NavStore.setActive('SearchScreen'), 100);
    }

    /**
     * 
     */
    render()
    {
        this.perc = this.aggrFields.length ? (Object.keys(Schemadata.aggragateddata).length / this.aggrFields.length)*100 : 100;
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

