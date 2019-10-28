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
            "should_ignore": { "shape": 'switch', bulkedit: true },
            "name": { "shape": "text", bulkedit: false },
            "code": { "shape": "text", bulkedit: false },
            "storageengine" : { "shape": "text", bulkedit: false},
            "vendorbrand" : { "shape": "text", bulkedit: false},
            "documentation": { "shape": "textarea", bulkedit: true},
            "tags": { "shape": "tag", leftIcon: 'tag', placeholder: 'Optional tags used for categorazation...', bulkedit: false},
            "timezone": {"shape": "timezone", bulkedit: true},
            "parent_id": {"shape": "text", bulkedit: false},

            "app_name" : {"shape": "text", bulkedit: false},
            "network" : {"shape": "text", bulkedit: false},
            "hosted_area" : {"shape": "text", bulkedit: false},
            "in_bidm" : {"shape": "switch", bulkedit: true},
            "deluxe_name" : {"shape": "text", bulkedit: false},
            "firewall" : {"shape": "switch", bulkedit: true},

            "instance_name" : {"shape": "text", bulkedit: false},
            "schema_name" : {"shape": "text", bulkedit: false},
            "username" : {"shape": "text", bulkedit: false},
            "password" : {"shape": "text", bulkedit: false},
            "hostname" : {"shape": "text", bulkedit: false},
            "sid" : {"shape": "text", bulkedit: false},
            "ip" : {"shape": "text", bulkedit: false},
            "port" : {"shape": "text", bulkedit: false},

            "jdbc_connection_str" : {"shape": "text", bulkedit: false}

        }
    };

    /**
     * 
     * @param name 
     * @param filter 
     */
    public findentity(name : string = '', filter : object = {})
    {
        return this._findentity('databases', name, filter);
    }


}

export default new Databases();
