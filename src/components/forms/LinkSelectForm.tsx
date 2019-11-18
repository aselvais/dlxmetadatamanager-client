import { FormGroup, IconName } from "@blueprintjs/core";
import React, { Component } from "react";
import { formElementConfigSchema } from "../../models/interfaces";
import AbstractModel from "../../models/orm/AbstractModel";
import { observer } from "mobx-react";

interface TagsFormProps {
    model: AbstractModel,
    k:string,
    v:Array<string> | '',
    c : formElementConfigSchema,
    leftIcon: IconName,
    documentname: string
};

/**
 * 
 */
@observer
class LinkSelectForm extends Component<TagsFormProps>
{
    
    /**
     * 
     */
    public render()
    {
        const { ...props } = this.state;
        return (<FormGroup></FormGroup>);
    }

}

export default LinkSelectForm;