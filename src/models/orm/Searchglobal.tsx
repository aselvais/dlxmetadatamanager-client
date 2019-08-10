import { observable } from "mobx";
import { modelErrorSchema } from "../interfaces";
import Origins from "./Origins";
import Databases from "./Databases";
import Schemas from "./Schemas";
import Tables from "./Tables";
import Fields from "./Fields";

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
        Fields.resetData();

        // Origins.find({ name: {like: this.searchString, options: "i" } });
        Origins.findentity(this.searchString);
        // Databases.find({ name: {like: this.searchString, options: "i"} });
        Databases.findentity(this.searchString);
        // Schemas.find({ name: {like: this.searchString, options: "i"} });
        Schemas.findentity(this.searchString);
        // Tables.find({ name: {like: this.searchString, options: "i"} });
        Tables.findentity(this.searchString);
        // Fields.find({ name: {like: this.searchString, options: "i"} });
        Fields.findentity(this.searchString);
        
    }

}



export default new Searchglobal();