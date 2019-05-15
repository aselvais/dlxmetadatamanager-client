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
    @observable public document : any = {};
    /**
     * Collection (array) of documents/entries
     */
    @observable public collection : Array<any> = [];


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
    public findOneById(id : string = '') : void
    {
        this.loading = true;
        fetch(this.getApiUrl(id))
            .then(response => response.json())
            .then(data => { 
                this.document = data;
                this.loading = false;
            });
    }

    /* ---------------------------------------------------------------------------------- */

    /**
     * Wraps count to return a count of the number of documents in a collection or a view.
     */
    public count() {} 

    /**
     * Performs a query on a collection or a view and returns a cursor object.
     */
    public find() {} 

    /**
     * Performs a query and returns a single document.
     */
    public findOne() {} 
    
    /**
     * Deletes a single document in a collection.
     */
    public deleteOne() {} 

    /**
     * Deletes multiple documents in a collection.
     */
    public deleteMany() {} 

    /**
     * Inserts a new document in a collection.
     */
    public insertOne() {} 

    /**
     * Inserts several new document in a collection.
     */
    public insertMany() {} 

    /**
     * Deletes documents from a collection.
     */
    public remove() {}

    /**
     * Replaces a single document in a collection.
     */
    public replaceOne() {}

    /**
     * Modifies a single document in a collection.
     */
    public updateOne() {}

    /**
     * Modifies multiple documents in a collection.
     */
    public updateMany() {}

    /* ---------------------------------------------------------------------------------- */

    /**
     * Modifies a document in a collection.
     */
    public update() {} 

    /**
     * Provides a wrapper around an insert() and update() 
     * to insert new documents.
     */
    public save() {} 

    /**
     * Finds a single document and deletes it.
     */
    public findOneAndDelete() {} 

    /**
     * Finds a single document and replaces it.
     */
    public findOneAndReplace() {} 

    /**
     * Atomically modifies and returns a single document.
     */
    public findAndModify() {} 

    /**
     * Creates a new document in a collection.
     */
    public insert() {} 

    /**
     * Wraps the $group aggregation stage with a $sum expression to return a count of 
     * the number of documents in a collection or a view.
     */
    public countDocuments() {} 

    /**
     * Provides access to the aggregation pipeline.
     */
    public aggregate() {} 


    /* ---------------------------------------------------------------------------------- */
    
    /**
     * Provides bulk write operation functionality.
     */
    public bulkWrite() {}

    /**
     * Wraps count to return an approximate count of the documents in a collection or a view.
     */
    public estimatedDocumentCount() {} 

    /**
     * Builds an index on a collection.
     */
    public createIndex() {} 

    /**
     * Builds one or more indexes on a collection.
     */
    public createIndexes() {} 

    /**
     * Returns the size of the collection. Wraps the size field in the output of the collStats.
     */
    public dataSize() {} 

    /**
     * Returns an array of documents that have distinct values for the specified field.
     */
    public distinct() {} 

    /**
     * Removes the specified collection from the database.
     */
    public drop() {} 

    /**
     * Removes a specified index on a collection.
     */
    public dropIndex() {} 

    /**
     * Removes all indexes on a collection.
     */
    public dropIndexes() {} 

    /**
     * Returns information on the query execution of various methods.
     */
    public explain() {} 

    /**
     * Finds a single document and updates it.
     */
    public findOneAndUpdate() {} 

    /**
     * Returns an array of documents that describe the existing indexes on a collection.
     */
    public getIndexes() {} 

    /**
     * For collections in sharded clusters, public getShardDistribution() {} // 
     * reports data of chunk distribution.
     */
    public getShardDistribution() {} 

    /**
     * Internal diagnostic method for sharded cluster.
     */
    public getShardVersion() {} 

    /**
     * Reports if a collection is a capped collection.
     */
    public isCapped() {} 

    /**
     * Returns latency statistics for a collection.
     */
    public latencyStats() {} 

    /**
     * Performs map-reduce style data aggregation.
     */
    public mapReduce() {} 

    /**
     * Rebuilds all existing indexes on a collection.
     */
    public reIndex() {} 

    /**
     * Changes the name of a collection.
     */
    public renameCollection() {} 

    /**
     * Reports on the state of a collection. Provides a wrapper around the collStats.
     */
    public stats() {} 

    /**
     * Reports the total size used by the collection in bytes. Provides a wrapper around 
     * the storageSize field of the collStats output.
     */
    public storageSize() {} 

    /**
     * Reports the total size used by the indexes on a collection. Provides a wrapper 
     * around the totalIndexSize field of the collStats output.
     */
    public totalIndexSize() {} 

    /**
     * Reports the total size of a collection, including the size of all documents 
     * and all indexes on a collection.
     */
    public totalSize() {} 

    /**
     * Establishes a Change Stream on a collection.
     */
    public watch() {} 

    /**
     * Performs diagnostic operations on a collection.
     */
    public validate() {} 


}

export default AbstractModel;
