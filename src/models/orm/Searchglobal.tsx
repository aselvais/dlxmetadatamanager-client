import { observable } from "mobx";
import { originsSchema, databasesSchema, schemasSchema, tablesSchema, fieldsSchema } from "../interfaces";


/**
 * 
 */
class Searchglobal
{
    @observable searchString : string = '';
    
    @observable originsResults : Array<originsSchema> = [];
    @observable databasesResults : Array<databasesSchema> = [];
    @observable schemasResults : Array<schemasSchema> = [];
    @observable tablesResults : Array<tablesSchema> = [];
    @observable fieldsResults : Array<fieldsSchema> = [];

}



export default new Searchglobal();