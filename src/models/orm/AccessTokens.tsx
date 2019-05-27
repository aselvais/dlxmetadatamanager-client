import AbstractModel from "./AbstractModel";
import { AccessTokensSchema } from "../interfaces";

/**
 * Singleton model for Tags
 */
class AccessTokens extends AbstractModel
{
    public name : string = 'AccessTokens';
    public document : AccessTokensSchema = {};
    public collection : Array<AccessTokensSchema> = [];

    /**
     * 
     * @param token 
     */
    public tokenToUser(token: string = null)
    {
        // this.findRelated('user', token);
    }



}

export default new AccessTokens();
