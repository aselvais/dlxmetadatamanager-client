import React, { Component } from "react";
import Schemadata from "../models/Schemadata";
import { observer } from 'mobx-react';

/**
 * Home screen
 */
@observer
class HomeScreen extends Component
{
    state = {tableName: 'customers'};
    aggrFields : Array<string> = ['TABLE_SCHEMA', 'OWNER', 'DATA_TYPE'];

    /**
     * Load some data when the components are available
     */
    public componentDidMount()
    {
        Schemadata.aggregate('TABLE_NAME');
        this.aggrFields.map(e => Schemadata.aggregate(e) );
    }

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
            <div>
                <div>{onField} : </div>
                <div className="bp3-select">
                    <select>{Schemadata.getAggregationLabels(onField).map(k => <option key={k} value={k}>{k}</option>)}</select>
                </div>
            </div>
        );
    }

    /**
     * 
     */
    public render(): any[]
    {
        let jsx = [];
        this.aggrFields.map( e => jsx.push(this.getDropDownJSX(e)) );

        jsx.push(
            <div><div>TABLE_NAME : </div><div className="bp3-select">
            <select onChange={e => this.setState({tableName: e.target.value}, () =>this.loadData() )}>
                {Schemadata.getAggregationLabels('TABLE_NAME').map(k => <option key={k} value={k}>{k}</option>)}
            </select></div></div>
        );
        if (Schemadata.loading) {
            jsx.push(<div>Loading ...</div>);
        } else {
            if (Schemadata.document != null) 
            {
                jsx.push(<div>{Object.keys(Schemadata.document).map( (k : string) => <div><b>{k}</b> "{Schemadata.document[k]}" </div> )}</div>);
            }
            if (Schemadata.collection != null && Schemadata.collection.length > 0) 
            {
                let header = (<tr>{Object.keys(Schemadata.collection[0]).map( (k : string) => <th key={k}>{k}</th> )}</tr>);
                let rows = Schemadata.collection.map(e => <tr>{Object.keys(e).map( (k : string) => <td>{e[k]}</td> )}</tr>);
                jsx.push(
                    <table className="bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-html-table-striped bp3-small bp3-interactive">
                        <thead>
                            {header}
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                );
            }
        }
        return jsx;
    }
}

export default HomeScreen;
