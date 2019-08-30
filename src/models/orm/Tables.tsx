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
            "landing_destination": { "shape": "text", bulkedit: true},
            "documentation": { "shape": "textarea", bulkedit: true},
            "tags": { "shape": "tag", leftIcon: 'tag', placeholder: 'Optional tags used for categorazation...', bulkedit: false}
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
