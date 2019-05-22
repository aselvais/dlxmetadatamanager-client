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
            name: { shape: "text"},
            schema : { shape: "text"},
            storageengine : { shape: "text"},
            vendorbrand : { shape: "text"},
            documentation: { shape: "text"},
        }
    };


}

export default new Databases();
