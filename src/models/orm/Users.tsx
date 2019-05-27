import AbstractModel from "./AbstractModel";
import {UsersSchema, formConfigSchema} from '../interfaces';
import { toJS, observable } from 'mobx';
import Cookies from 'universal-cookie';
import AccessTokens from "./AccessTokens";

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
    /**
     * @todo Remove this and use cookies for storing password if needed
     */
    public document : UsersSchema = {username: 'admin', password: 'adminadmin112'};
    /**
     * 
     */
    public collection : Array<UsersSchema> = [];
    /**
     * 
     */
    protected cookies = new Cookies();
    /**
     * Edition form configuration
     */
    public formConfig : formConfigSchema = {
        showButton: true,
        buttonAction: 'updateOne',
        fill: true,
        vertical: true,
        elements: {
            "username" : { shape: "text"},
            "first_name" : { shape: "text"},
            "last_name" : { shape: "text"},
            "company" : { shape: "text"},
            "role" : { shape: "text"},
            "email" : { shape: "email"},
            /*
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
            "password1" : { shape: "password"},
            "password2" : { shape: "password"},
            "emailVerified" : false    
            */
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
    public updateUser()
    {
        if (this.document.password1 === this.document.password2)
        {
            if (!this.document.password1 && this.document.password1 !== '') {
                this.document.password = this.document.password1;
            }
            let d = toJS(this.document);
            let id = d.id;
            delete d.id;
            delete d.password1;
            delete d.password2;
            if (!d.password) delete d.password;
            this.currentAction = 'saving';
            this.fetchAutenticated(this.getApiUrl(id), 'PATCH', d)
                .then(response => response.json())
                .then(data => {
                    this.error = data.error ? data.error : null;
                    for (let i in data)
                    {
                    this.document[i] = data[i];
                    }
                    this.updateDocumentInLocalCollection();
                    this.currentAction = null;
            });
        } else {
            this.error = {
                code: "PASSWORD_DIFFERENT",
                message: "Both password should be the same",
                name: "Error",
                stack: "",
                statusCode: 401
            };
        }
    }

    /**
     * 
     */
    public login()
    {
       this.loading = true;
       this.currentAction = 'loggingin';
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
            this.currentAction = null;
            this.loading = false;
        });
    }

    /**
     * 
     */
    public logout()
    {
        this.loading = true;
        this.currentAction = 'loggingout';

        fetch(
            this.getApiUrl() + '/logout/?access_token=' + this.token, 
            {
            method: 'POST',
            body: JSON.stringify({accessToken: this.token}),
            headers: new Headers({
                'Content-Type': 'application/json', 
                'Authorization': this.token}
                )
            }
        )
         .then(response => response.json())
         .then(data => data);
         if (this.cookies.get('dlxmttoken')) {
            this.cookies.remove('dlxmttoken');
        }
        this.resetData();
    }

    /**
     * Reinit model
     */
    protected resetData()
    {
        // super.resetData();
        this.token = null;
        this.document = {};
        this.collection = [];
        this.loading = false;
    }
    
    /**
     * Returns the token if any
     */
    public getToken() : string | null
    {
        if (this.token && !this.cookies.get('dlxmttoken'))
        {
            this.cookies.set('dlxmttoken', this.token, { path: '/' });
        }
        else if (!this.token && this.cookies.get('dlxmttoken'))
        {
            this.token = this.cookies.get('dlxmttoken');
            AccessTokens.tokenToUser(this.cookies.get('dlxmttoken'));
            return this.cookies.get('dlxmttoken');
        }
        return this.token;
    }

}

export default new Users();
