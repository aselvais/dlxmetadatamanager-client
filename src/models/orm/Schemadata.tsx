import AbstractModel from "./AbstractModel";
import { schemadataSchema } from "../interfaces";

/**
 * Singleton model for Schemadata
 */
class Schemadata extends AbstractModel
{
    /**
     * 
     */
    public name : string = 'schemadata';
    /**
     * 
     */
    public document : schemadataSchema | null = null;
    /**
     * 
     */
    public collection : Array<schemadataSchema> | null = null;

    /**
     * 
     * @param tableName 
     */
    public getTableMetaData(tableName : string = '') : void
    {
        this.find({"where": {"TABLE_NAME": tableName}});
    }

}

export default new Schemadata();
