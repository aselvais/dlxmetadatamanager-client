import React, { Component } from "react";
import { observer } from "mobx-react";
import Users from '../models/Users';
import Form from '../components/forms/Form';
import logo from '../assets/images/Deluxe_enterprise_logo_RGB.png';


/**
 * 
 */
@observer
class LoginScreen extends Component
{

    /**
     * 
     */
    render() {
        return (
            <div style={{textAlign: 'center', padding: 50}}>
                <div style={{padding: 20}}>
                    <img src={logo} alt="Deluxe logo" width={180}/>
                </div>
                <div>
                    <h2>Meta-Data Manager</h2>
                </div>
                <div style={{ width: 300, padding: 20, margin: 'auto' }}>
                    <Form model={Users} config={Users.formConfigLogin} />
                </div>
            </div>
        );
    }
}

export default LoginScreen;

