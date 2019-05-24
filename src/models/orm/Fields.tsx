import AbstractModel from "./AbstractModel";
import { fieldsSchema, formConfigSchema } from "../interfaces";


/**
 * Singleton model for Databases
 */
class Fields extends AbstractModel
{
    public name : string = 'fields';
    public document : fieldsSchema = {};
    public collection : Array<fieldsSchema> = [];
    public formConfig : formConfigSchema = {
        showButton: true,
        buttonAction: 'updateOne',
        fill: true,
        vertical: true,
        elements: {
            name: { shape: "text", diabled: true},
            is_pii: { shape: 'switch' },
            should_encrypt: { shape: 'switch' },
            should_ignore: { shape: 'switch' },
            datatype: { shape: "text", diabled: true},
            datalength: { shape: "text", diabled: true},
            charset: { shape: "text", diabled: true},
            documentation: { shape: "textarea"},
            tags: { shape: "tag"},
            properties: { shape: "text" },
            is_pk: { shape: 'switch' },
            is_fk: { shape: 'switch' },
            linked_to: {shape: "text", diabled: true}
        }
    };


}

export default new Fields();
