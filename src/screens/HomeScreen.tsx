import React, { Component } from "react";
import Schemadata from "../models/Schemadata";
import { observer } from 'mobx-react';

/**
 * 
 */
@observer
class HomeScreen extends Component
{

    /**
     * 
     */
    componentDidMount()
    {
        Schemadata.fetchOne('5cd9bf7fa7aa340bb626b0e1');
    }

    /**
     * 
     */
    render()
    {

        return Schemadata.loading ? (<div>Loading ...</div>) : (
            <div>
                {Object.keys(Schemadata.entry).map( (k : string) => <div><b>{k}</b> "{Schemadata.entry[k]}" </div> )}

            </div>
        );

    }
}

export default HomeScreen;
