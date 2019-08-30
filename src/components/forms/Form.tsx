import React, { Component } from "react";
import { formElementConfigSchema, formConfigSchema } from "../../models/interfaces";
import { FormGroup, Button, Label, InputGroup, Icon, ControlGroup, TextArea, Spinner, Switch, Position, Checkbox } from "@blueprintjs/core";
import Translator from "../../libs/translate/Translator";
import AbstractModel from "../../models/orm/AbstractModel";
import { observer } from "mobx-react";
import { TimezoneDisplayFormat, TimezonePicker } from "@blueprintjs/timezone";
import MultiSelectForm from "./MultiSelectForm";

interface formProps {
    model: AbstractModel,
    config: formConfigSchema,
    bulkmode?: boolean,
    documentname: string
};

/**
 * 
 */
@observer
class Form extends Component<formProps, any>
{

    /**
     * 
     * @param key 
     */
    protected _onClickCheckboxLabel(key)
    {
        if (this.props.model.selected_labels[key])
        {
            delete this.props.model[this.props.documentname][key];
            delete this.props.model.selected_labels[key];
        } else {
            this.props.model[this.props.documentname][key] = null;
            this.props.model.selected_labels[key] = true;
        }
    }

    /**
     * 
     * @param key 
     */
    protected getLabel(key)
    {
        //@ts-ignore
        return (this.props.bulkmode === true) ? (<Checkbox 
            label={Translator.t(key)}
            onChange={ () => this._onClickCheckboxLabel(key) }
            selected={true}
        />) : (Translator.t(key));
    }

    protected _shouldDisplayElement(key)
    {
        return ( (!this.props.bulkmode) || (this.props.bulkmode === true && this.props.model.selected_labels[key]) );
    }

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
                { c.hideLabel === false ? null : <Label>{this.getLabel(key)}</Label>}
                { this._shouldDisplayElement(key) ?
                (<input className="bp3-input" 
                style={{ width: '100%'}} 
                disabled={c.disabled ? c.disabled : false} 
                type="text"
                name={key}
                value={v} 
                onChange={vv => this.props.model[this.props.documentname][key] = vv.target.value} 
                />) : null
                }
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
                { c.hideLabel === false ? null : <Label>{this.getLabel(key)}</Label>}
                { this._shouldDisplayElement(key) ?
                (<TextArea 
                    name={key} 
                    value={v}
                    onChange={vv => this.props.model[this.props.documentname][key] = vv.target.value} 
                    growVertically={true} 
                    style={{ width: '100%', minHeight: 100 }}/>) : null }
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
                { c.hideLabel === false ? null : <Label>{this.getLabel(key)}</Label>}
                { this._shouldDisplayElement(key) ?
                (<InputGroup 
                    rightElement={(<Icon icon="lock" />)} 
                    type="password" 
                    name={key} 
                    value={v} 
                    onChange={vv => this.props.model[this.props.documentname][key] = vv.target.value} 
                    />) : null }
            </FormGroup>        
        );
    }

    /**
     * 
     * @todo Persist this value!
     * 
     * @param key 
     * @param v 
     * @param c 
     */
    public getTimezoneElementJSX(key:string, v:string, c : formElementConfigSchema)
    {
        return (
            <FormGroup>
                { c.hideLabel === false ? null : <Label>{this.getLabel(key)}</Label>}
                { this._shouldDisplayElement(key) ? (<TimezonePicker
                    value={v}
                    onChange={vv => this.props.model[this.props.documentname][key] = vv}
                    valueDisplayFormat={TimezoneDisplayFormat.COMPOSITE}
                    popoverProps={{ position: Position.TOP }}
                    showLocalTimezone={true}>
                    </TimezonePicker>) : null }
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
                { c.hideLabel === false ? null : <Label>{this.getLabel(key)}</Label>}
                { this._shouldDisplayElement(key) ?
                (<div className="bp3-select">
                    <select onChange={vv => this.props.model[this.props.documentname][key] = vv.target.value} >
                        <option selected={v ? false : true} >Choose an item...</option>
                        {Object.keys(c.options).map(k => 
                            <option value={k} selected={(v === k) ? true : false}>
                                {Translator.t(c.options[k])}
                            </option>
                        )}
                    </select>
                </div>) : null }
            </FormGroup>        
        );
    }


    /**
     * 
     * @param key 
     * @param v 
     * @param c 
     */
    public getSwitchFormElementJSX(key:string, v:Array<string> | '', c : formElementConfigSchema)
    {
        return (
            <FormGroup>
                { c.hideLabel === false ? null : <Label>{this.getLabel(key)}</Label>}
                { this._shouldDisplayElement(key) ? (<Switch 
                    onChange={vv =>
                        //@ts-ignore 
                        this.props.model[this.props.documentname][key] = vv.target.checked ? 1 : 0 
                    }
                    value={v}
                    checked={ !v ? false : true} 
                    labelElement={<strong>NO / YES</strong>}/>) : null }
            </FormGroup>        
        );
    }

    /**
     * 
     * @param key 
     */
    public getFormElement(key : string = '')
    {
        let v = (this.props.model[this.props.documentname] && this.props.model[this.props.documentname][key]) ? this.props.model[this.props.documentname][key] : '';
        // @ts-ignore
        let c : formElementConfigSchema = (this.props.config && this.props.config.elements && typeof this.props.config.elements[key] !== 'undefined') ? this.props.config.elements[key] : false;
        //@ts-ignore
        if (this.props.bulkmode === true && this.props.config.elements[key].bulkedit === false) return null;

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
                    return <MultiSelectForm leftIcon="tag" model={this.props.model} k={key} v={v} c={c} />
                case 'switch':
                    return this.getSwitchFormElementJSX(key, v, c);
                case 'timezone':
                    return this.getTimezoneElementJSX(key, v, c);
                /*
                case 'email':
                    return null;
                case 'checkbow':
                    return null;
                case 'radio':
                    return null;
                case 'slider':
                    return null;
                case 'file':
                    return null;
                case 'numeric':
                    return null;
                case 'datetime':
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
            Object.keys(this.props.model[this.props.documentname]).map( d => this.props.config.elements[d] = {shape: 'text'} );
        }
        //@ts-ignore
        form = Object.keys(this.props.config.elements).map((k) => this.getFormElement(k) );
        if (this.props.config.showButton !== false)
        {
            if (this.props.model.currentAction === 'saving' || this.props.model.currentAction === 'loggingin') {
                form.push(<div style={{margin: 'auto'}}><Spinner size={20} /></div>);
            } else {
                // disabled={(this.props.model.currentAction === 'saving' || this.props.model.currentAction === 'loggingin')}
                form.push(<Button 
                    icon="plus" 
                    intent="success" 
                    text={Translator.t('Submit')}
                    onClick={
                        e => (
                                this.props.config && 
                                this.props.config.buttonAction && 
                                typeof this.props.model[this.props.config.buttonAction] === 'function'
                            ) ? this.props.model[this.props.config.buttonAction](this.props.bulkmode ? true : false) : null
                    }
                />);
    
            }
        }
        return (
            <ControlGroup fill={this.props.config.fill} vertical={this.props.config.vertical}>
            {form}
            </ControlGroup>
        );
    }
}

export default Form;
