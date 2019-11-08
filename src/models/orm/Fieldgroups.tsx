import AbstractModel from "./AbstractModel";
import { formConfigSchema, datadictSchema } from "../interfaces";

class Fieldgroups extends AbstractModel
{
    public name : string = 'fieldgroups';
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
        },
        elementssearch: {
            "id": { "shape": "text"},
            "name": { "shape": "text"},
            "description": { "shape": "text"},
            "should_ignore": { "shape": "text"},
        }
    };
}

export default new Fieldgroups();
