import React, { Component } from "react";
import { observer } from "mobx-react";
import Grid from "../components/Grid";
import { gridConfig } from "../models/interfaces";
import { Icon, Dialog } from "@blueprintjs/core";
import FieldeditionForm from "../components/FieldeditionForm";

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
        level: 0,

        autoFocus: true,
        canEscapeKeyClose: true,
        canOutsideClickClose: true,
        enforceFocus: true,
        isOpen: false,
        usePortal: true
    };
    /**
     * 
     */
    protected lvl : Array<lvlElementType> = [
        {
            model : Origins, selected_id : null, parent : null,
            gridConfig : { showOnly:[ 'name', 'host', 'organization', 'documentation' ], actions: ['edit', 'drilldown'] }
        },
        {
            model : Databases, selected_id : null, parent : 'origins',
            gridConfig : {showOnly:['name', 'schema','storageengine', 'vendorbrand', 'documentation'], actions: ['edit', 'drilldown']}
        },
        {
            model : Tables, selected_id : null, parent : 'databases', 
            gridConfig : {showOnly:['name', 'documentation'], actions: ['edit', 'drilldown']}
        },
        {
            model : Fields, selected_id : null, parent : 'tables',
            gridConfig : {showOnly:['name', 'datatype', 'datalength', 'documentation'], actions: ['view', 'edit']}
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
        this.lvl[this.state.level].model.document = row;
        this.setState({ isOpen: true });
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
        let fna = '';
        return (
        <div>
            <div style={{padding: 10, margin: 10}}>
            <ul className="bp3-breadcrumbs">
            <li><a className="bp3-breadcrumb"><Icon icon={'more'} iconSize={18} onClick={() => this.drilldown(this.lvl[0].model.document, 0)}/></a></li>
            {
            // @ts-ignore
            [...Array(this.state.level).keys()].map((e,i) => {
                // @ts-ignore
                let nna = this.lvl[e].model.document.name;
                fna += ' > ' + nna;
                return (<li>
                    <a className="bp3-breadcrumb" onClick={() => this.drilldown(this.lvl[e].model.document, i+1)}>{nna}</a>
                </li>);
            }
            )
            }
            </ul>
            </div>
            <div>
                <Grid model={this.lvl[this.state.level].model} config={this.lvl[this.state.level].gridConfig} parent={this}/>
            </div>
            <div>
            <Dialog icon="edit" 
                onClose={() => this.setState({ isOpen: false })} 
                title={
                    // @ts-ignore
                    fna + ' (' + this.lvl[this.state.level].model.name + ')'
                    } {...this.state}>
                <FieldeditionForm model={this.lvl[this.state.level].model}/>
            </Dialog>
            </div>
        </div>
        );
    }

}

export default SearchScreen;
