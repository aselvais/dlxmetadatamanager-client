import Config from "../Config";
import { toJS, observable } from 'mobx';
import { formConfigSchema } from "../interfaces";
import Users from "./Users";

interface modelErrorSchema {
    code?: string,
    message?: string,
    name?: string,
    stack?: string,
    statusCode?: number
};

interface tagObjectSchema {
    [key:string]: Array<string>
};

/**
 * Abstract class containing the method for accessing the API
 * and containing a document or a collection of documents.
 */
abstract class AbstractModel
{
    /**
     * Name of the model / collection to be defined in the inheriting classes
     */
    public name : string = '';
    /**
     * Container for the error object coming back from the API
     */
    @observable public error : modelErrorSchema = null;
    /**
     * Will be true when we are loading the data from the API
     */
    @observable public loading : boolean = false;
    /**
     * Status of the model, eg: 'editing', 'saving', ... so the GUI knows what to do.
     */
    @observable public currentAction : 'view' | 'editing' | 'saving' | 'loggingin' | 'loggingout' | null = null;
    /**
     * Entry (one document) selected or loaded (by findOne for eg)
     */
    @observable public document : null | object = null;
    /**
     * Container for the related entries (linked to the current model)
     */
    @observable public related : object | Array<object> | null = null;
    /**
     * Collection (array) of documents/entries
     */
    @observable public collection : null | Array<any> = null;
    /**
     * Container object for the possible values of the 'tag' property (if any) of a document
     */
    @observable public tags : tagObjectSchema = {};
    /**
     * Container for the aggregations. The key will be the field and the 
     * value is the aggragated data
     */
    @observable public aggragateddata : object = {};
    /**
     * Definition of the form for the edition of a this.document
     */
    public formConfig : formConfigSchema = {
        showButton: true,
        fill: true,
        vertical: true,
        elements: {}
    };
    /**
     * Array of properties that are of tag type
     */
    protected _tagFieldNames : Array<string> = []; 

    /**
     * 
     */
    public loadAllTags()
    {
        // setting up the _tagFieldNames list
        if (this.formConfig && this.formConfig.elements && this._tagFieldNames.length === 0) {
            let ee = [];
            //@ts-ignore
            Object.keys(this.formConfig.elements).map(e => (this.formConfig.elements[e].shape && this.formConfig.elements[e].shape === "tag") ? ee.push(e) : null );
            this._tagFieldNames = ee;
        }
        // load the data from the server
        this._tagFieldNames.map(n => this.loadTags(n));
    }

    /**
     * 
     * @param tagfieldname 
     */
    public loadTags(tagfieldname : string = 'tags', emptyCache : boolean = false)
    {
        // this.loading = true;
        this.tags[tagfieldname] = [];
        this.fetchAutenticated(this.getApiUrl() + '/tags/?field=' + tagfieldname )
        .then(response => response.json())
        .then(data => { 
            // this.error = data.error ? data.error : null;
            if (data && data.aggregation && data.aggregation.length) {
                data.aggregation.map(e => e._id ? this.tags[tagfieldname].push(e._id) : null);
            }
            // this.loading = false;
        });
    }

