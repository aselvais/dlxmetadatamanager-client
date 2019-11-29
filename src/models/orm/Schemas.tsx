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
            "name": { "shape": "text", disabled: true, bulkedit: false},
            "databases_id": { "shape": "link", bulkedit: true },
            "schema" : { "shape": "text", disabled: true, bulkedit: false},
            "storageengine" : { "shape": "text", disabled: true, bulkedit: false},
            "vendorbrand" : { "shape": "text", disabled: true, bulkedit: false},
            "documentation": { "shape": "textarea", bulkedit: true},
            "tags": { "shape": "tag", leftIcon: 'tag', placeholder: 'Optional tags used for categorazation...', bulkedit: false},
            "timezone": {"shape": "timezone", bulkedit: true},
            "parent_id": {"shape": "text", disabled: true, bulkedit: false}
        },
        elementssearch:{
            "idh": {"shape": "text"},
            "databases_idh": {"shape": "text"},
            "schemadata_id": {"shape": "text"},
            "name": {"shape": "text"},
            "should_ignore": {"shape": "text"},
            "documentation": {"shape": "text"},
            "tags": {"shape": "text"},
            "schema": {"shape": "text"},
            "storageengine": {"shape": "text"},
            "vendorbrand": {"shape": "text"},
            "timezone": {"shape": "text"},
            "parent_id": {"shape": "text"},
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
