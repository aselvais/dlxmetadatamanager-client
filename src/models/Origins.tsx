import AbstractModel from "./AbstractModel";

/**
 * Description of a databases document
 */
interface originsSchema {
    [key:string]: any,
    "name"?: string,
    "host"?: string,
    "organization"?: string  
};

/**
 * Singleton model for Origins
 */
class Origins extends AbstractModel
{
    protected name : string = 'origins';
    public entry : originsSchema = {};
    public collection : Array<originsSchema> = [];

}

export default new Origins();
