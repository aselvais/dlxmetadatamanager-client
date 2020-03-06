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
            "systems_id": { "shape": "link", bulkedit: true },
            "organization": { "shape": "text", bulkedit: true},
            "app_code" : { "shape": "text", bulkedit: false },
            "cust_type" : { "shape": "text", bulkedit: true },
            "customer_source" : { "shape": "text", bulkedit: true },
            "business_contact" : { "shape": "text", bulkedit: true },
            "cdc_enabled":  { "shape": "switch", bulkedit: true },
            "owner":  { "shape": "text", bulkedit: true },
            "tags": { "shape": "tag", "leftIcon": "tag", "placeholder": "Optional tags used for categorazation...", bulkedit: false},
            "documentation": { "shape": "textarea", bulkedit: true},
            "notes": { "shape": "textarea", bulkedit: true}
        },
        elementssearch:
        {
            "id": {"shape": "text"},
            "idh": {"shape": "text"},
            "schemadata_id": {"shape": "text"},
            "systems_id": {"shape": "text"},
            "systems_idh": {"shape": "text"},
            "should_ignore": {"shape": "text"},
            "name": {"shape": "text"},
            "organization": {"shape": "text"},
            "app_code": {"shape": "text"},
            "cust_type": {"shape": "text"},
            "customer_source": {"shape": "text"},
            "business_contact": {"shape": "text"},
            "cdc_enabled": {"shape": "text"},
            "owner": {"shape": "text"},
            "tags": {"shape": "text"},
            "documentation": {"shape": "text"},
            "notes": {"shape": "text"},
        }
    };

    /**
     * 
     * @param name 
     * @param filter 
     */
    public findentity(
        name : string = '', 
        filter : object = {},
        casesensitive: boolean = false,
        matchtype: 'exact' | 'starts' | 'ends' | 'any' = 'any'
    )
    {
        return this._findentity('origins', name, filter, casesensitive, matchtype);
    }

}

export default new Origins();
