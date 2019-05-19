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
        showButton: true,
        fill: true,
        vertical: true,
        elements: {
            "id" : false,
            "realm" : { 
                shape: "select", 
                options: {
                    'root': 'root',
                    'admin': 'admin',
                    'editor': 'editor',
                    'viewer': 'viewer',
                }
            },
            "username" : { shape: "text"},
            "password1" : { shape: "password"},
            "password2" : { shape: "password"},
            "email" : { shape: "email"},
            "emailVerified" : false    
        }
    };

}

export default new Users();
