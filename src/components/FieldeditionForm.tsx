import React, { Component } from "react";
import Form from "./forms/Form";
import { observer } from "mobx-react";
import AbstractModel from "../models/orm/AbstractModel";
import { gridConfig } from "../models/interfaces";

interface Props {
    model: AbstractModel,
    config?: gridConfig
}

/**
 * 
 */
@observer
class FieldeditionForm extends Component<Props>
{

    render()
    {
        return (
        <div style={{padding: 20, margin: 20}}>
            {
                this.props.model.document ? <Form model={this.props.model} config={this.props.model.formConfig}/> : null 
            }
        </div>
        );    
    }
}


export default FieldeditionForm;
