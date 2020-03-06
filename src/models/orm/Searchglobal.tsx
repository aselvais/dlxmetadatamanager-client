import { observable, toJS } from "mobx";
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
    /** Container for the error object coming back from the API */
    @observable public error : modelErrorSchema = null;
    /** Will be true when we are loading the data from the API */
    @observable public loading : boolean = false;
    /** Entry (one document) selected or loaded (by findOne for eg) */
    @observable public document : null | object = null;
    /** Collection (array) of documents/entries */
    @observable public collection : null | Array<any> = null;
    /** Option: case sensitive search yes/no */
    @observable protected _casesensitive: boolean = false;
    /** Options: type of match; exact, starts with, ends with or match any part of the string */
    @observable protected _matchtype: 'exact' | 'starts' | 'ends' | 'any' = 'any';
    /** String to search in the name of the entity */
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
        Origins.findentity(this.searchString, {}, this._casesensitive, this._matchtype);
        // Databases.find({ name: {like: this.searchString, options: "i"} });
        Databases.findentity(this.searchString, {}, this._casesensitive, this._matchtype);
        // Schemas.find({ name: {like: this.searchString, options: "i"} });
        Schemas.findentity(this.searchString, {}, this._casesensitive, this._matchtype);
        // Tables.find({ name: {like: this.searchString, options: "i"} });
        Tables.findentity(this.searchString, {}, this._casesensitive, this._matchtype);
        // Fields.find({ name: {like: this.searchString, options: "i"} });
        Fields.findentity(this.searchString, {}, this._casesensitive, this._matchtype);
        
    }

    /**
     * 
     */
    public get matchtype() {
        return this._matchtype;
    }

    /**
     * 
     */
    public get casesensitive() {
        return this._casesensitive;
    }

    /**
     * 
     */
    public set matchtype(v : 'exact' | 'starts' | 'ends' | 'any') {
        if (v === toJS(this._matchtype)) v = 'any';
        this._matchtype = v;
    }

    /**
     * 
     */
    public set casesensitive(v : boolean) {
        this._casesensitive = v;
    }

    /**
     * 
     */
    public toggleCasesensitive() {
        this._casesensitive = !this._casesensitive;
    }

}



export default new Searchglobal();