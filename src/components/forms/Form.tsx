import React, { Component } from "react";
import { formElementConfigSchema, formConfigSchema } from "../../models/interfaces";
import { FormGroup, Button, Label, InputGroup, Icon, ControlGroup, TextArea, TagInput } from "@blueprintjs/core";
import Translator from "../../libs/translate/Translator";
import AbstractModel from "../../models/AbstractModel";

interface formProps {
    model: AbstractModel,
    config: formConfigSchema
};

/**
 * 
 */
class Form extends Component<formProps, any>
{
    /**
     * 
     * @param key 
     * @param v 
     * @param c 
     */
    public getDefaultFormElementJSX(key:string, v:string, c : formElementConfigSchema)
    {
        return (
            <FormGroup>
                { c.hideLabel === false ? null : <Label>{Translator.t(key)}</Label>}
                <input className="bp3-input" style={{ width: '100%'}} 
                    disabled={c.diabled ? c.diabled : false} 
                    type="text"
                    name={key}
                    value={v} />
            </FormGroup>
        );
    }

    /**
     * 
     * @param key 
     * @param v 
     * @param c 
     */
    public getTextareaFormElementJSX(key:string, v:string, c : formElementConfigSchema)
    {
        return (
            <FormGroup>
                <Label>{Translator.t(key)}</Label>
                <TextArea name={key} value={v} growVertically={true} style={{ width: '100%', minHeight: 100 }}/>
            </FormGroup>
        );
    }

    /**
     * 
     * @param key 
     * @param v 
     * @param c 
     */
    public getPasswordFormElementJSX(key:string, v:string, c : formElementConfigSchema)
    {
        return (
            <FormGroup>
                <Label>{Translator.t(key)}</Label>
                <InputGroup rightElement={(<Icon icon="lock" />)} type="password" name={key} value={v} />
            </FormGroup>        
        );
    }

    /**
     * 
     * @param key 
     * @param v 
     * @param c 
     */
    public getSelectFormElementJSX(key:string, v:string, c : formElementConfigSchema)
    {
        return (
            <FormGroup>
                <Label>{Translator.t(key)}</Label>
                <div className="bp3-select">
                    <select>
                        <option selected={v ? false : true}>Choose an item...</option>
                        {Object.keys(c.options).map(k => <option value={k} selected={(v === k) ? true : false}>{Translator.t(c.options[k])}</option>)}
                    </select>
                </div>
            </FormGroup>        
        );
    }

    /**
     * 
     * @param key 
     * @param v 
     * @param c 
     */
    public getTagFormElementJSX(key:string, v:Array<string> | '', c : formElementConfigSchema)
    {
        if (v === '') v = [];
        return (
            <FormGroup>
                <Label>{Translator.t(key)}</Label>
                <TagInput 
                    leftIcon="tag"
                    values={v}
                />
            </FormGroup>        
        );
    }

    /**
     * 
     * @param key 
     */
    public getFormElement(key : string = '')
    {
        let v = this.props.model.document[key] ? this.props.model.document[key] : '';
        // @ts-ignore
        let c : formElementConfigSchema = (this.props.config && this.props.config.elements && typeof this.props.config.elements[key] !== 'undefined') ? this.props.config.elements[key] : false;
        if (!c) return null;
        else if (c.shape) {
            switch(c.shape) {
                case 'text':
                    return this.getDefaultFormElementJSX(key, v, c);
                case 'select':
                    return this.getSelectFormElementJSX(key, v, c);
                case 'password':
                    return this.getPasswordFormElementJSX(key, v, c);
                case 'textarea':
                    return this.getTextareaFormElementJSX(key, v, c);
                case 'tag':
                    return this.getTagFormElementJSX(key, v, c);
                    /*
                case 'email':
                    return null;
                case 'checkbow':
                    return null;
                case 'radio':
                    return null;
                case 'slider':
                    return null;
                case 'switch':
                    return null;
                case 'file':
                    return null;
                case 'numeric':
                    return null;
                case 'datetime':
                    return null;
                case 'timezone':
                    return null;
                case 'submit':
                    return null;
                */
                default:
                    return this.getDefaultFormElementJSX(key, v, c);
            }
        } else {
            return this.getDefaultFormElementJSX(key, v, c);
        }
    }


    /**
     * 
     */
    render()
    {
        let form = [];
        if (this.props.config && this.props.config.elements)
        {}
        else {
            // @ts-ignore
            this.props.config.elements = [];
            Object.keys(this.props.model.document).map( d => this.props.config.elements[d] = {shape: 'text'} );
        }
        form = Object.keys(this.props.config.elements).map(k => this.getFormElement(k));
        if (this.props.config.showButton !== false)
        {
            form.push(<Button icon="plus" intent="success" text={Translator.t('Submit')} />);
        }
        return (
            <ControlGroup fill={this.props.config.fill} vertical={this.props.config.vertical}>
            {form}
            </ControlGroup>
        );    
    }
}

export default Form;
