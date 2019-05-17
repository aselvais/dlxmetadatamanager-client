import AbstractModel from "./AbstractModel";
import { databasesSchema } from "./interfaces";


/**
 * Singleton model for Databases
 */
class Databases extends AbstractModel
{
    protected name : string = 'databases';
    public document : databasesSchema = {};
    public collection : Array<databasesSchema> = [];

}

export default new Databases();
