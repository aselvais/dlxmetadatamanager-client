import { Intent, ITagProps, TagInput, FormGroup, Button, IconName, Checkbox, MenuItem, Tag } from "@blueprintjs/core";
import Translator from "../../libs/translate/Translator";
import React, { Component } from "react";
import { formElementConfigSchema, datadictSchema } from "../../models/interfaces";
import AbstractModel from "../../models/orm/AbstractModel";
import { observer } from "mobx-react";
import { MultiSelect, ItemRenderer } from "@blueprintjs/select";
import Semantictypes from "../../models/orm/Semantictypes";

const INTENTS = [Intent.NONE, Intent.PRIMARY, Intent.SUCCESS, Intent.DANGER, Intent.WARNING];


interface ITagInputExampleState {
    addOnBlur: boolean;
    addOnPaste: boolean;
    disabled: boolean;
    fill: boolean;
    intent: Intent;
    large: boolean;
    leftIcon: IconName;
    tagIntents: boolean;
    tagMinimal: boolean;
    k: string;
    values: React.ReactNode[];
}

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
class SemantictypesForm extends Component<TagsFormProps>
{
    /**
     * 
     */
    public state: ITagInputExampleState = {
        addOnBlur: false,
        addOnPaste: true,
        disabled: false,
        fill: false,
        intent: "none",
        large: false,
        leftIcon: null,
        tagIntents: false,
        tagMinimal: false,
        k: this.props.k,
        values: this.props.v ? this.props.v : []
    };

    /**
     * 
     */
    private handleChange(values: React.ReactNode[])
    {
        this.props.model[this.props.documentname][this.props.k] = values;
        return this.setState({ values });
    };


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
                            // onClick={handleClick}
                            //text={`${film.rank}. ${film.title}`}
                            shouldDismissPopover={false}
                        />
                    }
                    items={Semantictypes.collection}
                    onItemSelect={() => null }
                    tagRenderer={(tag: datadictSchema) => tag.name}
                    noResults={<MenuItem disabled={true} text="No results." />}

                />
            </FormGroup>
        );
        
        /*
        return (
            <FormGroup>
                <TagInput
                    {...props}
                    leftIcon={ ( this.props.c && this.props.c.leftIcon) ? this.props.c.leftIcon : undefined }
                    onChange={(values:React.ReactNode[]) => this.handleChange(values)}
                    placeholder={ ( this.props.c && this.props.c.placeholder) ? this.props.c.placeholder : '' }
                    rightElement={this.getClearButton()}
                    tagProps={ (v:string, i:number) => this.getTagProps(v,i) }
                    values={values}
                />
            </FormGroup>
        );
        */

    }

}

export default SemantictypesForm;
