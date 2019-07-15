import React, { Component } from "react";
import { observer } from "mobx-react";
import Grid from "../components/Grid";
import { gridConfig } from "../models/interfaces";
import { Dialog, Icon } from "@blueprintjs/core";
import FieldeditionForm from "../components/FieldeditionForm";
import FieldviewForm from "../components/FieldviewForm";

import AbstractModel from "../models/orm/AbstractModel";

import Origins from "../models/orm/Origins";
import Databases from "../models/orm/Databases";
import Tables from "../models/orm/Tables";
import Fields from "../models/orm/Fields";
import Translator from "../libs/translate/Translator";
import Form from "../components/forms/Form";
import Schemas from "../models/orm/Schemas";

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
    /**
     * 
     */
    public state = {
        level: 0,
    };
    /**
     * model name to icon
     */
    public model2icon = {
        'origins' : 'locate',
        'databases' : 'database',
        'schemas' : 'diagram-tree',
        'tables' : 'th',
        'fields' : 'list',
    };
    protected fna = '';
    /**
     * 
     */
    protected lvl : Array<lvlElementType> = [
        {
            model : Origins, selected_id : null, parent : null,
            gridConfig : { showOnly:[ 'should_ignore', 'tags', 'name', 'organization', 'owner', 'documentation' ], actions: ['delete', 'edit', 'drilldown', 'add'] }
        },
        {
            model : Databases, selected_id : null, parent : 'origins',
            gridConfig : {showOnly:[ 'should_ignore', 'tags', 'name', 'app_name', 'vendorbrand', 'documentation'], actions: ['delete', 'edit', 'drilldown', 'add']}
        },
        {
            model : Schemas, selected_id : null, parent : 'databases',
            gridConfig : {showOnly:[ 'should_ignore', 'tags', 'name', 'schema','storageengine', 'vendorbrand', 'documentation'], actions: ['edit', 'drilldown']}
        },
        {
            model : Tables, selected_id : null, parent : 'schemas', 
            gridConfig : {showOnly:[ 'should_ignore', 'tags', 'name', 'documentation'], actions: ['edit', 'drilldown']}
        },
        {
            model : Fields, selected_id : null, parent : 'tables',
            gridConfig : {showOnly:[ 'should_ignore', 'tags', 'name', 'datatype', 'semantic_type', 'group', 'datalength', 'documentation'], actions: ['view', 'edit']}
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
        o.model.find(query);
    }

    /**
     * 
     * @param row 
     */
    public view(row : object = {}) 
    {
        // @ts-ignore
        let o = this.lvl[this.state.level].model;
        o.document = row;
        o.findRelated('schemadata');
        this.lvl[this.state.level].model.currentAction = 'view';
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
    public add(row : object = {}) 
    { 
        // @ts-ignore
        this.lvl[this.state.level].model.document = row;
        this.lvl[this.state.level].model.currentAction = 'adding';
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
    public drilldown(row : object = {}, step : number = null) 
    {
        this.lvl[this.state.level].model.document = row;
        let tot = (step === null) ? this.state.level + 1 : step;
        // @ts-ignore
        this.setState({level: tot }, () => this.loadData(row.idh) );
    }

    /**
     * Returns the JSX for the breadcrumb
     */
    public getBreadCrumbJsx()
    {
        return (
            <div style={{padding: 5}}>
                <ul className="bp3-breadcrumbs">
                    <li><a className="bp3-breadcrumb" href="#void" onClick={() => this.drilldown(this.lvl[0].model.document, 0)}>
                    <Icon icon={
                        this.model2icon[this.lvl[0].model.name]
                        } style={{padding: 3, paddingRight: 8}} />{
                        Translator.t(this.lvl[0].model.name)
                    }</a></li>
                    {
                        // @ts-ignore
                        [...Array(this.state.level).keys()].map((e,i) => {
                            let nna = Translator.t(this.lvl[e+1].model.name);
                            // @ts-ignore
                            this.fna += ((i >= 1) ? ' > ' : '') + this.lvl[e].model.document.name;
                            return (
                            <li>
                                <a className="bp3-breadcrumb" href="#void" onClick={() => this.drilldown(this.lvl[e].model.document, i+1)}>
                                <Icon icon={ this.model2icon[this.lvl[e+1].model.name] } style={{padding: 3, paddingRight: 8}} />{nna}
                                </a>
                            </li>);
                        })
                    }
                </ul>
            </div>
        );
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
                    icon={ this.model2icon[this.lvl[this.state.level].model.name] } >
                { (this.lvl[this.state.level].model.currentAction === 'editing' || this.lvl[this.state.level].model.currentAction === 'adding') ? <FieldeditionForm model={this.lvl[this.state.level].model} /> : null }
                { (this.lvl[this.state.level].model.currentAction === 'view') ? <FieldviewForm model={this.lvl[this.state.level].model} /> : null }
            </Dialog>
            </div>
        );
    }

    /**
     * Return the JSX for the 'documnentation' form on top of the table
     */
    public getDocumentationEntiryFormJsx()
    {
        if (this.state.level === 0) return null;
        return (
            <div style={{padding: 0, width: '50%'}}>
            <h2>
            <Icon icon={ this.model2icon[this.lvl[this.state.level-1].model.name] } style={{padding: 3, paddingRight: 8}} />
            {
                // @ts-ignore
                Translator.toSingular(this.lvl[(this.state.level)].parent) + ' : ' + this.lvl[(this.state.level-1)].model.document.name
            }</h2>
            <Form 
                model={this.lvl[(this.state.level-1)].model} 
                config={{ showButton: false, fill: true, vertical: true, elements: { 
                    documentation: { shape: "text", hideLabel: false }
                } }} 
            />
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
                <h3>
                    <Icon icon={this.model2icon[this.lvl[this.state.level].model.name]} style={{padding: 2, paddingRight: 8}} />
                    { Translator.t(this.lvl[(this.state.level)].model.name) + ' list' }
                    <div style={{ fontSize: 12, fontWeight: 'normal', fontStyle: 'italic', paddingLeft: 25 }}>{this.fna ? 'in ' + this.fna : ''}</div>
                </h3>
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
        // {this.getDocumentationEntiryFormJsx()}
        return (
            <div>
                {this.getErrorMessageJsx()}
                {this.getBreadCrumbJsx()}
                {this.getDialogJsx()}
                {this.getTableGridJsx()}
            </div>
        );
    }

}

export default SearchScreen;
