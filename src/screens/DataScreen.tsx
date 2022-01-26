import React, { Component } from "react";
import { observer } from 'mobx-react';
import SimpleGrid from "../components/SimpleGrid";
import Viewhivetables from "../models/orm/Viewhivetables";
import { Spinner } from "@blueprintjs/core";

/**
 * Home screen
 */
@observer
class DataScreen extends Component
{
    /*
    protected entityLevel : Array<'origin' | 'database' | 'schema' | 'table' | 'column'> = ['origin', 'database', 'schema', 'table', 'column'];
    componentDidMount() { Schemadata.getlatestrawschemadata(this.entityLevel[0]); }
    _clickButtonLevel(e) { Schemadata.getlatestrawschemadata(e); }
    public render() {
        return (<div><div style={{padding: 20}}><ButtonGroup>{this.entityLevel.map((e,i) => <Button onClick={() => this._clickButtonLevel(this.entityLevel[i])}>{e}</Button>)}</ButtonGroup></div>
            { Schemadata.loading ? <Spinner /> : <SimpleGrid data={Schemadata.latestrawschemadata}/> }</div>);
    }
    */

    private _lastEntries = 50;

    public componentDidMount() {
		Viewhivetables.init();
	}

    /**
     * 
     * @returns 
     */
    public render()
    {
        return (
        <div>
            <div>
                <h2>This is in development ... more coming soon...</h2>
                <h3>Lakes and tables in HIVE</h3>
                {
                    Viewhivetables.loading 
                    ? 
                        <Spinner />
                    : 
                        <SimpleGrid data={Viewhivetables.collection} includeOnlyClmns={["database", "table"]} />
                }
            </div>
        </div>);
    }


}

export default DataScreen;
