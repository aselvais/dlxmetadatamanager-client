import Config from "../Config";
import { toJS, observable, remove } from "mobx";
import {
	formConfigSchema,
	modelErrorSchema,
	tagObjectSchema,
	sortparamsSchema,
	paginationSchema,
	requestDataGlobalSearch,
	responseDataGlobalSearch
} from "../interfaces";
import Users from "./Users";
import _ from "lodash";
import objectIdToTimestamp from 'objectid-to-timestamp';
import moment from "moment";
import StatusBarModel from "../StatusBarModel";

/**
 * Abstract class containing the method for accessing the API
 * and containing a document or a collection of documents.
 */
abstract class AbstractModel {
	/**
	 * Name of the model / collection to be defined in the inheriting classes
	 */
	public name: string = "";
	/**
	 * Container for the error object coming back from the API
	 */
	@observable public error: modelErrorSchema = null;
	/**
	 * Will be true when we are loading the data from the API
	 */
	@observable public loading: boolean = false;
	/**
	 * Time Consuming Operation is in progress so we mask or skeleton something
	 */
	@observable public operationinprogress: boolean = false;
	/**
	 * Status of the model, eg: 'editing', 'saving', ... so the GUI knows what to do.
	 */
	@observable public currentAction:
		| "view"
		| "deleting"
		| "editing"
		| "adding"
		| "saving"
		| "loggingin"
		| "loggingout"
		| "report"
		| null = null;
	/**
	 * Entry (one document) selected or loaded (by findOne for eg)
	 */
	@observable public document: null | object = null;
	/**
	 *
	 */
	@observable public multiple_document: object = {};
	/**
	 * Labels selected ready for bulk update
	 */
	@observable public selected_labels = {};
	/**
	 * Container for the related entries (linked to the current model)
	 */
	@observable public related: object | Array<object> | null = null;
	/**
	 * Collection (array) of documents/entries
	 */
	@observable public collection: null | Array<any> = null;
	public collection_id2idx : Object = {};
	/**
	 * Container object for the possible values of the 'tag' property (if any) of a document
	 */
	@observable public tags: tagObjectSchema = {};
	/**
	 * Container for the aggregations. The key will be the field and the
	 * value is the aggragated data
	 */
	@observable public aggragateddata: object = {};
	/**
	 * ID selected for the navigation inside of the explore screen
	 */
	@observable public selected_parent_id: string = "";
	/**
	 * Selected _id(s) in a collection
	 */
	@observable public selected_items = {};
	/**
	 * Number for pagination and filters
	 */
	@observable public pagination: paginationSchema = {
		perpages: 100,
		pages: 0,
		selected: 1,
		searchstr: "",
		should_ignore: 1,
		tagsfilter: {}
	};
	@observable public sortparams: sortparamsSchema = {
		columnName: "",
		asc: false
	};
	/**
	 *
	 */
	@observable public findentitydata = [];
	/**
	 * Definition of the form for the edition of a this.document
	 */
	public formConfig: formConfigSchema = {
		showButton: true,
		fill: true,
		vertical: true,
		elements: {}
	};
	/**
	 * Array of properties that are of tag type
	 */
	protected _tagFieldNames: Array<string> = [];

	/**
	 * 
	 * @param o 
	 */
	public id2inserteddate(o: object = {}) {
		//@ts-ignore
		o.created_date = o.id ? moment(objectIdToTimestamp(o.id)).format("YYYY-MM-DD") : '';
		return o;
	}

	/**
	 * 
	 * @param v 
	 */
	protected setLoading(v : boolean = false)
	{
		if (v === false) {
			StatusBarModel.text = '';
		}
		if (v === true)
		{
			StatusBarModel.text = 'Loading ' + this.name + ' ...';
		}
		this.loading = v;
	}

	/**
	 *
	 * @param o
	 */
	public flattenObject(o: object = {}) {
		for (let k in o) {
			if (typeof o[k] === "object") 
			{
				for (let i in o[k])
				{
					if (typeof o[k][i] === 'object')
					{
						o[k+ '_'+i] = this.flattenObject(o[k][i]);
						delete o[k+ '_'+i];
					} else {
						o['_'+k+ '_'+i] = o[k][i];
					}
				}
				delete o[k];
			}
		}
		return o;
	}

