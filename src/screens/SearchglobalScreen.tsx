import React, { Component } from "react";
import { observer } from "mobx-react";
import { Icon } from "@blueprintjs/core";
import Origins from "../models/orm/Origins";
import Databases from "../models/orm/Databases";
import Schemas from "../models/orm/Schemas";
import Tables from "../models/orm/Tables";
import Fields from "../models/orm/Fields";
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
                    <SimpleGridSearch model={Origins} columns={['should_ignore','name','app_code','business_contact']}/>
                </div>

                <h2 style={{ marginBottom: 0, fontWeight: 'normal' }}> <Icon icon='diagram-tree' iconSize={25} style={{ paddingRight: 10 }}  /> Schemas search result</h2>
                <div style={{ padding: 20 }}>
                    <SimpleGridSearch model={Schemas} columns={['should_ignore','name','fullname','storageengine','vendorbrand']} />
                </div>

                <h2 style={{ marginBottom: 0, fontWeight: 'normal' }}> <Icon icon='database' iconSize={25} style={{ paddingRight: 10 }}  /> Databases search result</h2>
                <div style={{ padding: 20 }}>
                    <SimpleGridSearch model={Databases} columns={['should_ignore','name','fullname']} />
                </div>

                <h2 style={{ marginBottom: 0, fontWeight: 'normal' }}> <Icon icon='th' iconSize={25} style={{ paddingRight: 10 }}  /> Tables search result</h2>
                <div style={{ padding: 20 }}>
                    <SimpleGridSearch model={Tables} columns={['should_ignore','name','fullname','landing_destination']} />
                </div>

                <h2 style={{ marginBottom: 0, fontWeight: 'normal' }}> <Icon icon='list' iconSize={25} style={{ paddingRight: 10 }}  /> Fields search result</h2>
                <div style={{ padding: 20 }}>
                    <SimpleGridSearch model={Fields} columns={['should_ignore','name','fullname','datatype','datalength','charset','is_pii','is_pci','is_cdc_field','is_pk','is_fk']} />
                </div>

            </div>
        );
    }

}

export default SearchglobalScreen;
