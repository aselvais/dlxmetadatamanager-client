import React, { Component } from "react";
import { Spinner, Button, Intent, Icon } from "@blueprintjs/core";
import Translator from "../libs/translate/Translator";
import AbstractModel from "../models/orm/AbstractModel";
import { observer } from "mobx-react";
import { gridConfig } from "../models/interfaces";
import * as mobx from 'mobx';

interface Props {
    model: AbstractModel,
    config?: gridConfig,
    parent?: object
}

/**
 * 
 */
@observer
class Grid extends Component<Props> {
    
    /**
     * Actions to icons 'translation'
     */
    protected actions2icons = {
        'view' : {icon: 'search', intent: Intent.NONE},
        'edit' : {icon: 'edit', intent: Intent.WARNING},
        'delete' : {icon: 'delete', intent: Intent.DANGER},
        'drilldown' : {icon: 'arrow-right', intent: Intent.PRIMARY}
    };
    /**
     * Icons names for types
     */
    private types2icons = {
        "CHAR": "list",
        "TIMESTAMP(0)": "calendar",
        "BINARY_DOUBLE": "numerical",
        "FLOAT": "numerical",
        "TIMESTAMP(6)": "calendar",
        "LONG": "list",
        "NVARCHAR2": "list",
        "DATE": "calendar",
        "text": "list",
        "datetime": "calendar",
        "VARCHAR2": "list",
        "NCHAR": "list",
        "NUMBER": "numerical",
        "TIMESTAMP(3)": "calendar",
        "timestamp": "calendar",
        "varchar": "list",
        "int": "numerical",
        "double": "numerical",
        "CLOB": "layout-grid",
        "float": "numerical",
        "bigint": "numerical",
    };
    private simpletypes2intent = {
        "numerical" : "#FFFFFF",
        "calendar" : "#48AFF0",
        "list" : "#394B59",
        "layout-grid" : "#FFC940"
    };

    /**
     * Returns a cell for the header
     */
    getHeaderCellJsx(k, i)
    {
        let v = '';
        switch(k) {
            case 'should_ignore':
                v = '';
                break;
            default:
                v = Translator.t(k);
                break;
        }
        return (<th key={k}>{v}</th>);
    }

    /**
     * Returns a cell for the body
     * 
     * @param k 
     * @param v 
     * @param row 
     */
    getBodyCellJsx(k , v, row)
    {
        switch(k) {
            case 'should_ignore':
                return (<td key={k} style={{ width: 40, textAlign: 'center'}}>{
                    v ? 
                    <Icon icon="full-circle" intent="danger" iconSize={12} /> : 
                    <Icon icon="full-circle" intent="success" iconSize={12} />
                }</td>);
            case 'datatype':
                    return (<td key={k} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 300}}>{
                        this.getIconDataTypeJsx(v)
                    }{v}</td>);
            case 'name':
                return this.getNameCellJsx(k, v, row);
            default:
                return (<td key={k} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 300}}>{v}</td>);
        }
    }

    /**
     * 
     * @param k 
     * @param v 
     */
    getNameCellJsx(k, v, row)
    {
        let iii = [];
        let icons = null;
        let isize : number = 15;
        let iintent : 'warning' = 'warning';
        
        if (row['is_pii']) iii.push(<Icon icon={'user'} iconSize={isize} intent={iintent} style={{paddingRight: 10}} />);
        if (row['is_pci']) iii.push(<Icon icon={'credit-card'} iconSize={isize} intent={iintent} style={{paddingRight: 10}} />);
        if (row['is_fk']) iii.push(<Icon icon={'link'} iconSize={isize} intent={iintent} style={{paddingRight: 10}} />);
        if (row['is_pk']) iii.push(<Icon icon={'key'} iconSize={isize} intent={iintent} style={{paddingRight: 10}} />);

        icons = (<div style={{float: 'right'}}>{iii}</div>);
        return (
        <td key={k} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 300}}>
            <div style={{float: 'left'}}>
                {v}
            </div>
            {icons}
        </td>
        );
    }

    /**
     * 
     * @param v 
     */
    getIconDataTypeJsx(v)
    {
        let i = this.types2icons[v] ? this.types2icons[v] : 'help';
        //@ts-ignore
        return (<Icon icon={i} iconSize={15} style={{paddingRight: 10, color: this.simpletypes2intent[i]}} />);
    }

    /**
     * 
     */
    getHeaderJsx()
    {
        let zearr = Object.keys(this.props.model.collection[0]);
        if (this.props.config && this.props.config.showOnly && this.props.config.showOnly.length > 0)
        {
            zearr = this.props.config.showOnly;
        }
        let jsx = zearr.map( (k : string, i : number) => this.getHeaderCellJsx(k, i) );
        if (this.props.config && this.props.config.actions && this.props.config.actions.length > 0)
        {
            jsx.push(<th key={'actions'}>{Translator.t('actions')}</th>);
        }
        return (<tr><th style={{ width: 55}}>#</th>{jsx}</tr>);
    }

    /**
     * 
     */
    getBodyJsx()
    {
        let rows = this.props.model.collection.map((e, i : number) => {
            let zearr = Object.keys(e);
            if (this.props.config && this.props.config.showOnly && this.props.config.showOnly.length > 0) 
            {
                zearr = this.props.config.showOnly;
            }
            let jsx = zearr.map( (k : string, i : number) => this.getBodyCellJsx(k, e[k], e));
            if (this.props.config && this.props.config.actions && this.props.config.actions.length > 0)
            {
                let l = this.props.config.actions.length;
                jsx.push(<td style={{ textAlign: 'right', width: l*40}}>{
                    this.props.config.actions.map(a => <Button 
                        // @ts-ignore
                        icon={this.actions2icons[a].icon}
                        intent={this.actions2icons[a].intent} 
                        style={{ marginRight: 5 }} 
                        onClick={() => this.onClickActionButton(a, e) } />)
                }</td>);
            }
            return (<tr key={i}><td>{i+1}</td>{jsx}</tr>);
        });
        return rows;
    }

    /**
     * 
     * @param actionName 
     * @param rowId 
     */
    onClickActionButton(actionName : string = '', row : object = {})
    {
        if (this.props.parent && this.props.parent[actionName] && typeof this.props.parent[actionName] === 'function')
        {
            this.props.parent[actionName](mobx.toJS(row));
        }
    }

    /**
     * 
     */
    render() {
        let jsx = [];
        if (this.props.model.loading) {
            jsx.push(
            <div className="docs-page" style={{ backgroundColor: 'rgba(0,0,0,.1)', width: '100%', height: '100%', position: 'fixed', top: 0, left: 0}}>
                <div style={{ width: '100%', padding: 200, position: 'fixed', margin: 'auto'}}><Spinner /></div>
            </div>
            );
        } //else {
            if (this.props.model.collection != null && this.props.model.collection.length > 0) 
            {
                jsx.push(
                    <div>
                        <table style={{ width: '100%'}} className="bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-html-table-striped bp3-small bp3-interactive">
                            <thead>{this.getHeaderJsx()}</thead>
                            <tbody>{this.getBodyJsx()}</tbody>
                        </table>
                    </div>
                );
            }
        //}
        return jsx;
    }

}

export default Grid;
