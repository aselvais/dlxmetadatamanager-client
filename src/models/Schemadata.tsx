import AbstractModel from "./AbstractModel";

/**
 * Description of a schemadata document
 */
interface schemadataSchema {
    [key:string]: any,
    "id"?:string | null,
    "TABLE_CATALOG"?:string | null,
    "TABLE_SCHEMA"?:string | null,
    "TABLE_NAME"?:string | null,
    "TABLE_TYPE"?:string | null,
    "ENGINE"?:string | null,
    "VERSION"?:number | null,
    "ROW_FORMAT"?:string | null,
    "TABLE_ROWS"?:number | null,
    "AVG_ROW_LENGTH"?:number | null,
    "DATA_LENGTH"?: number | null,
    "MAX_DATA_LENGTH"?:number | null,
    "INDEX_LENGTH"?:number | null,
    "DATA_FREE"?:number | null,
    "AUTO_INCREMENT"?:number | null,
    "CREATE_TIME"?:number | null,
    "UPDATE_TIME"?:number | null,
    "CHECK_TIME"?:number | null,
    "TABLE_COLLATION"?:string | null,
    "CHECKSUM"?:string | null,
    "CREATE_OPTIONS"?:string | null,
    "TABLE_COMMENT"?:string | null,
    "COLUMN_NAME"?:string | null,
    "ORDINAL_POSITION"?:number | null,
    "COLUMN_DEFAULT"?:string | null,
    "IS_NULLABLE"?:string | null,
    "DATA_TYPE"?:string | null,
    "CHARACTER_MAXIMUM_LENGTH"?:number | null,
    "CHARACTER_OCTET_LENGTH"?:number | null,
    "NUMERIC_PRECISION"?:number | null,
    "NUMERIC_SCALE"?:number | null,
    "DATETIME_PRECISION"?:string | null,
    "CHARACTER_SET_NAME"?:string | null,
    "COLLATION_NAME"?:string | null,
    "COLUMN_TYPE"?:string | null,
    "COLUMN_KEY"?:string | null,
    "EXTRA"?:string | null,
    "PRIVILEGES"?:string | null,
    "COLUMN_COMMENT"?:string | null,
    /* ----- Oracle specifics ------ */
    //    "TABLE_NAME" : string,
    //    "COLUMN_NAME" : string,
    //    "DATA_TYPE" : string,
    //    "DATA_LENGTH" : number,
    //    "CHARACTER_SET_NAME" : string,
    "OWNER"? : string | null,
    "DATA_TYPE_MOD"? : string | null,
    "DATA_TYPE_OWNER"? : string,
    "DATA_PRECISION"? : string,
    "DATA_SCALE"? : string | null,
    "NULLABLE"? : string | null,
    "COLUMN_ID"? : number | null,
    "DEFAULT_LENGTH"? : number | null,
    "DATA_DEFAULT"? : string | null,
    "NUM_DISTINCT"? : string | null,
    "LOW_VALUE"? : string | null,
    "HIGH_VALUE"? : string | null,
    "DENSITY"? : string | null,
    "NUM_NULLS"? : string | null,
    "NUM_BUCKETS"? : string | null,
    "LAST_ANALYZED"? : string | null,
    "SAMPLE_SIZE"? : string | null,
    "CHAR_COL_DECL_LENGTH"? : number | null,
    "GLOBAL_STATS"? : string | null,
    "USER_STATS"? : string | null,
    "AVG_COL_LEN"? : string | null,
    "CHAR_LENGTH"? : number | null,
    "CHAR_USED"? : string | null,
    "V80_FMT_IMAGE"? : string | null,
    "DATA_UPGRADED"? : string | null,
    "HISTOGRAM"? : string | null
};

/**
 * Singleton model for Schemadata
 */
class Schemadata extends AbstractModel
{
    protected name : string = 'schemadata';
    public entry : schemadataSchema | null = null;
    public collection : Array<schemadataSchema> | null = null;

    /**
     * 
     * @param tableName 
     */
    public getTableMetaData(tableName : string = '') : void
    {
        this.find({"where": {"TABLE_NAME": tableName}});
    }

}

export default new Schemadata();
