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
            name: { shape: "text", diabled: true},
            datatype: { shape: "text", diabled: true},
            datalength: { shape: "text", diabled: true},
            charset: { shape: "text", diabled: true},
            documentation: { shape: "textarea"},
            properties: { shape: "text" },
            tags: { shape: "text"},
        }
    };


}

export default new Fields();
