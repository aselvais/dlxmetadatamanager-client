import React, { Component } from "react";
import { observer } from "mobx-react";
import { Icon } from "@blueprintjs/core";
import Origins from "../models/orm/Origins";
import Databases from "../models/orm/Databases";
import Schemas from "../models/orm/Schemas";
import Tables from "../models/orm/Tables";
import Fields from "../models/orm/Fields";
import SimpleGrid from "../components/SimpleGrid";
import SimpleGridSearch from "../components/SimpleGridSearch";

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
                
                <h2 style={{ marginBottom: 0, fontWeight: 'normal' }}> <Icon icon='locate' iconSize={25} style={{ paddingRight: 10 }} /> Origins search result</h2>
                <div style={{ padding: 20 }}>
                    <SimpleGridSearch model={Origins} />
                </div>

                <h2 style={{ marginBottom: 0, fontWeight: 'normal' }}> <Icon icon='database' iconSize={25} style={{ paddingRight: 10 }}  /> Databases search result</h2>
                <div style={{ padding: 20 }}>
                    <SimpleGridSearch model={Databases} />
                </div>

                <h2 style={{ marginBottom: 0, fontWeight: 'normal' }}> <Icon icon='diagram-tree' iconSize={25} style={{ paddingRight: 10 }}  /> Schemas search result</h2>
                <div style={{ padding: 20 }}>
                    <SimpleGridSearch model={Schemas} />
                </div>

                <h2 style={{ marginBottom: 0, fontWeight: 'normal' }}> <Icon icon='th' iconSize={25} style={{ paddingRight: 10 }}  /> Tables search result</h2>
                <div style={{ padding: 20 }}>
                    <SimpleGridSearch model={Tables} />
                </div>

                <h2 style={{ marginBottom: 0, fontWeight: 'normal' }}> <Icon icon='list' iconSize={25} style={{ paddingRight: 10 }}  /> Fields search result</h2>
                <div style={{ padding: 20 }}>
                    <SimpleGridSearch model={Fields} />
                </div>

            </div>
        );
    }

}

export default SearchglobalScreen;
