import React, { Component } from "react";
import { observer } from "mobx-react";
import Grid from "../components/Grid";
import { gridConfig } from "../models/interfaces";
import { Dialog, Icon, IconName, Colors } from "@blueprintjs/core";
import FieldeditionForm from "../components/FieldeditionForm";
import FieldviewForm from "../components/FieldviewForm";

import AbstractModel from "../models/orm/AbstractModel";

import Systems from "../models/orm/Systems";
import Origins from "../models/orm/Origins";
import Databases from "../models/orm/Databases";
import Tables from "../models/orm/Tables";
import Fields from "../models/orm/Fields";
import Translator from "../libs/translate/Translator";
import Form from "../components/forms/Form";
import Schemas from "../models/orm/Schemas";
import NavStore from "../models/NavStore";
import Schemadata from "../models/orm/Schemadata";
import Reportschema from "../components/Reportschema";
import StatusBarModel from "../models/StatusBarModel";

interface lvlElementType {
    model : AbstractModel,
    gridConfig : gridConfig,
    parent : string | null
};

interface model2iconSchema {
    [key:string]: IconName
};

/**
 * 
 */
@observer
class SearchScreen extends Component
{
    /**
     * model name to icon
     */
    public model2icon : model2iconSchema = {
        'systems' : 'application',
        'origins' : 'locate',
        'databases' : 'database',
        'schemas' : 'diagram-tree',
        'tables' : 'th',
        'fields' : 'list',
        'report': 'chart'
    };
    protected fna = '';
    /**
     * 
     */
    protected lvl : Array<lvlElementType> = [
        {
            model : Systems, parent : null,
            gridConfig : { 
                showOnly:[ 'should_ignore', 'tags', 'name', 'code', 'organization', 'documentation', 'created_date' ], 
                editable: ['documentation'], 
                actions: ['delete', 'edit', 'drilldown', 'add'] 
            }
        },
        {
            model : Origins, parent : 'systems',
            gridConfig : { 
                showOnly:[ 'should_ignore', 'tags', 'name', 'app_code', 'organization', 'owner', 'documentation', 'created_date' ], 
                editable: ['documentation'], 
                actions: ['delete', 'edit', 'drilldown', 'add'] 
            }
        },
        {
            model : Databases,  parent : 'origins',
            gridConfig : {
                showOnly:[ 'should_ignore', 'tags', 'name', 'code', 'app_name', 'vendorbrand', 'documentation', 'created_date'], 
                editable: ['documentation'], 
                actions: ['delete', 'edit', 'drilldown', 'add']
            }
        },
        {
            model : Schemas, parent : 'databases',
            gridConfig : {
                showOnly:[ 'should_ignore', 'tags', 'name', 'schema','storageengine', 'vendorbrand', 'documentation', 'created_date'], 
                editable: ['documentation'], 
                actions: ['report', 'edit', 'drilldown']
            }
        },
        {
            model : Tables, parent : 'schemas', 
            gridConfig : {
                showOnly:[ 'should_ignore', 'tags', 'name', 'documentation', 'created_date'], 
                editable: ['documentation'], 
                actions: ['edit', 'drilldown']
            }
        },
        {
            model : Fields, parent : 'tables',
            gridConfig : {
                showOnly:[ 'should_ignore', 'tags', 'name', 'datatype', 'semantic_type', 'group', 'datalength', 'documentation', 'created_date'], 
                editable: ['documentation'], 
                actions: ['edit']
            }
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
        if (_id !== null) this.lvl[NavStore.items[2].level].model.selected_parent_id = _id;
        let query = { where: {}};
        if (this.lvl[NavStore.items[2].level].parent) {
            query.where[this.lvl[NavStore.items[2].level].parent+'_idh'] = this.lvl[NavStore.items[2].level].model.selected_parent_id;
        }
        this.lvl[NavStore.items[2].level].model.find(query.where);
    }

    /**
     * 
     * @param row 
     */
    public view(row : object = {}) 
    {
        // @ts-ignore
        let o = this.lvl[NavStore.items[2].level].model;
        o.document = row;
        o.findRelated('schemadata');
        this.lvl[NavStore.items[2].level].model.currentAction = 'view';
    }

    /**
     * 
     * @param row 
     */
    public report(row : object = {}) 
    {
        //@ts-ignore
        if (typeof row.should_ignore !== 'undefined' && row.should_ignore === 0)
        {
            Schemadata.loadReport(row);
            this.lvl[NavStore.items[2].level].model.currentAction = 'report';    
        } else {
            StatusBarModel.color = Colors.VERMILION4;
            StatusBarModel.icon = 'error';
            StatusBarModel.text = 'The schema should be "active" if you want to see the reporting.';
            setTimeout(() => {
                StatusBarModel.color = '#FFFFFF';
                StatusBarModel.icon = null;
                StatusBarModel.text = 'info-sign';
            }, 3000);
        }
    }

    /**
     * 
     * @param row 
     */
    public edit(row : object = {}) 
    { 
        // @ts-ignore
        this.lvl[NavStore.items[2].level].model.document = row;
        this.lvl[NavStore.items[2].level].model.currentAction = 'editing';
    }

    /**
     * 
     * @param row 
     */
    public add(row : object = {}) 
    { 
        // @ts-ignore
        this.lvl[NavStore.items[2].level].model.document = row;
        this.lvl[NavStore.items[2].level].model.currentAction = 'adding';
    }

    /**
     * 
     * @param row 
     */
    public delete(row : object = {}) 
    { 
        this.lvl[NavStore.items[2].level].model.document = row;
        //@ts-ignore
        this.lvl[NavStore.items[2].level].model.deleteOne();
    }

    /**
     * 
     * @param row 
     */
    public drilldown(row : object = {}, step : number = null) 
    {
        this.lvl[NavStore.items[2].level].model.document = row;
        let tot = (step === null) ? NavStore.items[2].level + 1 : step;

        NavStore.items[2].level = tot;
        //@ts-ignore
        if (row) this.loadData(row.idh);
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
                        [...Array(NavStore.items[2].level).keys()].map((e,i) => {
                            let nna = Translator.t(this.lvl[e+1].model.name);
                            try {
                                // @ts-ignore
                                this.fna += ((i >= 1) ? ' > ' : '') + this.lvl[e].model.document.name;
                            } catch(eee) {}
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
        if (!this.lvl[NavStore.items[2].level].model.document) return null;
        return (
            <div>
            <Dialog title={ 
                    // @ts-ignore
                    this.fna + ' > ' + (this.lvl[NavStore.items[2].level].model.document.name ? this.lvl[NavStore.items[2].level].model.document.name : '' )
                    }
                    style={{ width: '70%', maxHeight: '90vh' }}
                    onClose={() => this.lvl[NavStore.items[2].level].model.currentAction = null } 
                    isOpen={ (this.lvl[NavStore.items[2].level].model.currentAction === 'editing' || this.lvl[NavStore.items[2].level].model.currentAction === 'view' || this.lvl[NavStore.items[2].level].model.currentAction === 'adding') }
                    icon={ this.model2icon[this.lvl[NavStore.items[2].level].model.name] } >
                { (this.lvl[NavStore.items[2].level].model.currentAction === 'editing' || this.lvl[NavStore.items[2].level].model.currentAction === 'adding') ? <FieldeditionForm model={this.lvl[NavStore.items[2].level].model} /> : null }
                { (this.lvl[NavStore.items[2].level].model.currentAction === 'view') ? <FieldviewForm model={this.lvl[NavStore.items[2].level].model} /> : null }
            </Dialog>
            </div>
        );
    }

    /**
     * 
     */
    public getDialogReportJsx()
    {
        if (this.lvl[NavStore.items[2].level].model.currentAction === 'report') {
            return (
                <div>
                <Dialog title="Report"
                        style={{ width: '90%', maxHeight: '90vh' }}
                        onClose={() => this.lvl[NavStore.items[2].level].model.currentAction = null } 
                        isOpen={ (this.lvl[NavStore.items[2].level].model.currentAction === 'report') }
                        icon='chart' >
                            <Reportschema />
                </Dialog>
                </div>
            );
        } else {
            return null;
        }
    }

    /**
     * Return the JSX for the 'documnentation' form on top of the table
     */
    public getDocumentationEntiryFormJsx()
    {
        if (NavStore.items[2].level === 0) return null;
        return (
            <div style={{padding: 0, width: '50%'}}>
            <h2>
            <Icon icon={ this.model2icon[this.lvl[NavStore.items[2].level-1].model.name] } style={{padding: 3, paddingRight: 8}} />
            {
                // @ts-ignore
                Translator.toSingular(this.lvl[(NavStore.items[2].level)].parent) + ' : ' + this.lvl[(NavStore.items[2].level-1)].model.document.name
            }</h2>
            <Form 
                model={this.lvl[(NavStore.items[2].level-1)].model} 
                documentname="document"
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
                    <Icon icon={this.model2icon[this.lvl[NavStore.items[2].level].model.name]} style={{padding: 2, paddingRight: 8}} />
                    { Translator.t(this.lvl[(NavStore.items[2].level)].model.name) + ' list' }
                    <div style={{ fontSize: 12, fontWeight: 'normal', fontStyle: 'italic', paddingLeft: 25 }}>{this.fna ? 'in ' + this.fna : ''}</div>
                </h3>
                <Grid model={this.lvl[NavStore.items[2].level].model} config={this.lvl[NavStore.items[2].level].gridConfig} parent={this}/>
            </div>
        );
    }

    /**
     * 
     */
    public getErrorMessageJsx()
    {
        let o = this.lvl[NavStore.items[2].level].model.error;
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
                {this.getDialogReportJsx()}
                {this.getTableGridJsx()}
            </div>
        );
    }

}

export default SearchScreen;
