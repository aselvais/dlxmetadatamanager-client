import AbstractModel from "./AbstractModel";
import { originsSchema, formConfigSchema } from "./interfaces";

/**
 * Singleton model for Origins
 */
class Origins extends AbstractModel
{
    protected name : string = 'origins';
    public document : originsSchema = {};
    public collection : Array<originsSchema> = [];
    public formConfig : formConfigSchema = {
        showButton: true,
        fill: true,
        vertical: true,
        elements: {
            name: { shape: "text", diabled: true},
            organization: { shape: "text", diabled: true},
            host: { shape: "text", diabled: true},
            documentation: { shape: "textarea"},
        }
    };


}

export default new Origins();
