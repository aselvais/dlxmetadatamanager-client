import AbstractModel from "./AbstractModel";
import { formConfigSchema, datadictSchema } from "../interfaces";

class Tags extends AbstractModel
{
    public name : string = 'tags';
    public document : datadictSchema = {};
    public collection : Array<datadictSchema> = [];
    public formConfig : formConfigSchema = {
        showButton: true,
        buttonAction: 'updateOne',
        fill: true,
        vertical: true,
        elements: {
            "should_ignore": { "shape": "switch" },
            "name": { "shape": "text"},
            "description": { "shape": "textarea"}
        }
    };
}

export default new Tags();
