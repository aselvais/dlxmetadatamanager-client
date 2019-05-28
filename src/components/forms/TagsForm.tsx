import { Intent, ITagProps, TagInput, FormGroup, Label, Button, IconName } from "@blueprintjs/core";
import Translator from "../../libs/translate/Translator";
import React, { Component } from "react";
import { formElementConfigSchema } from "../../models/interfaces";

const INTENTS = [Intent.NONE, Intent.PRIMARY, Intent.SUCCESS, Intent.DANGER, Intent.WARNING];

interface ITagInputExampleState {
    addOnBlur: boolean;
    addOnPaste: boolean;
    disabled: boolean;
    fill: boolean;
    intent: Intent;
    large: boolean;
    leftIcon: boolean;
    tagIntents: boolean;
    tagMinimal: boolean;
    k: string;
    values: React.ReactNode[];
}

interface TagsFormProps {
    k:string,
    v:Array<string> | '',
    c : formElementConfigSchema,
    leftIcon: IconName
};

/**
 * 
 */
class TagsForm extends Component<TagsFormProps>
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
        leftIcon: true,
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
                <Label>{Translator.t(this.props.k)}</Label>
                <TagInput
                    {...props}
                    leftIcon={this.props.leftIcon ? this.props.leftIcon : undefined}
                    onChange={(values:React.ReactNode[]) => this.handleChange(values)}
                    placeholder="Separate values with commas..."
                    rightElement={this.getClearButton()}
                    tagProps={ (v:string,i:number) => this.getTagProps(v,i) }
                    values={values}
                />
            </FormGroup>
        );
    }

}

export default TagsForm;