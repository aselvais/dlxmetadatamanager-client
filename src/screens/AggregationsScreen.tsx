import React, { Component } from "react";
import Users from "../models/orm/Users";
import { observer } from "mobx-react";
import { Spinner } from "@blueprintjs/core";
import Schemadata from "../models/orm/Schemadata";

/**
 * 
 */
@observer
class AggregationsScreen extends Component
{
    /**
     * 
     */
    componentDidMount()
    {
        Schemadata.getAggregationCustom('fields', 'name', 100);
    }

    /**
     * 
     */
    render()
    {
        if (Users.loading) {
            return (<div style={{ textAlign: 'center', padding: 30}}><Spinner /></div>);
        } else {
            return (
                <div>
                        hjksdfghjgfhjdfghjk
                </div>
                );        
        }
    }

}

export default AggregationsScreen;
