import AbstractModel from "./AbstractModel";
import { AccessTokensSchema, formConfigSchema } from "../interfaces";

/**
 * Singleton model for Tags
 */
class AccessTokens extends AbstractModel
{
    public name : string = 'AccessTokens';
    public document : AccessTokensSchema = {};
    public collection : Array<AccessTokensSchema> = [];
    public formConfig : formConfigSchema = {
        showButton: true,
        buttonAction: 'updateOne',
        fill: true,
        vertical: true,
        elements: {
            "id": { "shape": "text"},
            "ttl": { "shape": "text"},
            "created": { "shape": "text"},
            "userId": { "shape": "text"}
        }
    };

    /**
     * 
     * @param token 
     */
    public tokenToUser(token: string = null)
    {
        return this.findRelated('user', token);
    }



}

export default new AccessTokens();
