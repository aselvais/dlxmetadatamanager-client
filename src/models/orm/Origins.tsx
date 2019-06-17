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
            should_ignore: { shape: 'switch' },
            name: { shape: "text" },
            organization: { shape: "text"},
            app_code : { shape: "text" },
            cust_type : { shape: "text" },
            customer_source : { shape: "text" },
            business_contact : { shape: "text" },
            cdc_enabled:  { shape: "switch" },
            owner:  { shape: "text" },
            tags: { shape: "tag", leftIcon: 'tag', placeholder: 'Optional tags used for categorazation...'},
            documentation: { shape: "textarea"},
            notes: { shape: "textarea"},
        }
    };

}

export default new Origins();
