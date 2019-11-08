import React, { Component } from "react";
import { ControlGroup, HTMLSelect, Drawer, Button, Spinner } from "@blueprintjs/core";
import Form from "../components/forms/Form";
import AccessTokens from "../models/orm/AccessTokens";
import Applicationcodes from "../models/orm/Applicationcodes";
import Applog from "../models/orm/Applog";
import Authenticationresources from "../models/orm/Authenticationresources";
import Databases from "../models/orm/Databases";
import Fieldgroups from "../models/orm/Fieldgroups";
import Fields from "../models/orm/Fields";
import Landingdestinations from "../models/orm/Landingdestinations";
import Origins from "../models/orm/Origins";
import Schemadata from "../models/orm/Schemadata";
import Schemas from "../models/orm/Schemas";
import Semantictypes from "../models/orm/Semantictypes";
import Systems from "../models/orm/Systems";
import Tables from "../models/orm/Tables";
import Tags from "../models/orm/Tags";
import Users from "../models/orm/Users";
import Viewapplogactions from "../models/orm/Viewapplogactions";
import Viewapplogbulk from "../models/orm/Viewapplogbulk";
import Viewfieldsflat from "../models/orm/Viewfieldsflat";
import { toJS } from "mobx";

/**
 * Home screen
 */
class AdvancedsearchScreen extends Component
{
    state = {
        modelName : '---',
        isOpen: false,
        model: null
    };

    private modellist = [
        '---',
        'AccessTokens',
        'Applicationcodes',
        'Applog',
        'Authenticationresources',
        'Databases',
        'Fieldgroups',
        'Fields',
        'Landingdestinations',
        'Origins',
        'Schemadata',
        'Schemas',
        'Semantictypes',
        'Systems',
        'Tables',
        'Tags',
        'Users',
        'Viewapplogactions',
        'Viewapplogbulk',
        'Viewfieldsflat'
    ];

    private modelinstances = {
        'AccessTokens' : AccessTokens,
        'Applicationcodes': Applicationcodes,
        'Applog': Applog,
        'Authenticationresources' : Authenticationresources,
        'Databases': Databases,
        'Fieldgroups' : Fieldgroups,
        'Fields' : Fields,
        'Landingdestinations' : Landingdestinations,
        'Origins' : Origins,
        'Schemadata' : Schemadata,
        'Schemas' : Schemas,
        'Semantictypes': Semantictypes,
        'Systems': Systems,
        'Tables': Tables,
        'Tags': Tags,
        'Users': Users,
        'Viewapplogactions': Viewapplogactions,
        'Viewapplogbulk': Viewapplogbulk,
        'Viewfieldsflat': Viewfieldsflat,  
    };

    protected getSearchForm()
    {
        if (this.state.modelName === '---') return null;
        else {
            return (
                <div>
                    <h3>{this.state.modelName}</h3>
                    <div>
                    <Form 
                        model={this.state.model} 
                        config={this.state.model.formConfig} 
                        elements="elementssearch" 
                        documentname="document" 
                        buttonAction="search"
                    />
                    </div>
                </div>
            );
        }
    }

    protected getGrid()
    {
        if (!this.state.model || this.state.model.loading === true)
        return (<Spinner />);
        else
        return (<div>{JSON.stringify(toJS(this.state.model.collection))}</div>);
    }

    /**
     * 
     * @param elemName 
     */
    protected onChangeModelSelection(elemName)
    {
       this.setState({
            modelName: elemName,
            model: this.modelinstances[elemName]
        });
    }

    /**
     * 
     */
    public render()
    {
        return (
            <div style={{padding: 20}}>
                <ControlGroup {...this.state}>
                    <label>
                        Entiry &nbsp;&nbsp;&nbsp;
                    <HTMLSelect options={this.modellist} onChange={(e) => this.onChangeModelSelection(e.target.value) } />
                    </label>
                    <Button onClick={ () => this.setState({ isOpen: true })}>Show search form</Button>
                </ControlGroup>
                <Drawer
                    icon="search"
                    onClose={() => this.setState({ isOpen: false })}
                    title={"Search on " + this.state.modelName }
                    isOpen={this.state.isOpen}
                    size={450}
                    hasBackdrop={false}
                    canOutsideClickClose={false}
                    position="right"
                >
                    <div style={{padding: 20, maxHeight: '90vh', overflow: 'auto'}}>
                        {this.getSearchForm()}
                    </div>
                </Drawer>
                <div>
                    {this.getGrid()}
                </div>
            </div>
        );
    }
}

export default AdvancedsearchScreen;