	/**
	 *
	 */
	public loadAllTags() {
		// setting up the _tagFieldNames list
		if (
			this.formConfig &&
			this.formConfig.elements &&
			this._tagFieldNames.length === 0
		) {
			let ee = [];
			Object.keys(this.formConfig.elements).map(e =>
				//@ts-ignore
				this.formConfig.elements[e].shape &&
				//@ts-ignore
				this.formConfig.elements[e].shape === "tag"
					? ee.push(e)
					: null
			);
			this._tagFieldNames = ee;
		}
		// load the data from the server
		this._tagFieldNames.map(n => this.loadTags(n));
	}

	/**
	 * Load reporting function to be overriden
	 * @param row 
	 */
	public loadReport(row : any)
	{

	}

	/**
	 *
	 * @param tagfieldname
	 */
	public loadTags(tagfieldname: string = "tags", emptyCache: boolean = false) {
		// this.setLoading(true);
		this.tags[tagfieldname] = [];
		this.fetchAutenticated(this.getApiUrl() + "/tags/?field=" + tagfieldname)
			.then(response => response.json())
			.then(data => {
				// this.error = data.error ? data.error : null;
				if (data && data.aggregation && data.aggregation.length) {
					data.aggregation.map(e =>
						e._id ? this.tags[tagfieldname].push(e._id) : null
					);
				}
				// this.setLoading(false);
			});
	}

	/**
	 * Returns the available tags and the field names (keys) of the elements containing a tag type
	 */
	public getTagsFromMemoryCollection() {
		let tagsFieldNames = [];
		let toret = {};
		// Get the fields containg tags
		if (this.formConfig && this.formConfig.elements) {
			for (let i in this.formConfig.elements) {
				if (
					//@ts-ignore
					this.formConfig.elements[i].shape &&
					//@ts-ignore
					this.formConfig.elements[i].shape === "tag"
				)
					tagsFieldNames.push(i);
			}
		}
		// get the tags for each column
		for (var i = 0; i < this.collection.length; i++) {
			for (var it = 0; it < tagsFieldNames.length; it++) {
				let e = tagsFieldNames[it];
				if (!toret[e]) toret[e] = [];
				if (
					this.collection[i][e] &&
					this.collection[i][e].length &&
					this.collection[i][e].length > 0
				)
					toret[e] = [...toret[e], ...this.collection[i][e]];
				toret[e] = _.sortedUniq(toret[e].sort());
			}
		}
		return toret;
	}

