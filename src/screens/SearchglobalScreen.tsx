import React, { Component } from "react";
import { observer } from "mobx-react";
import { Icon } from "@blueprintjs/core";
import Searchglobal from "../models/orm/Searchglobal";
import Origins from "../models/orm/Origins";
import Databases from "../models/orm/Databases";
import Schemas from "../models/orm/Schemas";
import Tables from "../models/orm/Tables";
import Fields from "../models/orm/Fields";
import SimpleGrid from "../components/SimpleGrid";

/**
 * 
 */
@observer
class SearchglobalScreen extends Component
{

    /**
     * 
     */
    render()
    {
        return (
            <div style={{ padding: 20}}>
                
                <h3> <Icon icon='locate' /> Origins search result</h3>
                <div>
                    <SimpleGrid data={Origins.collection} />
                </div>

                <h3> <Icon icon='database' /> Databases search result</h3>
                <div>
                    <SimpleGrid data={Databases.collection} />
                </div>

                <h3> <Icon icon='diagram-tree' /> Schemas search result</h3>
                <div>
                    <SimpleGrid data={Schemas.collection} />
                </div>

                <h3> <Icon icon='th' /> Tables search result</h3>
                <div>
                    <SimpleGrid data={Tables.collection} />
                </div>

                <h3> <Icon icon='list' /> Fields search result</h3>
                <div>{ JSON.stringify(Fields.collection) }</div>

            </div>
        );
    }

}

export default SearchglobalScreen;
