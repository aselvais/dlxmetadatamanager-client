import AbstractModel from "./AbstractModel";
import { formConfigSchema, ViewapplogbulkactionsSchema } from "../interfaces";

class Viewapplogbulkactions extends AbstractModel {
	public name: string = "viewapplogbulk";
	public document: ViewapplogbulkactionsSchema = {};
	public collection: Array<ViewapplogbulkactionsSchema> = [];
	public formConfig: formConfigSchema = {
		showButton: true,
		fill: true,
		vertical: true,
		elements: {}
	};


}

export default new Viewapplogbulkactions();
