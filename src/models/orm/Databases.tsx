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
            "origins_id": { "shape": "link", bulkedit: false, disabled: false },
            // "code": { "shape": "text", bulkedit: false },
            "storageengine" : { "shape": "text", bulkedit: false},
            "vendorbrand" : { "shape": "text", bulkedit: false},
            "documentation": { "shape": "textarea", bulkedit: true},
            "tags": { "shape": "tag", leftIcon: 'tag', placeholder: 'Optional tags used for categorazation...', bulkedit: false},
            // "timezone": {"shape": "timezone", bulkedit: true},
            "parent_id": {"shape": "text", bulkedit: false},

            // "app_name" : {"shape": "text", bulkedit: false},
            // "network" : {"shape": "text", bulkedit: false},
            // "hosted_area" : {"shape": "text", bulkedit: false},
            // "in_bidm" : {"shape": "switch", bulkedit: true},
            // "deluxe_name" : {"shape": "text", bulkedit: false},
            // "firewall" : {"shape": "switch", bulkedit: true},

            // "instance_name" : {"shape": "text", bulkedit: false},
            // "schema_name" : {"shape": "text", bulkedit: false},
            "username" : {"shape": "text", bulkedit: false},
            "password" : {"shape": "text", bulkedit: false},
            "hostname" : {"shape": "text", bulkedit: false},
            "sid" : {"shape": "text", bulkedit: false},
            "ip" : {"shape": "text", bulkedit: false},
            "port" : {"shape": "text", bulkedit: false},

            "jdbc_connection_str" : {"shape": "text", bulkedit: false}
        },
        elementssearch: {
            "id": {"shape": "text"},
            "name": {"shape": "text"},
            "code": {"shape": "text"},
            "origins_id": {"shape": "text"},
            "vendorbrand": {"shape": "text"},
            "storageengine": {"shape": "text"},
            "idh": {"shape": "text"},
            "origins_idh": {"shape": "text"},
            "schemadata_id": {"shape": "text"},
            "should_ignore": {"shape": "text"},
            "documentation": {"shape": "text"},
            "tags": {"shape": "text"},
            "timezone": {"shape": "text"},
            "parent_id": {"shape": "text"},
            "app_name": {"shape": "text"},
            "network": {"shape": "text"},
            "hosted_area": {"shape": "text"},
            "in_bidm": {"shape": "text"},
            "deluxe_name": {"shape": "text"},
            "firewall": {"shape": "text"},
            "instance_name": {"shape": "text"},
            "schema_name": {"shape": "text"},
            "username": {"shape": "text"},
            "password": {"shape": "text"},
            "hostname": {"shape": "text"},
            "sid": {"shape": "text"},
            "ip": {"shape": "text"},
            "port": {"shape": "text"},
            "jdbc_connection_str": {"shape": "text"},
        }
    };

    /**
     * 
     * @param name 
     * @param filter 
     */
    public findentity(name : string = '', filter : object = {},
    casesensitive: boolean = false,
    matchtype: 'exact' | 'starts' | 'ends' | 'any' = 'any')
    {
        return this._findentity('databases', name, filter, casesensitive, matchtype);
    }


}

export default new Databases();
