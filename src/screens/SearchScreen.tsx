import React, { Component } from "react";
import Origins from "../models/Origins";
import Grid from "../components/Grid";
import { observer } from "mobx-react";
import AbstractModel from "../models/AbstractModel";
import Databases from "../models/Databases";
import Tables from "../models/Tables";
import { gridConfig } from "../models/interfaces";
import Fields from "../models/Fields";
import { Button } from "@blueprintjs/core";
import Translator from "../libs/translate/Translator";

interface lvlElementType {
    model : AbstractModel,
    selected_id : string | null,
    gridConfig : gridConfig,
    q : object
};

/**
 * 
 */
@observer
class SearchScreen extends Component
{
    public state = {
        level: 0
    };
    /**
     * 
     */
    protected lvl : Array<lvlElementType> = [
        {
            model : Origins,
            selected_id : null,
            gridConfig : { showOnly:[ 'name', 'host', 'organization' ], actions: ['view', 'edit', 'drilldown'] },
            q : {}
        },
        {
            model : Databases,
            selected_id : null,
            gridConfig : {showOnly:['name', 'schema','storageengine', 'vendorbrand'], actions: ['view', 'edit', 'drilldown']},
            q : { where: {origins_idh: '8256bacb5f7848f333f6519f6428f49b'}}
        },
        {
            model : Tables, 
            selected_id : null,
            gridConfig : {showOnly:['name'], actions: ['view', 'edit', 'drilldown']},
            q : { where: {databases_idh : "e5b4fbe713d462a5812a42e8987611a4"}}
        },
        {
            model : Fields,
            selected_id : null,
            gridConfig : {showOnly:['name', 'datatype', 'documentation'], actions: ['view', 'edit']},
            q : { where: {tables_idh : "e80704fbc8779cbc1ae5b36c7f44137b"}}
        }
    ];
    
    /**
     * 
     */
    componentDidMount()
    {
        this.loadData();
    }

    /**
     * 
     */
    loadData()
    {
        this.lvl[this.state.level].model.find(this.lvl[this.state.level].q);
    }

    /**
     * 
     */
    render()
    {
        return (
            <div>
                {[0,1,2,3].map(e => <Button text={e} onClick={ () => this.setState({level: e}, () => this.loadData() ) }/> )}
                <h3>
                    {Translator.t(this.lvl[this.state.level].model.getName())}
                </h3>
                <div>
                    <Grid model={this.lvl[this.state.level].model} config={this.lvl[this.state.level].gridConfig}/>
                </div>
            </div>
        );
    }

}


export default SearchScreen;
