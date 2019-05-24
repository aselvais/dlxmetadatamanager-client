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
            name: { shape: "text" },
            organization: { shape: "text"},
            should_ignore: { shape: 'switch' },
            // host: { shape: "text", diabled: true},
            access_status: { shape: "select", options: {
                "Not Yet Requested - Determining Needs": "Not Yet Requested - Determining Needs",
                "Not Yet Requested" : "Not Yet Requested",
                "Requested - Awaiting Approval" : "Requested - Awaiting Approval",
                "Approved - Have Access" : "Approved - Have Access",
                "Already Have Connection" : "Already Have Connection",
            } },
            cdc_enabled:  { shape: "switch" },
            owner:  { shape: "text" },
            tags: { shape: "tag"},
            documentation: { shape: "textarea"},
            notes: { shape: "textarea"},
        }
    };


}

export default new Origins();
