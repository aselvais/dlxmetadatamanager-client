import AbstractModel from "./AbstractModel";

/**
 * Description of a tags document
 */
interface tagsSchema {
    [key:string]: any,
    "name"?: string,
    "tags_id"?: string,
    "type"?: string,
    "properties"?: object  
};

/**
 * Singleton model for Tags
 */
class Tags extends AbstractModel
{
    protected name : string = 'tags';
    public entry : tagsSchema = {};
    public collection : Array<tagsSchema> = [];

}

export default new Tags();
