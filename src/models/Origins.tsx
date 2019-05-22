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
            name: { shape: "text"},
            organization: { shape: "text"},
            host: { shape: "text"},
            documentation: { shape: "text"},
        }
    };


}

export default new Origins();
