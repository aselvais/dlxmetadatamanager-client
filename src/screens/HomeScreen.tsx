import React, { Component } from "react";
import Schemadata from "../models/orm/Schemadata";
import { observer } from 'mobx-react';
import { ControlGroup, Spinner, Dialog } from "@blueprintjs/core";
import Translator from "../libs/translate/Translator";
import { schemadataSchema } from "../models/interfaces";
import FieldeditionForm from "../components/FieldeditionForm";

/**
 * Home screen
 */
@observer
class HomeScreen extends Component
{
    public state = {
        autoFocus: true,
        canEscapeKeyClose: true,
        canOutsideClickClose: true,
        enforceFocus: true,
        isOpen: false,
        usePortal: true,
        tableName: 'customers'
    };
    aggrFields : Array<string> = ['TABLE_SCHEMA', 'OWNER', 'DATA_TYPE'];

    /**
     * 
     */
    protected loadData() : void
    {
        Schemadata.getTableMetaData(this.state.tableName);
    }

    /**
     * 
     * @param onField 
     */
    getDropDownJSX(onField : string = '')
    {
        return(
            <div key={onField}>
                <div>{onField} : </div>
                <div className="bp3-select">
                    <select>{
                        Schemadata.getAggregationLabels(onField).map(k => <option key={k} value={k}>{k}</option>)
                    }</select>
                </div>
            </div>
        );
    }

    /**
     * 
     * @param tablename 
     */
    isTableNameSelected(tablename:string='') : boolean
    {
        if (Schemadata.collection && Schemadata.collection.length > 0)
        {
            return (Schemadata.collection[0]['TABLE_NAME'] === tablename);
        }
        return false;
    }

    /**
     * 
     * @param row 
     */
    selectRow(row : schemadataSchema = {})
    {
        Schemadata.document = row;
        this.setState({ isOpen: true });
    }

    /**
     * 
     */
    public render(): any[]
    {
        let jsx = [];
        let formsJsx = [];
        this.aggrFields.map( e => formsJsx.push(this.getDropDownJSX(e)) );

        formsJsx.push(
            <div key={'TABLE_NAME'}><div>TABLE_NAME : </div><div className="bp3-select">
            <select onChange={e => this.setState({tableName: e.target.value}, () =>this.loadData() )}>
                {Schemadata.getAggregationLabels('TABLE_NAME').map(k => <option key={k} value={k} /*selected={this.isTableNameSelected(k)}*/>{k}</option>)}
            </select></div></div>
        );

        jsx.push(<ControlGroup style={{paddingBottom: 15}} fill={false} vertical={false}>{formsJsx}</ControlGroup>);

        if (Schemadata.loading) {
            jsx.push(<div style={{ textAlign: 'center', padding: 30}}><Spinner /></div>);
        } else {
            if (Schemadata.collection != null && Schemadata.collection.length > 0) 
            {
                let header = (<tr>{Object.keys(Schemadata.collection[0]).map( (k : string) => <th key={k}>{Translator.t(k)}</th> )}</tr>);
                let rows = Schemadata.collection.map((e, i) => <tr key={i} onClick={() => this.selectRow(e)}>{Object.keys(e).map( (k : string) => <td key={k}>{e[k]}</td> )}</tr>);
                jsx.push(
                    <div>
                        <table className="bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-html-table-striped bp3-small bp3-interactive">
                            <thead>{header}</thead>
                            <tbody>{rows}</tbody>
                        </table>
                        <Dialog icon="info-sign" onClose={() => this.setState({ isOpen: false })} title="Field edition" {...this.state}>
                            <FieldeditionForm model={Schemadata} />
                        </Dialog>
                    </div>
                );
            }
        }
        return jsx;
    }
}

export default HomeScreen;
