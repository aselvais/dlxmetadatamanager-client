import AbstractModel from "./AbstractModel";

/**
 * Description of a databases document
 */
interface fieldsSchema {
    [key:string]: any,
    "name"?: string,
    "datatype"?: string,
    "datalength"?: number,
    "charset"?: string,
    "tables_id"?: string,
    "schemadata_id"?: string,
    "documentation"?: string,
    "properties"?: object,
    "tags"?: Array<string>
};

/**
 * Singleton model for Databases
 */
class Fields extends AbstractModel
{
    protected name : string = 'fields';
    public entry : fieldsSchema = {};
    public collection : Array<fieldsSchema> = [];

}

export default new Fields();
