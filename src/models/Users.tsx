import AbstractModel from "./AbstractModel";
import {UsersSchema, formConfigSchema} from './interfaces';
import { observable } from "mobx";

/**
 * Singleton model for Origins
 */
class Users extends AbstractModel
{
    public name : string = 'Users';
    /**
     * Token we receive from the auth API
     */
    @observable private token : string | null = null;
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
        buttonAction: 'login',
        fill: true,
        vertical: true,
        elements: {
            "username" : { shape: "text"},
            "password" : { shape: "password"}
        }
    };

    /**
     * 
     */
    login()
    {
       this.loading = true;
       fetch(this.getApiUrl() + '/login', {
           method: 'POST',
           body: JSON.stringify(this.getDocument()),
           headers: new Headers({'Content-Type': 'application/json'})
       })
        .then(response => response.json())
        .then(data => {
            this.token = data.id ? data.id : null;
            try {
                this.document.id = data.userId;
                this.document.password = null;
            } catch(ee) {}
            this.error = data.error ? data.error : null;
            this.loading = false;
        });
    }
    
    /**
     * Returns the token if any
     */
    public getToken() : string | null
    {
        return this.token;
    }

}

export default new Users();
