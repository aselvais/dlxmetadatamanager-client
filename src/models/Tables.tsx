import AbstractModel from "./AbstractModel";
import { tablesSchema, formConfigSchema } from "./interfaces";

/**
 * Singleton model for Tables
 */
class Tables extends AbstractModel
{
    protected name : string = 'tables';
    public document : tablesSchema = {};
    public collection : Array<tablesSchema> = [];
    public formConfig : formConfigSchema = {
        showButton: true,
        fill: true,
        vertical: true,
        elements: {
            name: { shape: "text"},
            description: { shape: "text"},
        }
    };

}

export default new Tables();
