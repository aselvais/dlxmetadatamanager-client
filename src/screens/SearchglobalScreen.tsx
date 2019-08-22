import React, { Component } from "react";
import { observer } from "mobx-react";
import { Icon, Tag, Spinner, Label } from "@blueprintjs/core";
import Origins from "../models/orm/Origins";
import Databases from "../models/orm/Databases";
import Schemas from "../models/orm/Schemas";
import Tables from "../models/orm/Tables";
import Fields from "../models/orm/Fields";
import SimpleGridSearch from "../components/SimpleGridSearch";
import { INTENT_PRIMARY } from "@blueprintjs/core/lib/esm/common/classes";

/**
 * 
 */
@observer
class SearchglobalScreen extends Component
{

    public state = {
        L01: false,
        L02: false,
        L03: false,
        L04: false,
        L05: true
    };

    /**
     * 
     */
    render()
    {
        let L01 = Object.keys(Origins.findentitydata).length;
        let L02 = Object.keys(Schemas.findentitydata).length;
        let L03 = Object.keys(Databases.findentitydata).length;
        let L04 = Object.keys(Tables.findentitydata).length;
        let L05 = Object.keys(Fields.findentitydata).length;

        let outJSX = [];
        if (L01) { 
            outJSX.push(<div>
                <h2 style={{ marginBottom: 0, fontWeight: 'normal' }}> 
                <Icon icon={this.state.L01 ? 'circle-arrow-down' : 'circle-arrow-right'} intent='primary' iconSize={25} style={{ paddingRight: 10, cursor: 'pointer'}} onClick={() => this.setState({L01: !this.state.L01})} />
                <Icon icon='locate' iconSize={25} style={{ paddingRight: 10 }} />
                Origins search result <Tag round={true} intent={!L01 ? 'none' : 'primary'}>{L01}</Tag></h2>
                { this.state.L01 ? <div style={{ padding: 20 }}><SimpleGridSearch model={Origins} columns={['should_ignore','name','app_code','business_contact']}/></div> : null }
                </div>);
        } else if (Origins.loading === true) {
            outJSX.push(<div style={{textAlign: 'center', padding: 10, margin: 10 }}><Spinner size={20} />Loading Origins ...</div>);
        }
        if (L02) { 
            outJSX.push(<div>
                <h2 style={{ marginBottom: 0, fontWeight: 'normal' }}> 
                <Icon icon={this.state.L02 ? 'circle-arrow-down' : 'circle-arrow-right'} intent='primary' iconSize={25} style={{ paddingRight: 10, cursor: 'pointer'}} onClick={() => this.setState({L02: !this.state.L02})} />
                <Icon icon='diagram-tree' iconSize={25} style={{ paddingRight: 10 }}  />
                Schemas search result <Tag round={true} intent={!L02 ? 'none' : 'primary'}>{L02}</Tag></h2>
                { this.state.L02 ? <div style={{ padding: 20 }}><SimpleGridSearch model={Schemas} columns={['should_ignore','name','fullname','storageengine','vendorbrand']} /></div> : null }
                </div>);
        } else if (Origins.loading === true) {
            outJSX.push(<div style={{textAlign: 'center', padding: 10, margin: 10 }}><Spinner size={20} />Loading Schemas ...</div>);
        }
        if (L03) { 
            outJSX.push(<div>
                <h2 style={{ marginBottom: 0, fontWeight: 'normal' }}> 
                <Icon icon={this.state.L03 ? 'circle-arrow-down' : 'circle-arrow-right'} intent='primary' iconSize={25} style={{ paddingRight: 10, cursor: 'pointer'}} onClick={() => this.setState({L03: !this.state.L03})} />
                <Icon icon='database' iconSize={25} style={{ paddingRight: 10 }}  />
                Databases search result <Tag round={true} intent={!L03 ? 'none' : 'primary'}>{L03}</Tag></h2>
                { this.state.L03 ? <div style={{ padding: 20 }}><SimpleGridSearch model={Databases} columns={['should_ignore','name','fullname']} /></div> : null }
                </div>);
        } else if (Origins.loading === true) {
            outJSX.push(<div style={{textAlign: 'center', padding: 10, margin: 10 }}><Spinner size={20} />Loading Databases ...</div>);
        }
        if (L04) { 
            outJSX.push(<div>
                <h2 style={{ marginBottom: 0, fontWeight: 'normal' }}> 
                <Icon icon={this.state.L04 ? 'circle-arrow-down' : 'circle-arrow-right'} intent='primary' iconSize={25} style={{ paddingRight: 10, cursor: 'pointer'}} onClick={() => this.setState({L04: !this.state.L04})} />
                <Icon icon='th' iconSize={25} style={{ paddingRight: 10 }}  />
                Tables search result <Tag round={true} intent={!L04 ? 'none' : 'primary'}>{L04}</Tag></h2>
                { this.state.L04 ? <div style={{ padding: 20 }}><SimpleGridSearch model={Tables} columns={['should_ignore','name','fullname','landing_destination']} /></div> : null }
                </div>);
        } else if (Origins.loading === true) {
            outJSX.push(<div style={{textAlign: 'center', padding: 10, margin: 10 }}><Spinner size={20} />Loading Tables ...</div>);
        }
        if (L05) { 
            outJSX.push(<div>
                <h2 style={{ marginBottom: 0, fontWeight: 'normal' }}> 
                <Icon icon={this.state.L05 ? 'circle-arrow-down' : 'circle-arrow-right'} intent='primary' iconSize={25} style={{ paddingRight: 10, cursor: 'pointer'}} onClick={() => this.setState({L05: !this.state.L05})} />
                <Icon icon='list' iconSize={25} style={{ paddingRight: 10 }}  />
                Fields search result <Tag round={true} intent={!L05 ? 'none' : 'primary'}>{L05}</Tag></h2>
                { this.state.L05 ? <div style={{ padding: 20 }}><SimpleGridSearch model={Fields} columns={['should_ignore','name','fullname','datatype','datalength','charset','is_pii','is_pci','is_cdc_field','is_pk','is_fk']} /></div> : null }
                </div>);
        } else if (Origins.loading === true) {
            outJSX.push(<div style={{textAlign: 'center', padding: 10, margin: 10 }}><Spinner size={20} />Loading Fields ...</div>);
        }
        return (<div style={{ padding: 20}}>{outJSX}</div>);
    }

}

export default SearchglobalScreen;
