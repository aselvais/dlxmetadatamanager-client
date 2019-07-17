import React, { Component } from "react";
import { observer } from "mobx-react";
import { Icon } from "@blueprintjs/core";
import Searchglobal from "../models/orm/Searchglobal";

/**
 * 
 */
@observer
class SearchglobalScreen extends Component
{
    /**
     * 
     */
    componentDidMount()
    {
        // Users.findOneById(Users.document.id, true);
    }

    /**
     * 
     */
    render()
    {
        return (
            <div style={{ padding: 20}}>
                
                <h3> <Icon icon='locate' /> Origins search result</h3>
                <div>{ JSON.stringify(Searchglobal.originsResults) }</div>

                <h3> <Icon icon='database' /> Databases search result</h3>
                <div>{ JSON.stringify(Searchglobal.databasesResults) }</div>

                <h3> <Icon icon='diagram-tree' /> Schemas search result</h3>
                <div>{ JSON.stringify(Searchglobal.schemasResults) }</div>

                <h3> <Icon icon='th' /> Tables search result</h3>
                <div>{ JSON.stringify(Searchglobal.tablesResults) }</div>

                <h3> <Icon icon='list' /> Fields search result</h3>
                <div>{ JSON.stringify(Searchglobal.fieldsResults) }</div>

            </div>
        );
    }

}

export default SearchglobalScreen;
