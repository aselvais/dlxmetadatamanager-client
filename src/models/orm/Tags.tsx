import AbstractModel from "./AbstractModel";
import { tagsSchema } from "../interfaces";

/**
 * Singleton model for Tags
 */
class Tags extends AbstractModel
{
    /**
     * 
     */
    public name : string = 'tags';
    /**
     * 
     */
    public document : tagsSchema = {};
    /**
     * 
     */
    public collection : Array<tagsSchema> = [];
}

export default new Tags();
