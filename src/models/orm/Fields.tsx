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
            "should_ignore": { "shape": 'switch', bulkedit: true },
            "name": { "shape": "text", diabled: true, bulkedit: false},
            "datatype": { "shape": "text", diabled: true, bulkedit: false},
            "datalength": { "shape": "text", diabled: true, bulkedit: false},
            "charset": { "shape": "text", diabled: true, bulkedit: false},
            "group": { "shape": "tag", leftIcon: "folder-close", placeholder: 'Optional group in which this field is part of...', bulkedit: false},
            "semantic_type": { "shape": "tag", leftIcon: "comment", placeholder: 'Meaning of the field (Address, zip, customer, ...)', bulkedit: false},
            "is_gdpr": {"shape": 'switch', bulkedit: true},
            "is_pii": { "shape": 'switch', bulkedit: true },
            "is_pci": { "shape": 'switch', bulkedit: true },
            "to_lower": { "shape": 'switch', bulkedit: true },
            "is_cdc_field":  { "shape": 'switch', bulkedit: true },
            "documentation": { "shape": "textarea", bulkedit: true},
            "tags": { "shape": "tag", leftIcon: 'tag', placeholder: 'Optional tags used for categorazation...', bulkedit: false},
            "is_pk": { "shape": 'switch', bulkedit: true },
            "is_fk": { "shape": 'switch', bulkedit: true },
            "linked_to": {"shape": "text", diabled: true, bulkedit: false}
        }
    };

    /**
     * 
     * @param name 
     * @param filter 
     */
    public findentity(name : string = '', filter : object = {})
    {
        return this._findentity('fields', name, filter);
    }

}

export default new Fields();
