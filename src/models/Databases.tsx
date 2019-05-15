import AbstractModel from "./AbstractModel";

/**
 * Description of a databases document
 */
interface databasesSchema {
    [key:string]: any,
    "name"?: string,
    "origins_id"?: string,
    "vendorbrand"?: string,
    "storageengine"?: string
};

/**
 * Singleton model for Databases
 */
class Databases extends AbstractModel
{
    protected name : string = 'databases';
    public entry : databasesSchema = {};
    public collection : Array<databasesSchema> = [];

}

export default new Databases();
