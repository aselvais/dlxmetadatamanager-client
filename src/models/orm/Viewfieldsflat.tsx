import AbstractModel from "./AbstractModel";
import { formConfigSchema, ViewfieldsflatSchema } from "../interfaces";

class Viewfieldsflat extends AbstractModel {
	public name: string = "viewfieldsflat";
	public document: ViewfieldsflatSchema = {};
	public collection: Array<ViewfieldsflatSchema> = [];
	public formConfig: formConfigSchema = {
		showButton: true,
		fill: true,
		vertical: true,
		elements: {}
	};


}

export default new Viewfieldsflat();
