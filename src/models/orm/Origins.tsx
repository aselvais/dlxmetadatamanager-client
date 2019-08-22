import AbstractModel from "./AbstractModel";
import { originsSchema, formConfigSchema } from "../interfaces";

/**
 * Singleton model for Origins
 */
class Origins extends AbstractModel
{
    public name : string = 'origins';
    public document : originsSchema = {};
    public collection : Array<originsSchema> = [];
    public formConfig : formConfigSchema = {
        showButton: true,
        buttonAction: 'updateOne',
        fill: true,
        vertical: true,
        elements: {
            "should_ignore": { "shape": "switch", bulkedit: true },
            "name": { "shape": "text", bulkedit: true },
            "organization": { "shape": "text"}, bulkedit: true,
            "app_code" : { "shape": "text", bulkedit: false },
            "cust_type" : { "shape": "text", bulkedit: true },
            "customer_source" : { "shape": "text", bulkedit: true },
            "business_contact" : { "shape": "text", bulkedit: true },
            "cdc_enabled":  { "shape": "switch", bulkedit: true },
            "owner":  { "shape": "text", bulkedit: true },
            "tags": { "shape": "tag", "leftIcon": "tag", "placeholder": "Optional tags used for categorazation...", bulkedit: true},
            "documentation": { "shape": "textarea", bulkedit: true},
            "notes": { "shape": "textarea", bulkedit: true}
        }
    };

    /**
     * 
     * @param name 
     * @param filter 
     */
    public findentity(name : string = '', filter : object = {})
    {
        return this._findentity('origins', name, filter);
    }

}

export default new Origins();
