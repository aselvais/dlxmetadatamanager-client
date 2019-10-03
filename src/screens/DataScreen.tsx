import React, { Component } from "react";
import Schemadata from "../models/orm/Schemadata";
import { observer } from 'mobx-react';
import SimpleGrid from "../components/SimpleGrid";
import { ButtonGroup, Button, Spinner } from "@blueprintjs/core";

/**
 * Home screen
 */
@observer
class DataScreen extends Component
{
    /**
     * 
     */
    protected entityLevel : Array<'origin' | 'database' | 'schema' | 'table' | 'column'> = ['origin', 'database', 'schema', 'table', 'column'];

    /**
     * 
     */
    componentDidMount()
    {
        Schemadata.getlatestrawschemadata(this.entityLevel[0]);
    }

    /**
     * 
     * @param e 
     */
    _clickButtonLevel(e)
    {
        Schemadata.getlatestrawschemadata(e);
    }
    
    /**
     * 
     */
    public render()
    {
        return (
            <div>
                <div style={{padding: 20}}>
                    <ButtonGroup>
                        {this.entityLevel.map((e,i) => <Button onClick={() => this._clickButtonLevel(this.entityLevel[i])}>{e}</Button>)}
                    </ButtonGroup>
                </div>
                { Schemadata.loading ? <Spinner /> : <SimpleGrid data={Schemadata.latestrawschemadata}/> }
            </div>
        );
    }
}

export default DataScreen;
