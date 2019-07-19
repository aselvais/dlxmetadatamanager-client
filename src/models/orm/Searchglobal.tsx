import { observable } from "mobx";
import { originsSchema, databasesSchema, schemasSchema, tablesSchema, fieldsSchema, modelErrorSchema } from "../interfaces";
import Origins from "./Origins";
import Databases from "./Databases";
import Schemas from "./Schemas";
import Tables from "./Tables";

/**
 * 
 */
class Searchglobal
{
    /**
     * Container for the error object coming back from the API
     */
    @observable public error : modelErrorSchema = null;
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


    @observable searchString : string = '';

    /**
     * 
     */
    public runSearch()
    {
        Origins.resetData();
        Databases.resetData();
        Schemas.resetData();
        Tables.resetData();

        Origins.find({ name: this.searchString });
        Databases.find({ name: this.searchString });
        Schemas.find({ name: this.searchString });
        Tables.find({ name: this.searchString });
    }

}



export default new Searchglobal();