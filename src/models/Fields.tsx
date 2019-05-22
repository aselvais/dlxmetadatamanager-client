import AbstractModel from "./AbstractModel";
import { fieldsSchema, formConfigSchema } from "./interfaces";


/**
 * Singleton model for Databases
 */
class Fields extends AbstractModel
{
    protected name : string = 'fields';
    public document : fieldsSchema = {};
    public collection : Array<fieldsSchema> = [];
    public formConfig : formConfigSchema = {
        showButton: true,
        fill: true,
        vertical: true,
        elements: {
            name: { shape: "text"},
            datatype: { shape: "text"},
            datalength: { shape: "text"},
            charset: { shape: "text"},
            documentation: { shape: "text"},
            properties: { shape: "text" },
            tags: { shape: "text"},
        }
    };


}

export default new Fields();
