import React, { Component } from "react";
import Schemadata from "../models/orm/Schemadata";
import { observer } from "mobx-react";
import { Spinner } from "@blueprintjs/core";
import SimpleGrid from "./SimpleGrid";

/**
 * 
 */
@observer
class Reportschema extends Component
{

    /**
     * 
     * @param o 
     */
    getDatacolumnviewJSX()
    {
        let {datacolumnview} = Schemadata.datapipelinetablesvalidity;
        return (
            <div>
                <h3>Data column view</h3>
                <SimpleGrid data={datacolumnview} includeOnlyClmns={[
                    'tablename',
                    'schemaname',
                    'fields_length',
                    'to_lower_sum',
                    'is_cdc_field_sum',
                    'should_ignore_sum',
                    'is_gdpr_sum',
                    'is_pii_sum',
                    'is_pci_sum',
                    'is_pk_sum',
                    'is_fk_sum',
                    'group_sum',
                    'semantic_type_sum',
                    'documentation_sum']} 
                />
            </div>
        );
    }

    /**
     * 
     * @param o 
     */
    getReportJSX()
    {
        let {report} = Schemadata.datapipelinetablesvalidity;
        return (
            <div>
                <h3>Report</h3>
                <SimpleGrid data={[report]} />
            </div>
        );
    }

    /**
     * 
     * @param o 
     */
    getTableaggregationJSX()
    {
        let {tableaggregation} = Schemadata.datapipelinetablesvalidity;
        return (
            <div>
                <h3>Table Aggregation</h3>
                <SimpleGrid data={[tableaggregation]} />
            </div>
        );
    }

    /**
     * 
     */
    render()
    {
        if (!Schemadata.datapipelinetablesvalidity)
        {
            return (
                <div style={{padding: 20}}>
                    <Spinner />
                </div>
            );
        } else {
            return (
                <div style={{padding: 20, margin: 20, overflow: 'auto'}}>
                    {this.getReportJSX()}
                    {this.getTableaggregationJSX()}
                    {this.getDatacolumnviewJSX()}
                </div>
            );    
        }
    }
}

export default Reportschema;