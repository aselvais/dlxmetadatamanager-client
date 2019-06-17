import AbstractModel from "./AbstractModel";
import { fieldsSchema, formConfigSchema } from "../interfaces";


/**
 * Singleton model for Databases
 */
class Fields extends AbstractModel
{
    public name : string = 'fields';
    public document : fieldsSchema = {};
    public collection : Array<fieldsSchema> = [];
    public formConfig : formConfigSchema = {
        showButton: true,
        buttonAction: 'updateOne',
        fill: true,
        vertical: true,
        elements: {
            should_ignore: { shape: 'switch' },
            name: { shape: "text", diabled: true},
            datatype: { shape: "text", diabled: true},
            datalength: { shape: "text", diabled: true},
            charset: { shape: "text", diabled: true},
            group: { shape: "tag", leftIcon: "folder-close", placeholder: 'Optional group in which this field is part of...'},
            semantic_type: { shape: "tag", leftIcon: "comment", placeholder: 'Meaning of the field (Address, zip, customer, ...)'},
            is_pii: { shape: 'switch' },
            is_pci: { shape: 'switch' },
            to_lower: { shape: 'switch' },
            is_cdc_field:  { shape: 'switch' },
            documentation: { shape: "textarea"},
            tags: { shape: "tag", leftIcon: 'tag', placeholder: 'Optional tags used for categorazation...'},
            is_pk: { shape: 'switch' },
            is_fk: { shape: 'switch' },
            linked_to: {shape: "text", diabled: true}
        }
    };


}

export default new Fields();
