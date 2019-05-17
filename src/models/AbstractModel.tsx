import Config from "./Config";
import { observable } from 'mobx';

/**
 * Abstract class containing the method for accessing the API
 * and containing a document or a collection of documents.
 */
abstract class AbstractModel
{
    /**
     * Name of the model / collection to be defined in the inheriting classes
     */
    protected name : string = '';
    /**
     * Will be true when we are loading the data from the API
     */
    @observable public loading : boolean = false;
    /**
     * Entry (one document) selected or loaded (by findOne for eg)
     */
    @observable public document : null | object = null;
    /**
     * Collection (array) of documents/entries
     */
    @observable public collection : null | Array<any> = null;
    /**
     * Container for the aggregations. The key will be the field and the 
     * value is the aggragated data
     */
    @observable public aggragateddata : object = {};

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
            fetch(this.getApiUrl(id))
                .then(response => response.json())
                .then(data => { 
                    this.document = data;
                    this.loading = false;
                });    
        }
    }

    /**
     * Performs a query on a collection or a view and returns a cursor object.
     */
    public find(where : object = {"where": {"_id": "5cd9bf89a7aa340bb626b1e1"}}) {
        this.loading = true;
        fetch(this.getApiUrl() + '?filter=' + encodeURI(JSON.stringify(where)))
            .then(response => response.json())
            .then(data => { 
                this.collection = data;
                this.loading = false;
            });
    }

    /**
     * Provides access to the aggregation pipeline.
     */
    public aggregate(onField : string = '') {
        this.loading = true;
        fetch(this.getApiUrl() + '/aggregation?field=' + encodeURI(onField))
            .then(response => response.json())
            .then(data => { 
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
     * Modifies a single document in a collection.
     */
    private updateOne() {}

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
