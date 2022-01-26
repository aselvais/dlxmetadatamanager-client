import AbstractModel from "./AbstractModel";
import {UsersSchema, formConfigSchema} from '../interfaces';
import { toJS, observable } from 'mobx';
import Cookies from 'universal-cookie';
import AccessTokens from "./AccessTokens";
import NavStore from "../NavStore";
import _ from "lodash"

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
    public document : UsersSchema = {};
    /**
     * 
     */
    public collection : Array<UsersSchema> = [];
    /**
     * list of possible roles ordered from weak to strong
     */
    protected roles = [ 'viewer', 'editor', 'admin', 'superadmin', 'god' ];
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
            "role" : { shape: "select", options: ['god', 'superadmin', 'admin', 'editor', 'viewer'] },
            "email" : { shape: "email"},
        },
        elementssearch:
        {
            "id": { shape: "text"},
            "realm": { shape: "text"},
            "username": { shape: "text"},
            "password": { shape: "text"},
            "email": { shape: "text"},
            "emailVerified": { shape: "text"},        
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
                .then(data => {
                    //@ts-ignore
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
       this.setLoading(true);
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
                this.findOneById(data.userId, true);
            } catch(ee) {}
            this.error = data.error ? data.error : null;
            this.currentAction = null;
            this.setLoading(false);
        });
    }

    /**
     * 
     */
    public getRoleName()
    {
        return (this.document && this.document.realm) ? this.document.realm : null;
    }

    /**
     * Returns true if the current authenticated user is authorized (or part of the role passed as param).
     * @param roleName 
     */
    public isAuthorized(roleName : string = '') : boolean
    {
        //@todo Fix this as it doesnt display after reload (is it should return false but doesn't work)
        if (!this.document.realm) {
            return true;//false;
        }
        return (_.indexOf(this.roles, this.document.realm) >= _.indexOf(this.roles, roleName));
    }

    /**
     * 
     */
    public logout()
    {
        this.setLoading(true);
        this.currentAction = 'loggingout';
        /*
        fetch(
            this.getApiUrl() + '/logout', 
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
         .then(data => data);*/
         if (this.cookies.get('dlxmttoken')) {
            this.cookies.remove('dlxmttoken');
        }
        NavStore.setActive('SearchScreen');
        this.resetData();
    }

    /**
     * Reinit model
     */
    public resetData()
    {
        // super.resetData();
        this.token = null;
        this.document = {};
        this.collection = [];
        this.setLoading(false);
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
            try {
                // console.log('---------------- 3 -------------------');
                // this.token = this.cookies.get('dlxmttoken');
                // AccessTokens.tokenToUser(this.cookies.get('dlxmttoken'));
                // return this.cookies.get('dlxmttoken');
            } catch(ee) {
                // console.error('Error getting token');
            }
        }
        return this.token;
    }

    /**
     * 
     */
    public initUserFromToken()
    {
        return AccessTokens.tokenToUser(this.getToken()).then(u => {
            //console.log(u);
        });

    }

}

export default new Users();
