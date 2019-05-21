import AbstractModel from "./AbstractModel";
import {UsersSchema, formConfigSchema} from './interfaces';

/**
 * Singleton model for Origins
 */
class Users extends AbstractModel
{
    protected name : string = 'Users';
    /**
     * Token we receive from the auth API
     */
    private token : string | null = '45565446556645'; // null;
    public document : UsersSchema = {};
    public collection : Array<UsersSchema> = [];
    /**
     * Edition form configuration
     */
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
    /**
     * Login form configuration
     */
    public formConfigLogin : formConfigSchema = {
        showButton: true,
        fill: true,
        vertical: true,
        elements: {
            "username" : { shape: "text"},
            "password" : { shape: "password"}
        }
    };
    /**
     * Returns the token if any
     */
    public getToken() : string | null
    {
        return this.token;
    }

}

export default new Users();
