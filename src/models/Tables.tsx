import AbstractModel from "./AbstractModel";
import { tablesSchema, formConfigSchema } from "./interfaces";

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
        fill: true,
        vertical: true,
        elements: {
            name: { shape: "text", diabled: true},
            documentation: { shape: "textarea"},
            tags: { shape: "tag"},
        }
    };

}

export default new Tables();
