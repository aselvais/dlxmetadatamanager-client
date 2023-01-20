import React, { Component } from "react";
import { observer } from "mobx-react";
import Grid from "../components/Grid";
import { gridConfig } from "../models/interfaces";
import { Dialog } from "@blueprintjs/core";
import FieldeditionForm from "../components/FieldeditionForm";
import FieldviewForm from "../components/FieldviewForm";
import AbstractModel from "../models/orm/AbstractModel";

import Authenticationresources from "../models/orm/Authenticationresources";

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
class AuthenticationresourcesScreen extends Component
{
    /**
     * 
     */
    public state = {
        level: 0,
    };
    protected fna = '';
    /**
     * 
     */
    protected lvl : Array<lvlElementType> = [
        {
            model : Authenticationresources, selected_id : null, parent : null,
            gridConfig : { showOnly:['should_ignore', 'name', 'description'], actions: ['delete', 'edit', 'add'] }
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
    protected loadData( _id : string | null = null )
    {
        let o = this.lvl[this.state.level];
        o.selected_id = _id;
        let query = { where: {}};
        if (o.parent) {
            query.where[o.parent+'_idh'] = o.selected_id;
        }
        o.model.find(query.where);
    }

    /**
     * 
     * @param row 
     */
    public edit(row : object = {}) 
    { 
        // @ts-ignore
        this.lvl[this.state.level].model.document = row;
        this.lvl[this.state.level].model.currentAction = 'editing';
    }
    
    /**
     * 
     * @param row 
     */
    public delete(row : object = {}) 
    { 
        this.lvl[this.state.level].model.document = row;
        //@ts-ignore
        this.lvl[this.state.level].model.deleteOne();
    }

    /**
     * 
     * @param row 
     */
    public add(row : object = {}) 
    { 
        // @ts-ignore
        this.lvl[this.state.level].model.document = row;
        this.lvl[this.state.level].model.currentAction = 'adding';
    }

    /**
     * Returns JSX for the dialog containing the form
     */
    public getDialogJsx()
    {
        if (!this.lvl[this.state.level].model.document) return null;
        return (
            <div>
            <Dialog title={ 
                    // @ts-ignore
                    this.fna + ' > ' + (this.lvl[this.state.level].model.document.name ? this.lvl[this.state.level].model.document.name : '' )
                    }
                    style={{ width: '70%' }}
                    onClose={() => this.lvl[this.state.level].model.currentAction = null } 
                    isOpen={ (this.lvl[this.state.level].model.currentAction === 'editing' || this.lvl[this.state.level].model.currentAction === 'view' || this.lvl[this.state.level].model.currentAction === 'adding') }
                     >
                { (this.lvl[this.state.level].model.currentAction === 'editing' || this.lvl[this.state.level].model.currentAction === 'adding') ? <FieldeditionForm model={this.lvl[this.state.level].model} /> : null }
                { (this.lvl[this.state.level].model.currentAction === 'view') ? <FieldviewForm model={this.lvl[this.state.level].model} /> : null }
            </Dialog>
            </div>
        );
    }

    /**
     * Returns the table data grid 
     */
    public getTableGridJsx()
    {
        return (
            <div style={{paddingLeft: 20}}>
                <Grid model={this.lvl[this.state.level].model} config={this.lvl[this.state.level].gridConfig} parent={this}/>
            </div>
        );
    }

    /**
     * 
     */
    public getErrorMessageJsx()
    {
        let o = this.lvl[this.state.level].model.error;
        if (o && o.message)
        {
            return (<div>{o.message}</div>);
        } else {
            return null;
        }
    }

    /**
     * Main render method returning JSX
     */
    render()
    {
        this.fna = '';
        return (
            <div>
                {this.getErrorMessageJsx()}
                {this.getDialogJsx()}
                <div style={{padding: 30}}>
                    List of authentication resources Streamsets can use (for example it can be a file where the passwords are used).
                </div>
                {this.getTableGridJsx()}
            </div>
        );
    }

}

export default AuthenticationresourcesScreen;
