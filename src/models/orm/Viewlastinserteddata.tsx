import AbstractModel from "./AbstractModel";
import { formConfigSchema, ViewlastinserteddataSchema } from "../interfaces";

class Viewlastinserteddata extends AbstractModel {
	public name: string = "viewlastinserteddata";
	public document: ViewlastinserteddataSchema = {};
	public collection: Array<ViewlastinserteddataSchema> = [];
	public formConfig: formConfigSchema = {
		showButton: true,
		fill: true,
		vertical: true,
		elements: {
            "id": { "shape": "text"},
            "name_systems": { "shape": "text"},
            "name_origins": { "shape": "text"},
            "name_databases": { "shape": "text"},
            "name_schemas": { "shape": "text"},
            "name_table": { "shape": "text"},
            "name_field": { "shape": "text"},
            "date_systems": { "shape": "text"},
            "date_origins": { "shape": "text"},
            "date_schemas": { "shape": "text"},
            "date_tables": { "shape": "text"},
            "date_field": { "shape": "text"},
		},
		elementssearch: {
            "id": { "shape": "text"},
            "name_systems": { "shape": "text"},
            "name_origins": { "shape": "text"},
            "name_databases": { "shape": "text"},
            "name_schemas": { "shape": "text"},
            "name_table": { "shape": "text"},
            "name_field": { "shape": "text"},
            "date_systems": { "shape": "text"},
            "date_origins": { "shape": "text"},
            "date_schemas": { "shape": "text"},
            "date_tables": { "shape": "text"},
            "date_field": { "shape": "text"},
		}		
	};


}

export default new Viewlastinserteddata();
