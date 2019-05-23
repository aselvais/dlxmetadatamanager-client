import React, { Component } from "react";
import { observer } from "mobx-react";
import Users from '../models/orm/Users';
import Form from '../components/forms/Form';
import logo from '../assets/images/Deluxe_enterprise_logo_RGB.png';
import { Toaster, Position, IToastProps, Intent, Spinner } from "@blueprintjs/core";


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
     */
    protected showErrorMsg()
    {
        if (!Users.error) return null;
        else {
            console.log('Hello?!');
  
        }
    }

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
                    <img src={logo} alt="Deluxe logo" width={180}/>
                </div>
                <div>
                    <h2>Meta-Data Manager</h2>
                </div>
                <div style={{ width: 300, padding: 20, margin: 'auto' }}>
                    <Form model={Users} config={Users.formConfigLogin} />
                </div>
                { Users.loading ? <div style={{padding: 10}}><Spinner size={30} /></div> : null }
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

