import React, { Component } from "react";
import { observer } from "mobx-react";
import { FormGroup, IconName, MenuItem } from "@blueprintjs/core";
import { MultiSelect } from "@blueprintjs/select";
import AbstractModel from "../../models/orm/AbstractModel";
import Semantictypes from "../../models/orm/Semantictypes";
import { formElementConfigSchema, semantictypesSchema } from "../../models/interfaces";

interface TagsFormProps {
    model: AbstractModel,
    leftIcon: IconName,
    documentname: string,
    k : string,
    v : Array<string> | '',
    c : formElementConfigSchema,
};

interface Istate {
    collection: Array<semantictypesSchema>,
    selected01: semantictypesSchema | null,
    selected02: semantictypesSchema | null,
    values: Array<semantictypesSchema>,
};

/**
 * 
 */
@observer
class SemantictypesForm extends Component<TagsFormProps>
{
    public state : Istate = {
        collection: [],
        selected01: null,
        selected02: null,
        values: [],
    };

    /**
     * 
     */
    componentDidMount()
    {
        this.setState({collection: this.getRootTags(), values: this.valuesToTags()}, () => this.handleChange());        
    }

    /**
     * 
     */
    private valuesToTags() : Array<semantictypesSchema>
    {
        let v : Array<string> = this.props.v ? this.props.v : [];
        let lastParentTag : semantictypesSchema = null;
        return v.map(
            (s:string, idx:number) => { 
                let tt : number  = (idx%2); // 0: root , 1: secondary
                let retTag = { name: s };
                let arrayOfResults = [];
                // manage main type
                if (tt === 0)
                {
                    arrayOfResults = this.getRootTags().filter( t => (t.name === s) );
                    lastParentTag = (arrayOfResults.length === 1) ? arrayOfResults[0] : null;
                }
                // manage secondary type
                if (tt === 1)
                {
                    arrayOfResults = this.getChildrenTags(lastParentTag.id).filter( t => (t.name === s) );
                    lastParentTag = null;
                }
                return retTag;
        });


    }

    /**
     * 
     */
    private tagsToValues() : Array<string>
    {
        return this.state.values.map(t => t.name);
    }

    /**
     * 
     */
    private getRootTags()
    {
        return Semantictypes.collection.filter((e:semantictypesSchema) => (e.parent_id && e.parent_id !== '') ? false : true );
    }

    /**
     * Return the kids of a root tag
     * @param parent_id 
     */
    private getChildrenTags(parent_id : string)
    {
        return Semantictypes.collection.filter((e:semantictypesSchema) => (e.parent_id && e.parent_id !== '' && e.parent_id === parent_id) ? true : false );
    }

    /**
     * Sets the values to the model property
     * @param values 
     */
    private handleChange()
    {
        this.props.model[this.props.documentname][this.props.k] = this.tagsToValues();
    };

    /**
     * When clicking a tag, managing the next action eitheir show kids or 
     * add pair of tags to values
     * 
     * @param tag 
     */
    private onTagClick(tag : semantictypesSchema )
    {
        if (this.state.selected01 === null)
        { 
            this.setState({selected01: tag, collection: this.getChildrenTags(tag.id)});
        }
        else if (this.state.selected02 === null)
        {
            let values = this.state.values;
            values.push(this.state.selected01);
            values.push(tag);
            this.setState({
                values: values,
                selected01: null, 
                selected02: null, 
                collection: this.getRootTags()
            }, () => this.handleChange());
        }
    }

    /**
     * Remove 2 linked elements while clicking on the X
     * 
     * @param name 
     * @param idx 
     */
    public removeElement(name : string, idx: number)
    {
        // let tag : semantictypesSchema = toJS(this.state.values[idx]);
        let values = this.state.values.filter((tag : semantictypesSchema, tidx : number ) => {
            if (tidx === idx || (idx%2 === 1 && tidx === idx-1) || (idx%2 === 0 && tidx === idx+1)) return false;
            else return true;
        });
        this.setState({values: values}, () => this.handleChange());
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
                    itemRenderer={ (tag : semantictypesSchema) =>
                        <MenuItem
                            active={false}
                            key={tag.id}
                            label={tag.name}
                            shouldDismissPopover={this.state.selected01 ? true : false}
                            onClick={() => this.onTagClick(tag) }
                        />
                    }
                    items={this.state.collection}
                    tagRenderer={(tag: semantictypesSchema ) => tag.name}
                    noResults={<MenuItem disabled={true} text="No results." />}
                    onItemSelect={() => null }
                    selectedItems={this.state.values}
                    tagInputProps={{ 
                        onRemove: (e, a) => this.removeElement(e, a), 
                        tagProps: (_value: string, idx: number) => ({ minimal: !(idx%2 === 0), }) 
                    }}
                />
            </FormGroup>
        );
    }


}

export default SemantictypesForm;
