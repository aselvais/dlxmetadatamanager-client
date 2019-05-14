import AbstractModel from "./AbstractModel";


interface schemadataSchema {
    [key:string]: any,
    "id"?:string,
    "TABLE_CATALOG"?:string,
    "TABLE_SCHEMA"?:string,
    "TABLE_NAME"?:string,
    "TABLE_TYPE"?:string,
    "ENGINE"?:string,
    "VERSION"?:number,
    "ROW_FORMAT"?:string,
    "TABLE_ROWS"?:number,
    "AVG_ROW_LENGTH"?:number,
    "DATA_LENGTH"?: number,
    "MAX_DATA_LENGTH"?:number,
    "INDEX_LENGTH"?:number,
    "DATA_FREE"?:number,
    "AUTO_INCREMENT"?:number,
    "CREATE_TIME"?:number,
    "UPDATE_TIME"?:number,
    "CHECK_TIME"?:number,
    "TABLE_COLLATION"?:string,
    "CHECKSUM"?:string,
    "CREATE_OPTIONS"?:string,
    "TABLE_COMMENT"?:string,
    "COLUMN_NAME"?:string,
    "ORDINAL_POSITION"?:number,
    "COLUMN_DEFAULT"?:string,
    "IS_NULLABLE"?:string,
    "DATA_TYPE"?:string,
    "CHARACTER_MAXIMUM_LENGTH"?:number,
    "CHARACTER_OCTET_LENGTH"?:number,
    "NUMERIC_PRECISION"?:number,
    "NUMERIC_SCALE"?:number,
    "DATETIME_PRECISION"?:string,
    "CHARACTER_SET_NAME"?:string,
    "COLLATION_NAME"?:string,
    "COLUMN_TYPE"?:string,
    "COLUMN_KEY"?:string,
    "EXTRA"?:string,
    "PRIVILEGES"?:string,
    "COLUMN_COMMENT"?:string
};

/**
 * 
 */
class Schemadata extends AbstractModel
{
    protected name : string = 'schemadata';
    public entry : schemadataSchema = {};
    
}

export default new Schemadata();
