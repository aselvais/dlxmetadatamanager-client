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
    parent : string | null
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
            gridConfig : { showOnly:[ 'name', 'host', 'organization' ], actions: ['view', 'edit', 'drilldown'] },
            selected_id : null,
            parent : null
        },
        {
            model : Databases,
            gridConfig : {showOnly:['name', 'schema','storageengine', 'vendorbrand'], actions: ['view', 'edit', 'drilldown']},
            selected_id : null,
            parent : 'origins'
        },
        {
            model : Tables, 
            gridConfig : {showOnly:['name'], actions: ['view', 'edit', 'drilldown']},
            selected_id : null,
            parent : 'databases'
        },
        {
            model : Fields,
            gridConfig : {showOnly:['name', 'datatype', 'documentation'], actions: ['view', 'edit']},
            selected_id : null,
            parent : 'tables'
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
    loadData( _id : string | null = null )
    {
        let o = this.lvl[this.state.level];
        o.selected_id = _id;
        let query = { where: {}};
        if (o.parent) query.where[o.parent+'_idh'] = o.selected_id;
        o.model.find(query);
    }

    /**
     * 
     * @param levelId 
     * @param _id 
     */
    public drillDown(levelId : number = 0, _id : string | null = null)
    {
        this.setState({level: levelId}, () => this.loadData(_id) );
    }

    public view(row : object = {}) {
        // @ts-ignore
        console.log(row.id); 
    }

    public edit(row : object = {}) { 
        // @ts-ignore
        console.log(row.id); 
    }

    public drilldown(row : object = {}) { 
        // @ts-ignore
        this.setState({level: (this.state.level+1) }, () => this.loadData(row.idh) );

    }

    /**
     * 
     */
    render()
    {
        return (
            <div>
                {[0,1,2,3].map(e => <Button text={e} onClick={ () => this.drillDown(e) }/> )}
                <h3>
                    {Translator.t(this.lvl[this.state.level].model.getName())}
                </h3>
                <div>
                    <Grid model={this.lvl[this.state.level].model} config={this.lvl[this.state.level].gridConfig} parent={this}/>
                </div>
            </div>
        );
    }

}


export default SearchScreen;
