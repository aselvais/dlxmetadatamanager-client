import React, { Component } from "react";
import { observer } from "mobx-react";
import AbstractModel from "../models/orm/AbstractModel";
import { gridConfig } from "../models/interfaces";
import f from '../libs/translate/oracle.json'; 

interface Props {
    model: AbstractModel,
    config?: gridConfig
}

/**
 * 
 */
@observer
class FieldviewForm extends Component<Props>
{

    /**
     * 
     * @param key 
     * @param val 
     */
    getLineJsx(key:string, val='')
    {
        return (
            <tr>
                <th>{key}</th>
                <td>{val}</td>
                <td>{(f[key] && f[key].Datatype) ? f[key].Datatype : '-'}</td>
                <td>{(f[key] && f[key].CanBeNull) ? f[key].CanBeNull : '-'}</td>
                <td>{(f[key] && f[key].Description) ? f[key].Description : '-'}</td>
            </tr>
        );
    }

    /**
     * 
     */
    render()
    {
        let {related} = this.props.model;
        if (!related) return null;
        return (
            <div style={{padding: 20, margin: 20}}>
                <h3>Detailed meta-data from source (schemadata)</h3>
                <table className="bp3-html-table bp3-html-table-striped bp3-html-table-condensed bp3-html-table-bordered">
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Value</th>
                        <th>Datatype</th>
                        <th>CanBeNull</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    { Object.keys(related).map(k => this.getLineJsx(k, related[k])) }
                </tbody>
                </table>

            </div>
        );    
    }

}


export default FieldviewForm;
