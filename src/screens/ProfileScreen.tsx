import React, { Component } from "react";
import Users from "../models/orm/Users";
import { observer } from "mobx-react";
import Form from "../components/forms/Form";
import { Spinner } from "@blueprintjs/core";

/**
 * 
 */
@observer
class ProfileScreen extends Component
{
    /**
     * 
     */
    componentDidMount()
    {
        Users.findOneById(Users.document.id, true);
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
                    <div style={{ width: '70%', margin: 'auto'}}>
                        <Form model={Users} config={Users.formConfig} />
                    </div>
                </div>
                );        
        }
    }

}

export default ProfileScreen;
