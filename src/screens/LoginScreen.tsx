import React, { Component } from "react";
import { observer } from "mobx-react";
import Users from '../models/orm/Users';
import Form from '../components/forms/Form';
import logo from '../assets/images/Deluxe_enterprise_logo_RGB.png';
import logometa from '../assets/images/metalogo.png';
import { Toaster, Position, IToastProps, Intent } from "@blueprintjs/core";


/**
 * 
 */
@observer
class LoginScreen extends Component
{
    /**
     * 
     */
    private toaster: Toaster;
    /**
     * 
     */
    private refHandlers = {
        toaster: (ref: Toaster) => (this.toaster = ref),
    };

    /**
     * 
     * @param toast 
     */
    private addToast(toast: IToastProps) 
    {
        // toast.className = this.props.data.themeName;
        toast.timeout = 5000;
        this.toaster.show(toast);
    }

    /**
     * 
     */
    render() {

        if (Users.error && Users.loading) 
        {
            this.addToast({
                icon: "ban-circle",
                intent: Intent.DANGER,
                message: Users.error.message ? Users.error.message : 'Undefined error ...',
            });
        }

        return (
            <div style={{textAlign: 'center', padding: 50}}>
                <div style={{padding: 20}}>
                    <img src={logo} alt="Deluxe logo" width={80}/>
                    <h3>Meta-Data Manager</h3>
                    <img src={logometa} alt="Deluxe logo" width={50}/>
                </div>
                <div style={{ width: 300, padding: 20, margin: 'auto' }}>
                    <Form model={Users} config={Users.formConfigLogin} />
                </div>
                <Toaster ref={this.refHandlers.toaster} 
                        autoFocus={false}
                        canEscapeKeyClear={true}
                        position={Position.TOP}
                />
            </div>
        );
    }
}

export default LoginScreen;

