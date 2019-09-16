import { Intent, ITagProps, TagInput, FormGroup, Label, Button, IconName, Checkbox } from "@blueprintjs/core";
import Translator from "../../libs/translate/Translator";
import React, { Component } from "react";
import { formElementConfigSchema } from "../../models/interfaces";
import AbstractModel from "../../models/orm/AbstractModel";
import { observer } from "mobx-react";

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
class MultiSelectForm extends Component<TagsFormProps>
{
    /**
     * 
     * @param key 
     */
    protected getLabel(key)
    {
        //@ts-ignore
        return (this.props.bulkmode === true) ? (<Checkbox label={Translator.t(key)} />) : (Translator.t(key));
    }

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
        // this.props.model.document[this.props.k] = values;
        return this.setState({ values });
    };

    /**
     * 
     */
    private handleClear()
    {
        return this.handleChange(this.state.values.length > 0 ? [] : (this.props.v ? this.props.v : []));
    }

    /**
     * 
     */
    private getClearButton() 
    {
        const { tagIntents, tagMinimal, values, ...props } = this.state;
        return (
            <Button
                disabled={props.disabled}
                icon={values.length > 1 ? "cross" : "refresh"}
                minimal={true}
                onClick={() => this.handleClear()}
            />
        );
    }

    /**
     * 
     * @param _v 
     * @param index 
     */
    private getTagProps(_v: string, index: number): ITagProps 
    {
        const { tagIntents, tagMinimal, values, ...props } = this.state;
        return ({
            intent: tagIntents ? INTENTS[index % INTENTS.length] : Intent.NONE,
            large: props.large,
            minimal: tagMinimal,
        });
    }

    /**
     * 
     */
    public render()
    {
        const { tagIntents, tagMinimal, values, ...props } = this.state;
        return (
            <FormGroup>
                {
                    //@ts-ignore 
                    this.props.c.hideLabel === false ? null : <Label>{this.getLabel(this.props.k)}</Label>
                }
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
    }

}

export default MultiSelectForm;