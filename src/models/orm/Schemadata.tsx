import AbstractModel from "./AbstractModel";
import { schemadataSchema, latesttokensSchema } from "../interfaces";
import { observable } from "mobx";

/**
 * Singleton model for Schemadata
 */
class Schemadata extends AbstractModel {
	/** */
	public name: string = "schemadata";
	/** */
	public document: schemadataSchema | null = null;
	/** */
	public collection: Array<schemadataSchema> | null = null;
	/** */
	@observable public latestrawschemadata = [];
	/** */
	@observable public latesttokens : Array<latesttokensSchema> = [];

	/**
	 *
	 * @param tableName
	 */
	public getTableMetaData(tableName: string = ""): void {
		this.find({ where: { TABLE_NAME: tableName } });
	}

	/**
	 *
	 * @param collectionname
	 * @param field
	 * @param limit
	 */
	public getAggregationCustom(
		collectionname: string = "",
		field: string = "",
		limit: number = 20
	) {
		this.loading = true;
		return this.fetchAutenticated(
			this.getApiUrl() +
				"/aggregation/custom?collectionname=" +
				collectionname +
				"&field=" +
				field +
				"&limit=" +
				limit /* + encodeURI(JSON.stringify(where)) */
		)
			.then(response => response.json())
			.then(data => {
				//@ts-ignore
				this.error = data.error ? data.error : null;
				// this.collection = data;
				// this.onCollectionUpdated();
				this.loading = false;
				return data;
			});
	}

	/**
	 *
	 * @param collectionname
	 * @param field
	 * @param limit
	 */
	public getlatestrawschemadata(
		entityLevel: "origin" | "database" | "schema" | "table" | "column" = "origin",
		filter: object = {}
	) {
		this.loading = true;
		this.latestrawschemadata = [];
		return this.fetchAutenticated(
			this.getApiUrl() +
				"/streamsets/getlatestrawschemadata?entityLevel=" +
				entityLevel /* + '&filter=' + filter */
		)
			.then(response => response.json())
			.then(data => {
				//@ts-ignore
				this.error = data.error ? data.error : null;
				this.loading = false;
				this.latestrawschemadata = data.pipeline ? data.pipeline : [];
			});
	}

	/**
	 *
	 */
	public getlatesttokens() {
		this.loading = true;
		this.latesttokens = [];
		return this.fetchAutenticated(this.getApiUrl() + "/getlatesttokens")
			.then(response => response.json())
			.then(data => {
				//@ts-ignore
				this.error = data.error ? data.error : null;
				this.loading = false;
				this.latesttokens = data.data ? data.data : [];
			});
	}
}

export default new Schemadata();
