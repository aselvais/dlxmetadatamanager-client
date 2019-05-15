import React, { Component } from "react";
import Schemadata from "../models/Schemadata";
import { observer } from 'mobx-react';

/**
 * Home screen
 */
@observer
class HomeScreen extends Component
{

    /**
     * 
     */
    componentDidMount()
    {
        Schemadata.findOneById('5cd9bf7fa7aa340bb626b0e1');
    }

    /**
     * 
     */
    public render()
    {
        return Schemadata.loading ? (<div>Loading ...</div>) : (
            <div>
                {
                    Object.keys(Schemadata.document).map( 
                        (k : string) => <div><b>{k}</b> "{Schemadata.document[k]}" </div> 
                    )
                }
            </div>
        );

    }
}

export default HomeScreen;
