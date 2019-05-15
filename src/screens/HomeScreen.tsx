import React, { Component } from "react";
import Schemadata from "../models/Schemadata";
import { observer } from 'mobx-react';
import { Button, InputGroup } from "@blueprintjs/core";

const CHOICES = [
    "customers"
    ,"T439450_ECHECKS_MEDPAY_CHK_LBX"
    ,"NEW_BUYER_ROR_CHECK_QTY_WK31"
    ,"ECHECK_PAYEE_WEEKLY_EMAILS"
    ,"ALL_WM_VERSIONED_TABLES"
    ,"T439450_ECHECKS_PROFILE_1501"
    ,"WM_EVENTS_INFO"
    ,"MDL311_P1WK201904_T444874"
    ,"T87334_BB_YTD_PHONE2"
    ,"T435136_P1WK09_PROSPECT_MODEL"
    ,"T91455_NEWBUYERS1"
    ,"T87334_ROR_GAP2014"
    ,"T87334_FIFTH_THIRD"
    ,"CM_OPTOUT_DELFORMS"
    ,"T87334_BB_HYBRID_CAT2"
    ,"MDL351_BBCROSSSELL_T435136"
    ,"T87334_PROSPECT_MAIL_VOLUME"
    ,"PROD_ID_FISC_WK_SUM"
    ,"EMAIL_VEND_DONT_CNTCT_RSN"
    ,"T435136_CONTRACTOR_PROS_MODEL"
    ,"T435136_BBP1WK30_2015_MODEL"
    ,"T428738_CANADA_P1_WK201545"
    ,"T439450_MANAGED_ACCOUNTS_IHBI"
    ,"T437528_C086_LTV"
    ,"TMP_NLSCUST_DELAFT"
    ,"WK_VEND_CUST_EXTRACT_STG"
    ,"PSPRINT_TOPSHOPPER_20180719"
    ,"AUDIT_DASHDB_ORDER"
    ,"T444363_LOGO_BUYER_MODEL_353"
    ,"CA_EM_FOLLOWUP_TO_DM"
    ,"NEW_BUYER_SUPPRS_6WK_CDR"
    ,"T435136_P1WK2016_27_PROS_MODEL"
    ,"DFS203_CGI"
    ,"T439450_ECHECKS_MEDPAY_3_1G"
    ,"T439450_2015PMDASH"
    ,"T200441_INK1D_FINANCE"
    ,"T435136_P1WK2115_21_PROS_MODEL"
    ,"PMERR_MSG"
    ,"T436789_BRAND128_ONLY_DETAIL"
    ,"UPDATE_SUPPRESSIONS_EM_CORE"
    ,"MDL311_P1WK201834_T428738"
    ,"T428738_CANADA_P1_WK201805"
    ,"EMPLOYEE"
    ,"CHQ_BYRS_FOR_ECHECKS_OB"
    ,"T122848_NEWBUYER_MONTHLY"
    ,"NB_NO_CONTACT"
    ,"WK_BI_BOOKED_REQUEST_DETL_STG"
    ,"WK_BI_CUST_COMBINED_STG"
    ,"DFS_US_AFFILIATION_CODE"
    ,"SP_12MO_CLICK"
    ,"T439450_SKUREPORT_EC_2018"
].sort();
/**
 * Home screen
 */
@observer
class HomeScreen extends Component
{
    state = {tableName: 'customers'};

    /**
     * 
     */
    loadData() : void
    {
        // Schemadata.findOneById('5cd9bf7fa7aa340bb626b0e1');
        // Schemadata.findOneById('5cd9bf89a7aa340bb626b1e1');        
        Schemadata.getTableMetaData(this.state.tableName);
    }

    /**
     * 
     */
    public render()
    {
        let jsx = [];


        jsx.push(<div className="bp3-select">
            <select onChange={e => this.setState({tableName: e.target.value}, () =>this.loadData() )}>
                {CHOICES.map(k => <option value={k}>{k}</option>)}
            </select>
        </div>);
        // jsx.push(<div><InputGroup onChange={e => this.setState({tableName: e.target.value}) } value={this.state.tableName} /></div>);
        // jsx.push(<div><Button icon="refresh" onClick={() => this.loadData() } >Refresh</Button></div>);
        if (Schemadata.loading) {
            jsx.push(<div>Loading ...</div>);
        } else {
            if (Schemadata.document != null) 
            {
                jsx.push(<div>{Object.keys(Schemadata.document).map( (k : string) => <div><b>{k}</b> "{Schemadata.document[k]}" </div> )}</div>);
            }
            if (Schemadata.collection != null && Schemadata.collection.length > 0) 
            {
                let header = (<tr>{Object.keys(Schemadata.collection[0]).map( (k : string) => <th>{k}</th> )}</tr>);
                let rows = Schemadata.collection.map(e => <tr>{Object.keys(e).map( (k : string) => <td>{e[k]}</td> )}</tr>);
                jsx.push(
                    <table className="bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-html-table-striped bp3-small bp3-interactive">
                        <thead>
                            {header}
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                );
            }
        }
        return jsx;
    }
}

export default HomeScreen;
