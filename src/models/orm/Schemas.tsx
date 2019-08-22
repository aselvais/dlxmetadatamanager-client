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
            "should_ignore": { "shape": 'switch', bulkedit: true },
            "name": { "shape": "text", diabled: true, bulkedit: false},
            "schema" : { "shape": "text", diabled: true, bulkedit: false},
            "storageengine" : { "shape": "text", diabled: true, bulkedit: false},
            "vendorbrand" : { "shape": "text", diabled: true, bulkedit: false},
            "documentation": { "shape": "textarea", bulkedit: true},
            "tags": { "shape": "tag", leftIcon: 'tag', placeholder: 'Optional tags used for categorazation...', bulkedit: false},
            "timezone": {"shape": "timezone", bulkedit: true},
            "parent_id": {"shape": "text", diabled: true, bulkedit: false}
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
