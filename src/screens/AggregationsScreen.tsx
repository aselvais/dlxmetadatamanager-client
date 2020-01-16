import React, { Component } from "react";
import Schemadata from "../models/orm/Schemadata";
import SimpleGrid from "../components/SimpleGrid";
import { Spinner } from "@blueprintjs/core";

/**
 * 
 */
class AggregationsScreen extends Component
{
    /**
     * 
     */
    protected _cfg = [
        {title: 'Origin organizations', statePropName: 'originorganizations', collectionName: 'origins', fieldName: 'organization', limit: 30 },
        {title: 'Origin owner', statePropName: 'originowner', collectionName: 'origins', fieldName: 'owner', limit: 30 },

        {title: 'Database storage engine', statePropName: 'databasestorageengine', collectionName: 'databases', fieldName: 'storageengine', limit: 30 },
        {title: 'Database vendor brand', statePropName: 'databasevendorbrand', collectionName: 'databases', fieldName: 'vendorbrand', limit: 30 },
        {title: 'Database network', statePropName: 'databasenetwork', collectionName: 'databases', fieldName: 'network', limit: 30 },

        {title: 'Table names', statePropName: 'tablesname', collectionName: 'tables', fieldName: 'name', limit: 30 },

        {title: 'Field names', statePropName: 'fieldsname', collectionName: 'fields', fieldName: 'name', limit: 30 },
        {title: 'Field datatype', statePropName: 'fieldsdatatype', collectionName: 'fields', fieldName: 'datatype', limit: 30 },
        {title: 'Field semantic types', statePropName: 'fieldsemantictypes', collectionName: 'fields', fieldName: 'semantic_type', limit: 40 },
        {title: 'Field Groups', statePropName: 'fieldgroupstypes', collectionName: 'fields', fieldName: 'group', limit: 40 },
        {title: 'Field is PII', statePropName: 'fieldsispii', collectionName: 'fields', fieldName: 'is_pii', limit: 30 },
        {title: 'Field is PCI', statePropName: 'fieldsispci', collectionName: 'fields', fieldName: 'is_pci', limit: 30 },
        {title: 'Field should be ignored', statePropName: 'fieldsshouldignore', collectionName: 'fields', fieldName: 'should_ignore', limit: 30 },

        {title: 'System code', statePropName: 'systemcode', collectionName: 'systems', fieldName: 'code', limit: 30 },
        {title: 'Origin code', statePropName: 'originappcode', collectionName: 'origins', fieldName: 'app_code', limit: 30 },
        {title: 'Database code', statePropName: 'databasecode', collectionName: 'databases', fieldName: 'code', limit: 30 },


    ];
    /**
     * 
     */
    public state = {
        originorganizations: [],
        originowner: [],
        databasestorageengine: [],
        databasenetwork: [],
        databasevendorbrand: [],
        fieldsemantictypes: [],
        fieldsname : [],
        tablesname: [],
        fieldsispii: [],
        fieldsispci: [],
        fieldsshouldignore: [],
        fieldsdatatype: [],
        fieldgroupstypes: [],

        systemcode: [],
        originappcode: [],
        databasecode: [],
    };

    /**
     * 
     */
    componentDidMount()
    {
        this._cfg.map(e => this._loadAggToState(e.statePropName, e.collectionName, e.fieldName, e.limit));
    }

    /**
     * 
     * @param statePropName 
     * @param collectionName 
     * @param fieldName 
     * @param limit 
     */
    protected _loadAggToState(statePropName : string = '', collectionName : string = '', fieldName : string = '', limit : number = 50)
    {
        let o = {};
        Schemadata.getAggregationCustom(collectionName, fieldName, limit).then(d => { 
            o[statePropName] = d.data ? d.data : []; 
            this.setState(o); 
        });
    }

    /**
     * 
     */
    render()
    {
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                {this._cfg.map(e => (<div style={{ display: 'flexContainer', padding: 15}}><h3>{e.title}</h3>
                { this.state[e.statePropName].length > 0 ? 
                <SimpleGrid data={this.state[e.statePropName]} /> : <Spinner />
                }
                </div>))}
            </div>
        );
    }

}

export default AggregationsScreen;
