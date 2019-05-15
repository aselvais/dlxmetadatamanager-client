import React, { Component } from "react";
import Schemadata from "../models/Schemadata";
import { observer } from 'mobx-react';
//import { Button, InputGroup } from "@blueprintjs/core";

/**
 * Home screen
 */
@observer
class HomeScreen extends Component
{
    state = {tableName: 'customers'};

    /**
     * Load some data when the components are available
     */
    public componentDidMount()
    {
        Schemadata.aggregate('TABLE_NAME');
        Schemadata.aggregate('TABLE_SCHEMA');
        Schemadata.aggregate('OWNER');
        Schemadata.aggregate('DATA_TYPE');
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
     */
    public render()
    {
        let jsx = [];
        
        jsx.push(<div><div>TABLE_SCHEMA : </div><div className="bp3-select">
            <select>{Schemadata.getAggregationLabels('TABLE_SCHEMA').map(k => <option key={k} value={k}>{k}</option>)}
            </select></div></div>);
        jsx.push(<div><div>OWNER : </div><div className="bp3-select">
        <select>{Schemadata.getAggregationLabels('OWNER').map(k => <option key={k} value={k}>{k}</option>)}
        </select></div></div>);
        jsx.push(<div><div>DATA_TYPE : </div><div className="bp3-select">
        <select>{Schemadata.getAggregationLabels('DATA_TYPE').map(k => <option key={k} value={k}>{k}</option>)}
        </select></div></div>);

        jsx.push(<div><div>TABLE_NAME : </div><div className="bp3-select">
            <select onChange={e => this.setState({tableName: e.target.value}, () =>this.loadData() )}>
                {Schemadata.getAggregationLabels('TABLE_NAME').map(k => <option key={k} value={k}>{k}</option>)}
            </select></div></div>);

        // jsx.push(<div><InputGroup onChange={e => this.setState({tableName: e.target.value}) } value={this.state.tableName} /></div>);
        // jsx.push(<div><Button icon="refresh" onClick={() => this.loadData() } >Refresh</Button></div>);
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
