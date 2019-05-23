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
}

export default new AccessTokens();
