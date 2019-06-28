import AbstractModel from "./AbstractModel";
import { tablesSchema, formConfigSchema } from "../interfaces";

/**
 * Singleton model for Tables
 */
class Tables extends AbstractModel
{
    public name : string = 'tables';
    public document : tablesSchema = {};
    public collection : Array<tablesSchema> = [];
    public formConfig : formConfigSchema = {
        showButton: true,
        buttonAction: 'updateOne',
        fill: true,
        vertical: true,
        elements: {
            "should_ignore": { "shape": 'switch' },
            "name": { "shape": "text", diabled: true},
            "landing_destination": { "shape": "text"},
            "documentation": { "shape": "textarea"},
            "tags": { "shape": "tag", leftIcon: 'tag', placeholder: 'Optional tags used for categorazation...'}
        }
    };

}

export default new Tables();
