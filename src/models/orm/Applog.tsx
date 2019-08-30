import AbstractModel from "./AbstractModel";
import { formConfigSchema, ApplogSchema } from "../interfaces";

class Applog extends AbstractModel {
	public name: string = "applog";
	public document: ApplogSchema = {};
	public collection: Array<ApplogSchema> = [];
	public formConfig: formConfigSchema = {
		showButton: true,
		//buttonAction: 'updateOne',
		fill: true,
		vertical: true,
		elements: {
			insertdate: { "shape": "text", disabled: true},
			action: { "shape": "text", disabled: true},
			model: { "shape": "text", disabled: true},
			query: { "shape": "text", disabled: true},
			tokenCreated: { "shape": "text", disabled: true},
			User_id: { "shape": "text", disabled: true},
			isNewInstance: { "shape": "switch" , disabled: true},
            description: { "shape": "textarea"}
		}
	};

	/**
	 * 
	 * @param where 
	 * @param include 
	 */
	public find(where : object = {}, include : string = 'user')
	{
		super.find(where, include, 'flattenObject');
	}


}

export default new Applog();
