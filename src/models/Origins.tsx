import AbstractModel from "./AbstractModel";
import { originsSchema } from "./interfaces";

/**
 * Singleton model for Origins
 */
class Origins extends AbstractModel
{
    protected name : string = 'origins';
    public document : originsSchema = {};
    public collection : Array<originsSchema> = [];

}

export default new Origins();
