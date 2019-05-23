import React, { Component } from "react";
import { Spinner, Button, Intent } from "@blueprintjs/core";
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
     * 
     */
    getHeaderJsx()
    {
        let zearr = Object.keys(this.props.model.collection[0]);
        if (this.props.config && this.props.config.showOnly && this.props.config.showOnly.length > 0)
        {
            zearr = this.props.config.showOnly;
        }
        let jsx = zearr.map( (k : string, i : number) => <th key={k}>{Translator.t(k)}</th> );
        if (this.props.config && this.props.config.actions && this.props.config.actions.length > 0)
        {
            jsx.push(<th key={'actions'}>{Translator.t('actions')}</th>);
        }
        return (<tr>{jsx}</tr>);
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
            let jsx = zearr.map( (k : string, i : number) => {
                return (<td key={k} style={{
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    maxWidth: 300}}>{e[k]}</td>); 
            });
            if (this.props.config && this.props.config.actions && this.props.config.actions.length > 0)
            {
                jsx.push(<td style={{ textAlign: 'right'}}>{
                    this.props.config.actions.map(a => <Button 
                        // @ts-ignore
                        icon={this.actions2icons[a].icon}
                        intent={this.actions2icons[a].intent} 
                        style={{ marginRight: 5 }} 
                        onClick={() => this.onClickActionButton(a, e) } />)
                }</td>);
            }
            return (<tr key={i}>{jsx}</tr>);
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
            jsx.push(<div style={{ textAlign: 'center', padding: 30}}><Spinner /></div>);
        } else {
            if (this.props.model.collection != null && this.props.model.collection.length > 0) 
            {
                jsx.push(
                    <div>
                        <table style={{ minWidth: '50%'}} className="bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-html-table-striped bp3-small bp3-interactive">
                            <thead>{this.getHeaderJsx()}</thead>
                            <tbody>{this.getBodyJsx()}</tbody>
                        </table>
                    </div>
                );
            }
        }
        return jsx;
    }

}

export default Grid;
