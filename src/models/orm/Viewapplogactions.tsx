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
		elements: {
			"id": { "shape": "text"},
			"User_id": { "shape": "text"},
			"username": { "shape": "text"},
			"document_id": { "shape": "text"},
			"schemadata_id": { "shape": "text"},
			"idh": { "shape": "text"},
			"insertdate": { "shape": "text"},
			"applog_createddate": { "shape": "text"},
			"document_createddate": { "shape": "text"},
			"schemadata_createddate": { "shape": "text"},
			"action": { "shape": "text"},
			"collection": { "shape": "text"},
			"database_name": { "shape": "text"},
			"schema_name": { "shape": "text"},
			"table_name": { "shape": "text"},
			"column_name": { "shape": "text"},
		},
		elementssearch: {
			"id": { "shape": "text"},
			"User_id": { "shape": "text"},
			"username": { "shape": "text"},
			"document_id": { "shape": "text"},
			"schemadata_id": { "shape": "text"},
			"idh": { "shape": "text"},
			"insertdate": { "shape": "text"},
			"applog_createddate": { "shape": "text"},
			"document_createddate": { "shape": "text"},
			"schemadata_createddate": { "shape": "text"},
			"action": { "shape": "text"},
			"collection": { "shape": "text"},
			"database_name": { "shape": "text"},
			"schema_name": { "shape": "text"},
			"table_name": { "shape": "text"},
			"column_name": { "shape": "text"},
		}
	};


}

export default new Viewapplogactions();

