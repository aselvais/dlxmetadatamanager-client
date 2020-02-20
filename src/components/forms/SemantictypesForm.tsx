import React, { Component } from "react";
import { observer } from "mobx-react";
import { FormGroup, IconName, MenuItem, TagInput } from "@blueprintjs/core";
import { MultiSelect } from "@blueprintjs/select";
import AbstractModel from "../../models/orm/AbstractModel";
import Semantictypes from "../../models/orm/Semantictypes";
import { formElementConfigSchema, semantictypesSchema } from "../../models/interfaces";
import { toJS, values } from "mobx";

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
    state = {
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
        this.setState({collection: this.getRootTags()});
    }

    /**
     * 
     */
    private getRootTags()
    {
        return Semantictypes.collection.filter((e:semantictypesSchema) => (e.parent_id && e.parent_id !== '') ? false : true );
    }

    /**
     * 
     * @param parent_id 
     */
    private getChildrenTags(parent_id : string)
    {
        return Semantictypes.collection.filter((e:semantictypesSchema) => (e.parent_id && e.parent_id !== '' && e.parent_id === parent_id) ? true : false );
    }

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
            });
        }
        
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
                            active={false}
                            key={tag.id}
                            label={tag.name}
                            shouldDismissPopover={this.state.selected01}
                            onClick={() => this.onTagClick(tag) }
                        />
                    }
                    items={this.state.collection}
                    tagRenderer={(tag: semantictypesSchema ) => tag.name}
                    noResults={<MenuItem disabled={true} text="No results." />}
                    onItemSelect={() => null }
                    selectedItems={this.state.values}
                />
            </FormGroup>
        );
    }


}

export default SemantictypesForm;
