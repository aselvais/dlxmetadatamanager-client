import React, { Component } from "react";
import Users from "../models/Users";
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
        Users.findOneById('5cdee3f69235fb138cb2e758');
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
                    <div>
                        <Form data={Users.document} config={Users.formConfig} />
                    </div>
                </div>
                );        
        }
    }

}

export default ProfileScreen;
