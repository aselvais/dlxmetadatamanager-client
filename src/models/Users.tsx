import AbstractModel from "./AbstractModel";
import {UsersSchema, formConfigSchema} from './interfaces';

/**
 * Singleton model for Origins
 */
class Users extends AbstractModel
{
    protected name : string = 'Users';
    public document : UsersSchema = {};
    public collection : Array<UsersSchema> = [];
    public formConfig : formConfigSchema = {
        "id" : false,
        "realm" : { shape: "select"},
        "username" : { shape: "text"},
        "password" : { shape: "password"},
        "email" : { shape: "email"},
        "emailVerified" : false
    };

}

export default new Users();
