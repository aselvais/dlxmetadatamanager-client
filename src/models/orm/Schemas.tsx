import AbstractModel from "./AbstractModel";
import { formConfigSchema, schemasSchema } from "../interfaces";


/**
 * Singleton model for Databases
 */
class Schemas extends AbstractModel
{
    public name : string = 'schemas';
    public document : schemasSchema = {};
    public collection : Array<schemasSchema> = [];
    public formConfig : formConfigSchema = {
        showButton: true,
        buttonAction: 'updateOne',
        fill: true,
        vertical: true,
        elements: {
            "should_ignore": { "shape": 'switch' },
            "name": { "shape": "text", diabled: true},
            "schema" : { "shape": "text", diabled: true},
            "storageengine" : { "shape": "text", diabled: true},
            "vendorbrand" : { "shape": "text", diabled: true},
            "documentation": { "shape": "textarea"},
            "tags": { "shape": "tag", leftIcon: 'tag', placeholder: 'Optional tags used for categorazation...'},
            "timezone": {"shape": "timezone"},
            "parent_id": {"shape": "text", diabled: true}
        }
    };

    /**
     * 
     * @param name 
     * @param filter 
     */
    public findentity(name : string = '', filter : object = {})
    {
        return this._findentity('schemas', name, filter);
    }


}

export default new Schemas();
