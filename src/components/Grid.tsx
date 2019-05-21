import React, { Component } from "react";
import { Spinner, Button } from "@blueprintjs/core";
import Translator from "../libs/translate/Translator";
import AbstractModel from "../models/AbstractModel";
import { observer } from "mobx-react";
import { gridConfig } from "../models/interfaces";


interface Props {
    model: AbstractModel,
    config?: gridConfig
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
        'view' : 'search',
        'edit' : 'edit',
        'delete' : 'delete',
        'drilldown' : 'arrow-right'
    };

    /**
     * 
     * @param row 
     */
    selectRow(row : object = {})
    {
        // Schemadata.document = row;
        // this.handleOpen();
    }

    /**
     * 
     */
    getHeaderJsx()
    {
        let jsx = Object.keys(this.props.model.collection[0]).map( 
            (k : string, i : number) => {
                if (this.props.config && this.props.config.showOnly && this.props.config.showOnly.length > 0)
                {
                    if (this.props.config.showOnly.indexOf(k) > -1) 
                    {
                        return (<th key={k}>{Translator.t(k)}</th>);
                    }
                    else 
                    {
                        return null;
                    }
                } else {
                    return (<th key={k}>{Translator.t(k)}</th>);
                }
            }
        );
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
            let jsx = Object.keys(e).map( (k : string, i : number) => {
                if (this.props.config && this.props.config.showOnly && this.props.config.showOnly.length > 0)
                {
                    if (this.props.config.showOnly.indexOf(k) > -1) 
                    { 
                        return (<td key={k}>{e[k]}</td>); 
                    } else {
                        return null;
                    }
                } else {
                    return (<td key={k}>{e[k]}</td>);
                }
            });
            if (this.props.config && this.props.config.actions && this.props.config.actions.length > 0)
            {
                // @ts-ignore
                jsx.push(<td>{this.props.config.actions.map(a => <Button icon={this.actions2icons[a]} style={{ marginRight: 5 }} />)}</td>);
            }
            return (<tr key={i} onClick={() => this.selectRow(e)}>{jsx}</tr>);
        });
        return rows;
    }

    /**
     * 
     */
    render() {
        let jsx = [];
        if (!this.props.model.collection || this.props.model.collection.length === 0) {
            jsx.push(<div style={{ textAlign: 'center', padding: 30}}><Spinner /></div>);
        } else {
            if (this.props.model.collection != null && this.props.model.collection.length > 0) 
            {
                jsx.push(
                    <div>
                        <table className="bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-html-table-striped bp3-small bp3-interactive">
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
