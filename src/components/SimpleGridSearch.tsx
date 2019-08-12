// @ts-check
import React, { Component } from 'react';
import { Spinner, Button, Intent, Icon } from "@blueprintjs/core";
import AbstractModel from '../models/orm/AbstractModel';
import { observer } from 'mobx-react';
import Translator from '../libs/translate/Translator';

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
     * @param {*} row 
     */
    getHeaderJsx()
    {
        return (<tr>{ this.props.columns.map( e => e.match(this._re) ? null : <th key={e}>{ Translator.t(e) }</th>)} <th></th> </tr>)
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
        if (
            k === 'should_ignore' || 
            k === 'is_pii' || 
            k === 'is_gdpr' || 
            k === 'is_pk' || 
            k === 'is_fk' || 
            k === 'is_cdc_field' || 
            k === 'to_lower' || 
            k === 'is_pci'
            ) {
            return (<td key={k} style={{ width: 40, textAlign: 'center'}}>{
                v ? 
                <Icon icon="full-circle" intent="danger" iconSize={12} /> : 
                <Icon icon="full-circle" intent="success" iconSize={12} />
            }</td>);
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
        return (<tr key={i}>{this.props.columns.map(e => this.getBodyCellJsx(e, row[e]) )} <td style={{ textAlign: 'right'}} > <Button icon='arrow-right' intent={Intent.PRIMARY}/> </td> </tr>);
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
