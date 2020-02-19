import React, { Component } from "react";
import { observer } from "mobx-react";
import { FormGroup, IconName, MenuItem } from "@blueprintjs/core";
import { MultiSelect } from "@blueprintjs/select";
import AbstractModel from "../../models/orm/AbstractModel";
import Semantictypes from "../../models/orm/Semantictypes";
import { formElementConfigSchema, semantictypesSchema } from "../../models/interfaces";
import { toJS } from "mobx";

interface TagsFormProps {
    model: AbstractModel,
    leftIcon: IconName,
    documentname: string,
    k : string,
    v : Array<string> | '',
    c : formElementConfigSchema,
};

/**
 * 
 */
@observer
class SemantictypesForm extends Component<TagsFormProps>
{

    /**
     * 
     * @param values 
     */
    private handleChange(values: React.ReactNode[])
    {
        this.props.model[this.props.documentname][this.props.k] = values;
        return this.setState({ values });
    };

    /**
     * 
     * @param tag 
     */
    private onTagClick(tag : semantictypesSchema )
    {
        console.log( toJS(tag) );
    }

    /**
     * 
     */
    public render()
    {
        return (
            <FormGroup>
                <MultiSelect 
                    fill={true}
                    openOnKeyDown={false}
                    resetOnSelect={true}
                    itemRenderer={ (tag) =>
                        <MenuItem
                            active={true}
                            key={tag.id}
                            label={tag.name}
                            shouldDismissPopover={false}
                            onClick={(e) => this.onTagClick(tag) }
                        />
                    }
                    items={Semantictypes.collection}
                    onItemSelect={() => null }
                    tagRenderer={(tag: semantictypesSchema ) => tag.name}
                    noResults={<MenuItem disabled={true} text="No results." />}
                />
            </FormGroup>
        );
    }

}

export default SemantictypesForm;
