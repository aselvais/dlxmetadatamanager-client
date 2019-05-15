import AbstractModel from "./AbstractModel";

/**
 * Description of a databases document
 */
interface tablesSchema {
    [key:string]: any,
    "name"?: string,
    "storageengine"?: string,
    "databases_id"?: string  
};

/**
 * Singleton model for Tables
 */
class Tables extends AbstractModel
{
    protected name : string = 'tables';
    public entry : tablesSchema = {};
    public collection : Array<tablesSchema> = [];

}

export default new Tables();
