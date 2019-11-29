import { FormGroup, IconName, Button, MenuItem } from "@blueprintjs/core";
import React, { Component } from "react";
import { formElementConfigSchema, systemsSchema } from "../../models/interfaces";
import AbstractModel from "../../models/orm/AbstractModel";
import { observer } from "mobx-react";
import { Select } from "@blueprintjs/select";

interface TagsFormProps {
    model: AbstractModel,
    parentmodel?: AbstractModel | null,
    k:string,
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
        console.log(e);
    }

    /**
     * 
     */
    public render()
    {
        // const { ...props } = this.state;
        console.log('------------------------------------------------------------');
        console.log(this.props.parentmodel);
        console.log('------------------------------------------------------------');
        return (
            <FormGroup>
                <EntitySelect 
                    itemRenderer={(elem) => (
                        <MenuItem
                            active={false}
                            disabled={false}
                            text={elem.name}
                            key={elem.id}
                            onClick={(e) => console.log(e) }
                        />
                )} 
                items={
                    this.props.parentmodel ? this.props.parentmodel.collection : []
                }
                onItemSelect={(e) => this.onElementItemSelect(e) } 
                >
                    <Button
                        icon="application"
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