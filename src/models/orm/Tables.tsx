import AbstractModel from "./AbstractModel";
import { tablesSchema, formConfigSchema } from "../interfaces";

/**
 * Singleton model for Tables
 */
class Tables extends AbstractModel
{
    public name : string = 'tables';
    public document : tablesSchema = {};
    public collection : Array<tablesSchema> = [];
    public formConfig : formConfigSchema = {
        showButton: true,
        buttonAction: 'updateOne',
        fill: true,
        vertical: true,
        elements: {
            "should_ignore": { "shape": 'switch', bulkedit: true },
            "is_gdpr": {"shape": 'switch', bulkedit: true},
            "name": { "shape": "text", disabled: true, bulkedit: false},
            "schemas_id": { "shape": "link", bulkedit: true },
            "landing_destination": { "shape": "text", bulkedit: true},
            "documentation": { "shape": "textarea", bulkedit: true},
            "tags": { "shape": "tag", leftIcon: 'tag', placeholder: 'Optional tags used for categorazation...', bulkedit: false}
        },
        elementssearch:
        {
            "id": { "shape": "text"},
            "storageengine": { "shape": "text"},
            "databases_id": { "shape": "text"},
            "idh": { "shape": "text"},
            "schemas_idh": { "shape": "text"},
            "schemadata_id": { "shape": "text"},
            "should_ignore": { "shape": "text"},
            "is_gdpr": { "shape": "text"},
            "name": { "shape": "text"},
            "landing_destination": { "shape": "text"},
            "documentation": { "shape": "text"},
            "tags": { "shape": "text"},           
        }
    };

    /**
     * 
     * @param name 
     * @param filter 
     */
    public findentity(name : string = '', filter : object = {})
    {
        return this._findentity('tables', name, filter);
    }

}

export default new Tables();
