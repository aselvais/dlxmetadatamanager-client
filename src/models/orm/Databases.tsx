import AbstractModel from "./AbstractModel";
import { databasesSchema, formConfigSchema } from "../interfaces";


/**
 * Singleton model for Databases
 */
class Databases extends AbstractModel
{
    public name : string = 'databases';
    public document : databasesSchema = {};
    public collection : Array<databasesSchema> = [];
    public formConfig : formConfigSchema = {
        showButton: true,
        buttonAction: 'updateOne',
        fill: true,
        vertical: true,
        elements: {
            should_ignore: { shape: 'switch' },
            name: { shape: "text", diabled: true},
            schema : { shape: "text", diabled: true},
            storageengine : { shape: "text", diabled: true},
            vendorbrand : { shape: "text", diabled: true},
            documentation: { shape: "textarea"},
            tags: { shape: "tag", leftIcon: 'tag', placeholder: 'Optional tags used for categorazation...'},
            timezone: {shape: "timezone"},
            parent_id: {shape: "text", diabled: true}
        }
    };


}

export default new Databases();
