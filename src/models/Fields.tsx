import AbstractModel from "./AbstractModel";
import { fieldsSchema } from "./interfaces";


/**
 * Singleton model for Databases
 */
class Fields extends AbstractModel
{
    protected name : string = 'fields';
    public document : fieldsSchema = {};
    public collection : Array<fieldsSchema> = [];

}

export default new Fields();
