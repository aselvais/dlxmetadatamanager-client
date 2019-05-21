import React, { Component } from "react";
import Form from "./forms/Form";
import Schemadata from "../models/Schemadata";
import { observer } from "mobx-react";

/**
 * 
 */
@observer
class FieldeditionForm extends Component
{

    render()
    {
        
        return (
        <div style={{padding: 20, margin: 20}}>
            { Schemadata.document ? <Form model={Schemadata} config={{ vertical: true, showButton: true }}/> : null }
        </div>
        );
        
    }
}


export default FieldeditionForm;