    /**
     * 
     * @param apiUrl 
     * @param method 
     * @param jsonBody 
     */
    fetchAutenticated(apiUrl : string = '', method : string = 'GET', jsonBody : object | null = null)
    {
        let params = {
            method: method,
            headers: new Headers({
                'Content-Type': 'application/json', 
                'Authorization': Users.getToken()}
                )
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
    public getName() : string
    {
        return this.name;
    }

    /**
     * Resets the data from the current model to null values
     */
    protected resetData()
    {
        this.document = null;
        this.collection = null;
        this.currentAction = null;
        this.loading = false;
    }

    /**
     * Take the this.document and update the same one in this.collection
     */
    public updateDocumentInLocalCollection() : boolean
    {
        for (let i in this.collection)
        {
            try {
                //@ts-ignore
                if (this.collection[i].id === this.document.id)
                {
                    this.collection[i] = this.document;
                    return true;
                }
            } catch(ee) {}
        }
        return false;
    }

    /**
     * Returns the document object
     * @param flatCopy boolean Returns a flat non-mobx copy of the object
     */
    public getDocument(flatCopy : boolean = true)
    {
        return flatCopy ? toJS(this.document) : this.document;
    }

    /**
     * Returns the full URL of the API to call
     * @param id Id of the document to return/use
     */
    protected getApiUrl(id : string = '') : string
    {
        return Config.getApiUrl(this.name, id);
    }

    /**
     * Loads a document by Id in this.document
     * @param id 
     * @doto Set loding to false if there is a failure
     */
    public findOneById(id : string = '', emptyCache : boolean = false) : void
    {
        // @ts-ignore
        if (!emptyCache && (this.document.id && this.document.id === id))
        {
            console.debug('"' + this.name + '" document "' + id + '" from cache... Use emptyCache to renew it.');
        } else {
            this.loading = true;
            this.fetchAutenticated(this.getApiUrl(id))
                .then(response => response.json())
                .then(data => { 
                    //@ts-ignore
                    this.error = data.error ? data.error : null;
                    this.document = data;
                    this.loading = false;
                });    
        }
    }
    
    /**
     * 
     * @param id .
     * @param related_model_name 
     */
    public findRelated(related_model_name : string = '', this_model_id=null) : void
    {
        //@ts-ignore
        if (this_model_id === null && this.document && this.document.id) { this_model_id = this.document.id; }

        this.loading = true;
        this.fetchAutenticated(this.getApiUrl(this_model_id) + '/' + related_model_name)
            .then(response => response.json())
            .then(data => {
                //@ts-ignore
                this.error = data.error ? data.error : null;
                this.related = data;
                this.loading = false;
            });
            
    }

    /**
     * Modifies a single document in a collection.
     */
    private updateOne() 
    {
        let d = toJS(this.document);
        //@ts-ignore
        let id = d.id;
        //@ts-ignore
        delete d.id;
        this.currentAction = 'saving';
        this.fetchAutenticated(this.getApiUrl(id), 'PATCH', d)
         .then(response => response.json())
         .then(data => {
            //@ts-ignore
            this.error = data.error ? data.error : null;
             for (let i in data)
             {
                this.document[i] = data[i];
             }
             this.updateDocumentInLocalCollection();
             this.currentAction = null;
            });
    }

    /**
     * Performs a query on a collection or a view and returns a cursor object.
     */
    public find(where : object = {}) {
        this.loading = true;
        this.fetchAutenticated(this.getApiUrl() + '?filter=' + encodeURI(JSON.stringify(where)))
            .then(response => response.json())
            .then(data => { 
                //@ts-ignore
                this.error = data.error ? data.error : null;
                this.collection = data;
                this.loading = false;
                if (data.error && data.error.code === 'AUTHORIZATION_REQUIRED' && Users.getToken())
                {
                    Users.resetData();
                }
        });
    }

    /**
     * Provides access to the aggregation pipeline.
     */
    public aggregate(onField : string = '') {
        this.loading = true;
        this.fetchAutenticated(this.getApiUrl() + '/aggregation?field=' + encodeURI(onField))
            .then(response => response.json())
            .then(data => { 
                //@ts-ignore
                this.error = data.error ? data.error : null;
                this.aggragateddata[onField] = data.aggregation;
                this.loading = false;
            });
    }

    /* ----------------------------------- UTILS  --------------------------------------- */

    /**
     * Returns the aggregation labels (only if the data is present)
     * @param onField 
     */
    public getAggregationLabels(onField : string = '') : Array<string>
    {
        return this.aggragateddata[onField] ? this.aggragateddata[onField].map(e => e._id).sort() : [];
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
     * Deletes a single document in a collection.
     */
    private deleteOne() {} 

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
     * Deletes documents from a collection.
     */
    private remove() {}

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
