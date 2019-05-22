import AbstractModel from "./AbstractModel";
import { databasesSchema, formConfigSchema } from "./interfaces";


/**
 * Singleton model for Databases
 */
class Databases extends AbstractModel
{
    protected name : string = 'databases';
    public document : databasesSchema = {};
    public collection : Array<databasesSchema> = [];
    public formConfig : formConfigSchema = {
        showButton: true,
        fill: true,
        vertical: true,
        elements: {
            name: { shape: "text", diabled: true},
            schema : { shape: "text", diabled: true},
            storageengine : { shape: "text", diabled: true},
            vendorbrand : { shape: "text", diabled: true},
            documentation: { shape: "textarea"},
            tags: { shape: "tag"},
        }
    };


}

export default new Databases();
