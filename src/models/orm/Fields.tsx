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
            "name": { "shape": "text", disabled: true, bulkedit: false},
            "tables_id": { "shape": "link", bulkedit: false, disabled: true },
            "datatype": { "shape": "text", disabled: true, bulkedit: false},
            "datalength": { "shape": "text", disabled: true, bulkedit: false},
            "charset": { "shape": "text", disabled: true, bulkedit: false},
            "group": { "shape": "tag", leftIcon: "folder-close", placeholder: 'Optional group in which this field is part of...', bulkedit: true},
            "semantic_type": { "shape": "tag", leftIcon: "comment", placeholder: 'Meaning of the field (Address, zip, customer, ...)', bulkedit: true},
            "is_gdpr": {"shape": 'switch', bulkedit: true},
            "is_pii": { "shape": 'switch', bulkedit: true },
            "is_pci": { "shape": 'switch', bulkedit: true },
            "to_lower": { "shape": 'switch', bulkedit: true },
            "is_cdc_field":  { "shape": 'switch', bulkedit: true },
            "documentation": { "shape": "textarea", bulkedit: true},
            "tags": { "shape": "tag", leftIcon: 'tag', placeholder: 'Optional tags used for categorazation...', bulkedit: false},
            "is_pk": { "shape": 'switch', bulkedit: true },
            "is_fk": { "shape": 'switch', bulkedit: true },
            "linked_to": {"shape": "text", disabled: true, bulkedit: false},
            "is_nullable": {"shape": "switch", disabled: true, bulkedit: false},
            "is_unique": {"shape": "switch", disabled: true, bulkedit: false},
            "keyorder": {"shape": "text", disabled: true, bulkedit: false},
            "has_index": {"shape": "switch", disabled: true, bulkedit: false},
            "index_name": {"shape": "text", disabled: true, bulkedit: false},
            "index_position": {"shape": "switch", disabled: true, bulkedit: false},
        },
        elementssearch: {
            "id": {"shape": "text"},
            "name": {"shape": "text"},
            "datatype": {"shape": "text"},
            "datalength": {"shape": "text"},
            "charset": {"shape": "text"},
            "tables_id": {"shape": "text"},
            "schemadata_id": {"shape": "text"},
            "documentation": {"shape": "text"},
            "properties": {"shape": "text"},
            "tags": {"shape": "text"},
            "idh": {"shape": "text"},
            "tables_idh": {"shape": "text"},
            "should_ignore": {"shape": "text"},
            "is_gdpr": {"shape": "text"},
            "group": {"shape": "text"},
            "semantic_type": {"shape": "text"},
            "is_pii": {"shape": "text"},
            "is_pci": {"shape": "text"},
            "to_lower": {"shape": "text"},
            "is_cdc_field": {"shape": "text"},
            "is_pk": {"shape": "text"},
            "is_fk": {"shape": "text"},
            "linked_to": {"shape": "text"},
            "is_nullable": {"shape": "text"},
            "is_unique": {"shape": "text"},
            "keyorder": {"shape": "text"},
            "has_index": {"shape": "text"},
            "index_name": {"shape": "text"},
            "index_position": {"shape": "text"}        
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
