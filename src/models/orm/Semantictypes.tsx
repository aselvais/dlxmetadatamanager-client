import AbstractModel from "./AbstractModel";
import { formConfigSchema, datadictSchema } from "../interfaces";

class Semantictypes extends AbstractModel
{
    public name : string = 'semantictypes';
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
            "parent_id": { "shape": "link", bulkedit: false, disabled: false },
            "description": { "shape": "textarea"}
        },
        elementssearch:
        {
            "id": { "shape": "text"},
            "name": { "shape": "text"},
            "description": { "shape": "text"},
            "should_ignore": { "shape": "text"},  
            "parent_id": { "shape": "text" },  
        }
    };
    
}

export default new Semantictypes();
