import AbstractModel from "./AbstractModel";
import { formConfigSchema, ViewapplogactionsSchema } from "../interfaces";

class Viewapplogactions extends AbstractModel {
	public name: string = "viewapplogactions";
	public document: ViewapplogactionsSchema = {};
	public collection: Array<ViewapplogactionsSchema> = [];
	public formConfig: formConfigSchema = {
		showButton: true,
		fill: true,
		vertical: true,
		elements: {}
	};


}

export default new Viewapplogactions();

