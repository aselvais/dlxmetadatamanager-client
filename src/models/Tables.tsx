import AbstractModel from "./AbstractModel";
import { tablesSchema } from "./interfaces";

/**
 * Singleton model for Tables
 */
class Tables extends AbstractModel
{
    protected name : string = 'tables';
    public document : tablesSchema = {};
    public collection : Array<tablesSchema> = [];
}

export default new Tables();
