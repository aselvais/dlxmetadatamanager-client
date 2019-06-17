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
            storageengine : { shape: "text", diabled: true},
            vendorbrand : { shape: "text", diabled: true},
            documentation: { shape: "textarea"},
            tags: { shape: "tag", leftIcon: 'tag', placeholder: 'Optional tags used for categorazation...'},
            timezone: {shape: "timezone"},
            parent_id: {shape: "text", diabled: true},

            app_name : {shape: "text"},
            network : {shape: "text"},
            hosted_area : {shape: "text"},
            in_bidm : {shape: "switch"},
            deluxe_name : {shape: "text"},
            firewall : {shape: "switch"},

            instance_name : {shape: "text"},
            schema_name : {shape: "text"},
            username : {shape: "text"},
            password : {shape: "text"},
            hostname : {shape: "text"},
            sid : {shape: "text"},
            ip : {shape: "text"},
            port : {shape: "text"},

            jdbc_connection_str : {shape: "text"}

        }
    };


}

export default new Databases();
