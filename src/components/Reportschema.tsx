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
                    'fields_length',
                    'to_lower_sum',
                    'is_cdc_field_sum',
                    'is_gdpr_sum',
                    'is_pii_sum',
                    'is_pci_sum',
                    'is_phi_sum',
                    'is_pk_sum',
                    'is_fk_sum',
                    'has_index_sum',
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
                <SimpleGrid 
                        data={[report]} 
                        includeOnlyClmns={['has_cdc_for_each_table', 'has_pk_for_each_table']}
                        formatter={{'has_cdc_for_each_table': 'booleanled','has_pk_for_each_table': 'booleanled'}} />
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
        // preprocessing
        tableaggregation.documentation_sum = (tableaggregation.documentation_sum/tableaggregation.fields_length)*100;
        tableaggregation.to_lower_sum = (tableaggregation.to_lower_sum/tableaggregation.fields_length)*100;
        tableaggregation.is_gdpr_sum = (tableaggregation.is_gdpr_sum/tableaggregation.fields_length)*100;
        tableaggregation.is_pii_sum = (tableaggregation.is_pii_sum/tableaggregation.fields_length)*100;
        tableaggregation.is_pci_sum = (tableaggregation.is_pci_sum/tableaggregation.fields_length)*100;
        tableaggregation.is_phi_sum = (tableaggregation.is_phi_sum/tableaggregation.fields_length)*100;
        tableaggregation.is_fk_sum = (tableaggregation.is_fk_sum/tableaggregation.fields_length)*100;
        tableaggregation.is_pk_sum = (tableaggregation.is_pk_sum/tableaggregation.tables_length)*100;
        tableaggregation.is_cdc_field_sum = (tableaggregation.is_cdc_field_sum/tableaggregation.tables_length)*100;
        
        return (
            <div>
                <h3>Tables Aggregation</h3>
                <SimpleGrid data={[tableaggregation]} 
                    formatter={{
                        'documentation_sum': 'precent',
                        'is_pk_sum': 'precent',
                        'is_cdc_field_sum': 'precent',
                        'to_lower_sum': 'precent',
                        'is_gdpr_sum': 'precent',
                        'is_pii_sum': 'precent',
                        'is_pci_sum': 'precent',
                        'is_phi_sum': 'precent',
                        'is_fk_sum': 'precent',
                    }}
                    includeOnlyClmns={[
                        'tables_length',
                        'is_cdc_field_sum',
                        'fields_length',
                        'to_lower_sum',
                        'is_gdpr_sum',
                        'is_pii_sum',
                        'is_pci_sum',
                        'is_phi_sum',
                        'is_pk_sum',
                        'is_fk_sum',
                        'has_index_sum',
                        'group_sum',
                        'semantic_type_sum',
                        'documentation_sum'
                    ]}
                />
            </div>
        );
    }

    /**
     * 
     * @param o 
     */
    getTabletableshumanreadableJSX()
    {
        let {tableshumanreadable} = Schemadata.datapipelinetablesvalidity;
        return (
            <div>
                <h3>Tables human readable</h3>
                <SimpleGrid data={tableshumanreadable} 
                    includeOnlyClmns={[
                        'name',
                        'fields_length',
                        'to_lower_sum',
                        'documentation_sum',
                        'is_cdc_field_sum',
                        'is_pk_sum',
                        'has_index_sum'
                    ]}
                    formatter={{
                        'to_lower_sum': 'precent',
                        'documentation_sum': 'precent',
                        'is_cdc_field_sum': 'booleanled',
                        'is_pk_sum': 'booleanled',
                        'has_index_sum': 'booleanled'
                    }}
                />
            </div>
        );
    }

    /**
     * 
     */
    render()
    {
        if (!Schemadata.datapipelinetablesvalidity) {
            return (<div style={{padding: 20}}><Spinner /></div>);
        } else {
            return (
                <div style={{padding: 20, margin: 20, overflow: 'auto'}}>
                    {this.getReportJSX()}
                    {this.getTableaggregationJSX()}
                    {this.getTabletableshumanreadableJSX()}
                    {this.getDatacolumnviewJSX()}
                </div>
            );
        }
    }
}

export default Reportschema;