	/**
	 *
	 * @param apiUrl
	 * @param method
	 * @param jsonBody
	 */
	fetchAutenticated(
		apiUrl: string = "",
		method: string = "GET",
		jsonBody: object | null = null
	) {
		let params = {
			method: method,
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: Users.getToken()
			})
		};
		if (jsonBody) {
			//@ts-ignore
			params.body = JSON.stringify(jsonBody);
		}
		return fetch(apiUrl, params);
	}

	/**
	 *
	 */
	public getName(): string {
		return this.name;
	}

	/**
	 * Resets the data from the current model to null values
	 */
	public resetData() {
		this.document = null;
		this.multiple_document = {};
		this.collection = null;
		this.collection_id2idx = {};
		this.currentAction = null;
		this.setLoading(false);
		this.operationinprogress = false;
	}

	/**
	 * Take the this.document and update the same one in this.collection
	 */
	public updateDocumentInLocalCollection(deleted: boolean = false): boolean {
		for (let i in this.collection) {
			try {
				//@ts-ignore
				if (this.collection[i].id === this.document.id) {
					if (deleted === true) {
						remove(this.collection, i);
						this.document = null;
					} else this.collection[i] = this.document;
					return true;
				}
			} catch (ee) {}
		}
		this.collection.push(this.document);
		this.onCollectionUpdated();
		return false;
	}

	/**
	 * Returns the document object
	 * @param flatCopy boolean Returns a flat non-mobx copy of the object
	 */
	public getDocument(flatCopy: boolean = true) {
		return flatCopy ? toJS(this.document) : this.document;
	}

	/**
	 *
	 * @param entityLevel
	 * @param name
	 * @param filter
	 */
	protected _findentity(
		entityLevel:
			| "origins"
			| "databases"
			| "schemas"
			| "tables"
			| "fields" = "origins",
		name: string = "",
		filter: object = {}
	) {
		this.setLoading(true);
		this.operationinprogress = true;
		this.findentitydata = [];
		return this.fetchAutenticated(
			Config.getApiUrl() +
				"schemadata/generic/findentity?entityLevel=" +
				entityLevel +
				"&name=" +
				name
		)
			.then(response => response.json())
			.then(data => {
				//@ts-ignore
				this.error = data.error ? data.error : null;
				this.operationinprogress = false;
				this.findentitydata = data.data ? data.data : [];
				this.setLoading(false);
			});
	}

	/**
	 * Returns the full URL of the API to call
	 * @param id Id of the document to return/use
	 */
	protected getApiUrl(id: string = ""): string {
		return Config.getApiUrl(this.name, id);
	}

	/**
	 * Loads a document by Id in this.document
	 * @param id
	 * @doto Set loding to false if there is a failure
	 */
	public findOneById(id: string = "", emptyCache: boolean = false): void {
		// @ts-ignore
		if (!emptyCache && (this.document.id && this.document.id === id)) {
			console.debug(
				'"' +
					this.name +
					'" document "' +
					id +
					'" from cache... Use emptyCache to renew it.'
			);
		} else {
			this.setLoading(true);
			this.operationinprogress = true;
			this.fetchAutenticated(this.getApiUrl(id))
				.then(response => response.json())
				.then(data => {
					//@ts-ignore
					this.error = data.error ? data.error : null;
					this.document = data;
					this.operationinprogress = false;
					this.setLoading(false);
				});
		}
	}

	/**
	 * Sort the local collection on the column name passed as param
	 * @param columnName
	 */
	public sortLocalCollection(columnName: string = "", collectionType = "") {
		if (this.sortparams.columnName === columnName)
			this.sortparams.asc = !this.sortparams.asc;
		else this.sortparams.columnName = columnName;
		if (collectionType === "search") {
			this.findentitydata = _.orderBy(
				toJS(this.findentitydata),
				[this.sortparams.columnName],
				[this.sortparams.asc ? "asc" : "desc"]
			);
		} else {
			// do the sort of the collection here ...
			let dd = _.orderBy(
				toJS(this.collection),
				[this.sortparams.columnName],
				[this.sortparams.asc ? "asc" : "desc"]
			);
			this.updateCollectionId2idx(dd);
			this.collection = dd;
		}
	}

	/**
	 *
	 * @param id .
	 * @param related_model_name
	 */
	public findRelated(related_model_name: string = "", this_model_id = null) {
		//@ts-ignore
		if (this_model_id === null && this.document && this.document.id) {
			//@ts-ignore
			this_model_id = this.document.id;
		}

		this.setLoading(true);
		this.operationinprogress = true;
		return this.fetchAutenticated(
			this.getApiUrl(this_model_id) + "/" + related_model_name
		)
			.then(response => response.json())
			.then(data => {
				//@ts-ignore
				this.error = data.error ? data.error : null;
				this.related = data;
				this.operationinprogress = false;
				this.setLoading(false);
				return data;
			});
	}

	/**
	 *
	 * @param requestData
	 * @param responseData
	 */
	protected _updateGlobalSearchData(
		requestData: requestDataGlobalSearch,
		responseData: responseDataGlobalSearch
	) {
		if (responseData.nModified === requestData.ids.length) {
			for (let i = 0; i < this.findentitydata.length; i++) {
				if (_.indexOf(requestData.ids, this.findentitydata[i]._id) > -1) {
					for (var u in requestData.properties) {
						this.findentitydata[i][u] = requestData.properties[u];
					}
				}
			}
		} else {
			console.log("Error in _updateGlobalSearchData ...");
		}
	}

	/**
	 * Modifies a single document in a collection.
	 *
	 * @param bulk
	 */
	public updateOne(bulk: boolean = false, document : any = null) {
		if (bulk === true) {
			let d = {
				data: {
					name: this.name,
					ids: Object.keys(toJS(this.selected_items)),
					properties: toJS(this.multiple_document)
				}
			};
			this.currentAction = "saving";
			this.fetchAutenticated(this.getApiUrl() + "/bulkedit/", "POST", d)
				.then(response => response.json())
				.then(data => {
					//@ts-ignore
					if (!data.data) this.error = data;
					// @ts-ignore
					else this._updateGlobalSearchData(d.data, data.data);
					// if no error we reset the data
					this.multiple_document = {};
					this.selected_items = {};
					this.currentAction = null;
				});
		} else {
			let d = {};
			if (document) d = toJS(document);
			else d = toJS(this.document);
			//@ts-ignore
			let id = d.id;
			//@ts-ignore
			delete d.id;
			this.currentAction = "saving";
			this.fetchAutenticated(this.getApiUrl(id), "PATCH", d)
				.then(response => response.json())
				.then(data => {
					//@ts-ignore
					this.error = data.error ? data.error : null;
					for (let i in data) {
						this.document[i] = data[i];
					}
					this.updateDocumentInLocalCollection();
					this.currentAction = null;
				});
		}
	}

	/**
	 * Updates the collection_id2idx which contains id as keys and index of the collection as values
	 */
	protected updateCollectionId2idx(dd : any)
	{
		this.collection_id2idx = {};
		dd.map((e,i) => this.collection_id2idx[e.id] = i);
	}

	/**
	 * Performs a query on a collection or a view and returns a cursor object.
	 *
	 * @param where The where condition
	 * @param include A string with the name of the linked collection we want to 'include'
	 * @param postprocess Function we want to use for post-processing each document of the returned data
	 * @param postprocesscollection Function we want to use for post processing the whole collection
	 */
	public find(where: object = {}, include: string = "", postprocess = 'id2inserteddate', postprocesscollection = null) {
		this.setLoading(true);
		this.operationinprogress = true;
		// Build query
		let q = {};
		if (where !== {}) {
			q["where"] = where;
		}
		if (include !== "") {
			q["include"] = include;
		}
		this.fetchAutenticated(
			this.getApiUrl() + "?filter=" + encodeURI(JSON.stringify(q))
		)
			.then(response => response.json())
			.then(data => {
				//@ts-ignore
				this.error = data.error ? data.error : null;
				let dd = (postprocess && data && data.map) ? data.map(e => this[postprocess](e) ) : data;
				if (postprocesscollection)
				{
					dd = this[postprocesscollection](dd);
				}
				this.updateCollectionId2idx(dd);
				this.collection = dd;
				this.onCollectionUpdated();
				this.operationinprogress = false;
				if (
					data.error &&
					data.error.code === "AUTHORIZATION_REQUIRED" &&
					Users.getToken()
				) {
					Users.resetData();
				}
				this.setLoading(false);
			});
	}

	/**
	 * Run this when the collection is updated
	 */
	public onCollectionUpdated(d: Array<object> | null = null) {
		let l = d ? d.length : this.collection.length;
		try {
			this.pagination.pages = Math.ceil(l / this.pagination.perpages);
		} catch (ee) {
			// @todo Fix this non-sense
		}
	}

	/**
	 *
	 * @param p
	 */
	public onClickPage(p: number) {
		if (p < 1) p = 1;
		if (p > this.pagination.pages) p = this.pagination.pages;
		this.pagination.selected = p;
	}

	/**
	 *
	 */
	protected _findDataInLocalCollection(): Array<object> {
		let toret = [];
		this.collection.map(e => {
			var re = new RegExp(this.pagination.searchstr + "", "gi");
			for (let i in e) {
				if (typeof e[i] === "string" && (e[i] + "").match(re)) {
					toret.push(e);
					return true;
				}
			}
			return true;
		});
		return toret;
	}

	/**
	 *
	 * @param d
	 */
	protected _filterCollectionOnIgnore(d: Array<any>): Array<object> {
		let toret = [];
		if (this.pagination.should_ignore === 1) return d;
		d.map(e => {
			if (e.should_ignore === this.pagination.should_ignore) {
				toret.push(e);
			}
			return true;
		});
		return toret;
	}

	/**
	 *
	 * @param d
	 */
	protected _filterCollectionOnTags(d: Array<any>): Array<object> {
		let toret = [];
		let totfilters = 0;
		if (this.pagination.tagsfilter === {}) return d;
		let columns = Object.keys(this.pagination.tagsfilter);
		columns.map(e => (totfilters += this.pagination.tagsfilter[e].length));
		if (totfilters === 0) return d;
		d.map(e => {
			let tagfound = 0;
			columns.map(colname => {
				if (e[colname] && e[colname].length > 0)
					this.pagination.tagsfilter[colname].map(tagname => {
						if (_.indexOf(e[colname], tagname) > -1) {
							tagfound++;
						}
						return null;
					});
				return null;
			});
			if (tagfound > 0) toret.push(e);
			return null;
		});
		return toret;
	}

	/**
	 *
	 */
	public getDislpayCollection() {
		let d = toJS(this.collection);
		if (this.pagination.searchstr !== "") d = this._findDataInLocalCollection();
		if (this.pagination.should_ignore !== null)
			d = this._filterCollectionOnIgnore(d);
		if (this.pagination.tagsfilter !== {}) d = this._filterCollectionOnTags(d);
		if (
			this.pagination.searchstr !== "" ||
			this.pagination.should_ignore !== null
		) {
			this.onCollectionUpdated(d);
		}

		let p_to = this.pagination.selected * this.pagination.perpages;
		let p_from = p_to - this.pagination.perpages;
		let toret = [];
		for (var i = p_from; i < p_to; i++) {
			if (d[i]) toret.push(d[i]);
		}
		return toret;
	}

	/**
	 * Filter the collection on the tag passed as param
	 * @param tagName
	 * @param columnName
	 */
	public filterOnTag(tagName: string = "", columnName: string = "") {
		if (!this.pagination.tagsfilter[columnName])
			this.pagination.tagsfilter[columnName] = [];
		let theIndexOf = _.indexOf(this.pagination.tagsfilter[columnName], tagName);
		if (theIndexOf === -1) this.pagination.tagsfilter[columnName].push(tagName);
		else remove(this.pagination.tagsfilter[columnName], theIndexOf);
	}

	/**
	 * Provides access to the aggregation pipeline.
	 */
	public aggregate(onField: string = "") {
		this.setLoading(true);
		this.operationinprogress = true;
		this.fetchAutenticated(
			this.getApiUrl() + "/aggregation?field=" + encodeURI(onField)
		)
			.then(response => response.json())
			.then(data => {
				//@ts-ignore
				this.error = data.error ? data.error : null;
				this.aggragateddata[onField] = data.aggregation;
				this.operationinprogress = false;
				this.setLoading(false);
			});
	}

	/* ----------------------------------- UTILS  --------------------------------------- */

	/**
	 * Returns the aggregation labels (only if the data is present)
	 * @param onField
	 */
	public getAggregationLabels(onField: string = ""): Array<string> {
		return this.aggragateddata[onField]
			? this.aggragateddata[onField].map(e => e._id).sort()
			: [];
	}

	/**
	 * Deletes a single document in a collection.
	 */
	public deleteOne() {
		let d = toJS(this.document);
		//@ts-ignore
		let id = d.id;
		//@ts-ignore
		delete d.id;
		this.currentAction = "deleting";
		this.fetchAutenticated(this.getApiUrl(id), "DELETE", d)
			.then(response => response.json())
			.then(data => {
				//@ts-ignore
				this.error = data.error ? data.error : null;
				this.updateDocumentInLocalCollection(true);
				this.currentAction = null;
			});
	}

	/* ---------------------------------------------------------------------------------- */

	/**
	 * Wraps count to return a count of the number of documents in a collection or a view.
	 */
	private count() {}

	/**
	 * Performs a query and returns a single document.
	 */
	private findOne() {}
	/**
	 * Deletes documents from a collection.
	 */
	private remove() {}
	/**
	 * Deletes multiple documents in a collection.
	 */
	private deleteMany() {}

	/**
	 * Inserts a new document in a collection.
	 */
	private insertOne() {}

	/**
	 * Inserts several new document in a collection.
	 */
	private insertMany() {}

	/**
	 * Replaces a single document in a collection.
	 */
	private replaceOne() {}

	/**
	 * Modifies multiple documents in a collection.
	 */
	private updateMany() {}

	/* ---------------------------------------------------------------------------------- */

	/**
	 * Modifies a document in a collection.
	 */
	private update() {}

	/**
	 * Provides a wrapper around an insert() and update()
	 * to insert new documents.
	 */
	private save() {}

	/**
	 * Finds a single document and deletes it.
	 */
	private findOneAndDelete() {}

	/**
	 * Finds a single document and replaces it.
	 */
	private findOneAndReplace() {}

	/**
	 * Atomically modifies and returns a single document.
	 */
	private findAndModify() {}

	/**
	 * Creates a new document in a collection.
	 */
	private insert() {}

	/**
	 * Wraps the $group aggregation stage with a $sum expression to return a count of
	 * the number of documents in a collection or a view.
	 */
	private countDocuments() {}

	/* ---------------------------------------------------------------------------------- */

	/**
	 * Provides bulk write operation functionality.
	 */
	private bulkWrite() {}

	/**
	 * Wraps count to return an approximate count of the documents in a collection or a view.
	 */
	private estimatedDocumentCount() {}

	/**
	 * Builds an index on a collection.
	 */
	private createIndex() {}

	/**
	 * Builds one or more indexes on a collection.
	 */
	private createIndexes() {}

	/**
	 * Returns the size of the collection. Wraps the size field in the output of the collStats.
	 */
	private dataSize() {}

	/**
	 * Returns an array of documents that have distinct values for the specified field.
	 */
	private distinct() {}

	/**
	 * Removes the specified collection from the database.
	 */
	private drop() {}

	/**
	 * Removes a specified index on a collection.
	 */
	private dropIndex() {}

	/**
	 * Removes all indexes on a collection.
	 */
	private dropIndexes() {}

	/**
	 * Returns information on the query execution of various methods.
	 */
	private explain() {}

	/**
	 * Finds a single document and updates it.
	 */
	private findOneAndUpdate() {}

	/**
	 * Returns an array of documents that describe the existing indexes on a collection.
	 */
	private getIndexes() {}

	/**
	 * For collections in sharded clusters, public getShardDistribution() {} //
	 * reports data of chunk distribution.
	 */
	private getShardDistribution() {}

	/**
	 * Internal diagnostic method for sharded cluster.
	 */
	private getShardVersion() {}

	/**
	 * Reports if a collection is a capped collection.
	 */
	private isCapped() {}

	/**
	 * Returns latency statistics for a collection.
	 */
	private latencyStats() {}

	/**
	 * Performs map-reduce style data aggregation.
	 */
	private mapReduce() {}

	/**
	 * Rebuilds all existing indexes on a collection.
	 */
	private reIndex() {}

	/**
	 * Changes the name of a collection.
	 */
	private renameCollection() {}

	/**
	 * Reports on the state of a collection. Provides a wrapper around the collStats.
	 */
	private stats() {}

	/**
	 * Reports the total size used by the collection in bytes. Provides a wrapper around
	 * the storageSize field of the collStats output.
	 */
	private storageSize() {}

	/**
	 * Reports the total size used by the indexes on a collection. Provides a wrapper
	 * around the totalIndexSize field of the collStats output.
	 */
	private totalIndexSize() {}

	/**
	 * Reports the total size of a collection, including the size of all documents
	 * and all indexes on a collection.
	 */
	private totalSize() {}

	/**
	 * Establishes a Change Stream on a collection.
	 */
	private watch() {}

	/**
	 * Performs diagnostic operations on a collection.
	 */
	private validate() {}
}

export default AbstractModel;
