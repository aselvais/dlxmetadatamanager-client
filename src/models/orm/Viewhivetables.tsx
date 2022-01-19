import AbstractModel from "./AbstractModel";
import { formConfigSchema, ViewhivetablesSchema } from "../interfaces";

class Viewhivetables extends AbstractModel {
	public name: string = "viewhivetables";
	// public document: Viewhivetables = {};
	public collection: Array<ViewhivetablesSchema> = [];
	public formConfig: formConfigSchema = {
		showButton: true,
		fill: true,
		vertical: true,
		elements: {
			"id": {"shape": "text"},
			"database": {"shape": "text"},
			"table": {"shape": "text"}
		},
		elementssearch: {
			"id": {"shape": "text"},
			"database": {"shape": "text"},
			"table": {"shape": "text"}
		}		
	};
}

export default new Viewhivetables();
