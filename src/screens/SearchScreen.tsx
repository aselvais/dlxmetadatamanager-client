import React, { Component } from "react";
import { observer } from "mobx-react";
import Grid from "../components/Grid";
import { gridConfig } from "../models/interfaces";
import { Icon } from "@blueprintjs/core";

import AbstractModel from "../models/AbstractModel";

import Origins from "../models/Origins";
import Databases from "../models/Databases";
import Tables from "../models/Tables";
import Fields from "../models/Fields";

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
            model : Origins, selected_id : null, parent : null,
            gridConfig : { showOnly:[ 'name', 'host', 'organization' ], actions: ['view', 'edit', 'drilldown'] }
        },
        {
            model : Databases, selected_id : null, parent : 'origins',
            gridConfig : {showOnly:['name', 'schema','storageengine', 'vendorbrand'], actions: ['view', 'edit', 'drilldown']}
        },
        {
            model : Tables, selected_id : null, parent : 'databases', 
            gridConfig : {showOnly:['name'], actions: ['view', 'edit', 'drilldown']}
        },
        {
            model : Fields, selected_id : null, parent : 'tables',
            gridConfig : {showOnly:['name', 'datatype', 'documentation'], actions: ['view', 'edit']}
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
        if (o.parent) {
            query.where[o.parent+'_idh'] = o.selected_id;
        }
        o.model.find(query);
    }

    /**
     * 
     * @param row 
     */
    public view(row : object = {}) {
        // @ts-ignore
        console.log(row.id); 
    }

    /**
     * 
     * @param row 
     */
    public edit(row : object = {}) { 
        // @ts-ignore
        console.log(row.id); 
    }

    /**
     * 
     * @param row 
     */
    public drilldown(row : object = {}, step : number = null) {
        this.lvl[this.state.level].model.document = row;
        let tot = (step === null) ? this.state.level + 1 : step;
        // @ts-ignore
        this.setState({level: tot }, () => this.loadData(row.idh) );
    }

    /**
     * 
     */
    render()
    {
        return (
        <div>
            <div style={{padding: 10, margin: 10}}>
            <ul className="bp3-breadcrumbs">
            <li><a className="bp3-breadcrumb"><Icon icon={'more'} iconSize={18} onClick={() => this.drilldown(this.lvl[0].model.document, 0)}/></a></li>
            {
            // @ts-ignore
            [...Array(this.state.level).keys()].map((e,i) => 
                <li>
                    <a className="bp3-breadcrumb" onClick={() => this.drilldown(this.lvl[e].model.document, i+1)}>{
                    // @ts-ignore
                    this.lvl[e].model.document.name
                    }</a>
                </li>
            )
            }
            </ul>
            </div>
            <div>
                <Grid model={this.lvl[this.state.level].model} config={this.lvl[this.state.level].gridConfig} parent={this}/>
            </div>
        </div>
        );
    }

}

export default SearchScreen;
