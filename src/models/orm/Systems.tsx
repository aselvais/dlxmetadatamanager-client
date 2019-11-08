import AbstractModel from "./AbstractModel";
import { systemsSchema, formConfigSchema } from "../interfaces";

/**
 * Singleton model for Systems
 */
class Systems extends AbstractModel
{
    public name : string = 'systems';
    public document : systemsSchema = {};
    public collection : Array<systemsSchema> = [];
    public formConfig : formConfigSchema = {
        showButton: true,
        buttonAction: 'updateOne',
        fill: true,
        vertical: true,
        elements: {
            "should_ignore": { "shape": "switch", bulkedit: true },
            "name": { "shape": "text", bulkedit: true },
            "organization": { "shape": "text", bulkedit: true},
            "code" : { "shape": "text", bulkedit: false },
            "tags": { "shape": "tag", "leftIcon": "tag", "placeholder": "Optional tags used for categorazation...", bulkedit: false},
            "documentation": { "shape": "textarea", bulkedit: true},
            "notes": { "shape": "textarea", bulkedit: true}
        },
        elementssearch: {
            "idh": { "shape": "text"},
            "should_ignore": { "shape": "text"},
            "name": { "shape": "text"},
            "organization": { "shape": "text"},
            "code": { "shape": "text"},
            "tags": { "shape": "text"},
            "documentation": { "shape": "text"},
            "notes": { "shape": "text"},
        }
    };

    /**
     * 
     * @param name 
     * @param filter 
     */
    public findentity(name : string = '', filter : object = {})
    {
        return this._findentity('systems', name, filter);
    }

}

export default new Systems();
