// @ts-check
import React, { Component } from 'react';
import { Spinner, Button, Intent, Icon, Checkbox } from "@blueprintjs/core";
import AbstractModel from '../models/orm/AbstractModel';
import { observer } from 'mobx-react';
import Translator from '../libs/translate/Translator';
import NavStore from '../models/NavStore';
import Origins from '../models/orm/Origins';
import Databases from '../models/orm/Databases';
import Schemas from '../models/orm/Schemas';
import Tables from '../models/orm/Tables';
import Fields from '../models/orm/Fields';

interface Props {
    model: AbstractModel,
    columns: Array<string>
}

/**
 * 
 */
@observer
class SimpleGridSearch extends Component<Props>
{
    private _re = new RegExp('id|idh|_id|.*_id|.*_idh');

    /**
     * 
     */
    protected _onClickBulkEdit()
    {
        alert('HELLO!');
    }

    /**
     * 
     * @param _id 
     */
    protected _onClickSelect(_id='')
    {
        if (!this.props.model.selected_items[_id]) 
            this.props.model.selected_items[_id] = true;
        else
            delete this.props.model.selected_items[_id];
    }

    /**
     * 
     * @param row 
     */
    protected _handleClick(row)
    {
        Origins.pagination.searchstr = '';
        Databases.pagination.searchstr = '';
        Schemas.pagination.searchstr = '';
        Tables.pagination.searchstr = '';
        Fields.pagination.searchstr = '';

        // set params for search screen
        switch(this.props.model.name)
        {
            case 'origins':
                NavStore.items[2].level = 0;
                Origins.pagination.searchstr = row.name;
                break;
            case 'databases':
                NavStore.items[2].level = 1;
                Databases.pagination.searchstr = row.name;
                break;
            case 'schemas':
                NavStore.items[2].level = 2;
                Schemas.pagination.searchstr = row.name;
                break;
            case 'tables':
                NavStore.items[2].level = 3;
                Tables.pagination.searchstr = row.name;
                break;
            case 'fields':
                NavStore.items[2].level = 4;
                Fields.pagination.searchstr = row.name;
                break;
        }

        Origins.selected_parent_id = null;
        if (row.origins_idh) {
            Origins.document = { idh: row.origins_idh, name: row.origin_name };
            Databases.selected_parent_id = row.origins_idh;
        }
        if (row.databases_idh) {
            Databases.document = { idh: row.databases_idh, name: row.database_name };
            Schemas.selected_parent_id = row.databases_idh;
        }
        if (row.schemas_idh) {
            Schemas.document = { idh: row.schemas_idh, name: row.schema_name };
            Tables.selected_parent_id = row.schemas_idh;
        }
        if (row.tables_idh) {
            Tables.document = { idh: row.tables_idh, name: row.table_name };
            Fields.selected_parent_id = row.tables_idh;
        }
        // go to search screen
        NavStore.setActive('SearchScreen');
    }

    /**
     * 
     * @param {*} row 
     */
    getHeaderJsx()
    {
        let asc = this.props.model.sortparams.asc;
        return (
        <tr>
        <th style={{textAlign: 'center'}}>
            <Button icon="edit" intent={Intent.WARNING} style={{ marginRight: 5 }} onClick={() => this._onClickBulkEdit() } active={Object.keys(this.props.model.selected_items).length === 0 ? true : false} />
        </th>
            { this.props.columns.map( e => e.match(this._re) ? null : 
            <th className="cantselect" key={e} style={{cursor: 'pointer'}} onClick={() => this.props.model.sortLocalCollection(e, 'search')}>
                { 
                    (e === 'should_ignore') ? '' : Translator.t(e) 
                }{ (this.props.model.sortparams.columnName === e) ? (<div style={{ float: "right" }}><Icon icon={asc ? "sort-asc" : "sort-desc"} /></div>) : null }
            </th>)}
        <th></th>
        </tr>)
    }
    
    /**
     * Returns a cell for the body
     * @todo change that as it is a copy of what we find in Grid.tsx
     * 
     * @param k 
     * @param v 
     * @param row 
     */
    public getBodyCellJsx(k , v)
    {
        if (k === 'should_ignore' || k === 'is_pii' || k === 'is_gdpr' || k === 'is_pk' || k === 'is_fk' || k === 'is_cdc_field' || k === 'to_lower' || k === 'is_pci') 
        {
            let theintent = '';
            if ( k === 'should_ignore') theintent = (v === 1) ? 'danger' : 'success';
            else theintent = (v === 1) ? 'success' : 'danger';
            //@ts-ignore
            return (<td key={k} style={{ width: 40, textAlign: 'center'}}><Icon icon="full-circle" intent={theintent} iconSize={12} /></td>);
        }
        else {
            return <td>{v}</td>
        }
    }

    /**
     * 
     * @param {*} row 
     * @param {*} i 
     */
    getRowJsx(row, i)
    {
        return (
            <tr key={i}>
                <td style={{ textAlign: 'center'}}>
                    <Checkbox key={row._id} 
                        onChange={() => this._onClickSelect(row._id) } 
                        checked={(this.props.model.selected_items[row._id] && this.props.model.selected_items[row._id] === true) ? true : false} />
                </td>
                {this.props.columns.map(e => this.getBodyCellJsx(e, row[e]) )}
                <td style={{ textAlign: 'right'}} >
                    <Button icon='arrow-right' intent={Intent.PRIMARY} onClick={() => this._handleClick(row)}/>
                </td>
            </tr>
        );
    }

    /**
     * 
     */
    render()
    {
        if (this.props.model.loading === true) {
            return (<div><Spinner/></div>);
        } else if (this.props.model.findentitydata.length === 0) {
            return (<div style={{ color: '#AAA', paddingLeft: 40}}> <i>--- No result ... ---</i> </div>);
        } else {
            return (
                <div className="Grid">
                    <table style={{ width: '100%'}} className="bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-html-table-striped">
                        <thead className="thead-dark">
                            {this.props.columns ? this.getHeaderJsx() : null}
                        </thead>
                        <tbody>
                            {(this.props.model.findentitydata && this.props.model.findentitydata.map) ? this.props.model.findentitydata.map((row, i) => this.getRowJsx(row, i)) : null}
                        </tbody>
                     </table>
                </div>
            );
        }        
    }

}

export default SimpleGridSearch;
