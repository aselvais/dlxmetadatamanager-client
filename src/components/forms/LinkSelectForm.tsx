import { FormGroup, IconName, Button, MenuItem } from "@blueprintjs/core";
import React, { Component } from "react";
import { formElementConfigSchema, systemsSchema } from "../../models/interfaces";
import AbstractModel from "../../models/orm/AbstractModel";
import { observer } from "mobx-react";
import { Select } from "@blueprintjs/select";
import { toJS } from "mobx";

interface TagsFormProps {
    model: AbstractModel,
    parentmodel?: AbstractModel | null,
    k:string,
    disabled?: boolean,
    v:Array<string> | '',
    c : formElementConfigSchema,
    leftIcon: IconName,
    documentname: string
};


const EntitySelect = Select.ofType<systemsSchema>();

/**
 * 
 */
@observer
class LinkSelectForm extends Component<TagsFormProps>
{

    protected onElementItemSelect(e:any)
    {
        try {
            let ename = this.props.k.split('_');
            this.props.model[this.props.documentname][ename[0] + '_id'] = e.id;
            if (e.idh) this.props.model[this.props.documentname][ename[0] + '_idh'] = e.idh;    
        } catch (ee) {}
    }

    /**
     * 
     */
    public render()
    {
        // const { ...props } = this.state;
        return (
            <FormGroup>
                <EntitySelect 
                    items={ this.props.parentmodel ? this.props.parentmodel.collection : [] }
                    onItemSelect={(e) => console.log(e) } 
                    itemRenderer={(elem) => (
                        (this.props.disabled !== true) ? 
                            <MenuItem
                                active={(elem.id === this.props.v) ? true : false}
                                text={elem.name}
                                key={elem.id}
                                onClick={(e) => this.onElementItemSelect( toJS(elem) ) }
                            /> : null
                    )} 
                >
                    <Button
                        icon="application"
                        disabled={this.props.disabled}
                        rightIcon="caret-down"
                        text={
                            (this.props.v && this.props.parentmodel && this.props.parentmodel.getLocalDocumentById) ? 
                            //@ts-ignore
                            this.props.parentmodel.getLocalDocumentById(this.props.v).name : JSON.stringify(this.props.v)
                        }
                    />
                </EntitySelect>
            </FormGroup>
        );
    }

}

export default LinkSelectForm;