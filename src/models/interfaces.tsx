import { IconName } from "@blueprintjs/core";

/**
 * Schemadata Schema
 */
export interface schemadataSchema {
    [key:string]: any,
    "id"?:string | null,

    // Common mandatory properties
    zcdc_source_system_database_name?:string | null,
    zcdc_source_system_schema_name?:string | null,
    zcdc_source_system_table_name?:string | null,
    "COLUMN_NAME"?:string | null,
    "DATA_TYPE"?:string | null,
    "DATA_LENGTH"?: number | null,
    "CHARACTER_SET_NAME"?:string | null,

    // streamsets metadata
    zcdc_organization?:string | null,
    zcdc_source_system?:string | null,
    zcdc_source_system_engine_type?:string | null,
    zcdc_destination_staging_area?:string | null,
    zcdc_source_system_offset_column_name?:string | null,
    zcdc_source_system_table_primary_key_names?:string | null,
    zcdc_destination_partition_column_1_name?:string | null,
    zcdc_destination_partition_column_2_name?:string | null,
    zcdc_streamsets_job?:string | null,
    zcdc_source_system_engine_port?:string | null,
    zcdc_source_system_engine_instance?:string | null,
    zcdc_streamsets_topology?:string | null,

    // Other coming from the DB
    "TABLE_NAME"?:string | null,            // <-- *
    "TABLE_CATALOG"?:string | null,
    "TABLE_SCHEMA"?:string | null,
    "TABLE_TYPE"?:string | null,
    "ENGINE"?:string | null,
    "VERSION"?:number | null,
    "ROW_FORMAT"?:string | null,
    "TABLE_ROWS"?:number | null,
    "AVG_ROW_LENGTH"?:number | null,
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
    "ORDINAL_POSITION"?:number | null,
    "COLUMN_DEFAULT"?:string | null,
    "IS_NULLABLE"?:string | null,
    "CHARACTER_MAXIMUM_LENGTH"?:number | null,
    "CHARACTER_OCTET_LENGTH"?:number | null,
    "NUMERIC_PRECISION"?:number | null,
    "NUMERIC_SCALE"?:number | null,
    "DATETIME_PRECISION"?:string | null,
    "COLLATION_NAME"?:string | null,
    "COLUMN_TYPE"?:string | null,
    "COLUMN_KEY"?:string | null,
    "EXTRA"?:string | null,
    "PRIVILEGES"?:string | null,
    "COLUMN_COMMENT"?:string | null,

    /* ----- Oracle specifics ------ */
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
 * Users schema
 */
export interface UsersSchema {
    [key:string]: any,
    "id"? : string,
    "realm"? : string,
    "username"? : string,
    "password"? : string,
    "email"? : string,
    "emailVerified"? : boolean
};

/**
 * Tags schema
 */
export interface tagsSchema {
    [key:string]: any,
    "name"?: string,
    "tags_id"?: string,
    "type"?: string,
    "properties"?: object  
};

/**
 * Tables schema
 */
export interface tablesSchema {
    [key:string]: any,
    "name"?: string,
    "storageengine"?: string,
    "databases_id"?: string  
};

/**
 * Origins schema
 */
export interface originsSchema {
    [key:string]: any,
    "name"?: string,
    "host"?: string,
    "organization"?: string  
};

/**
 * Fields Schema
 */
export interface fieldsSchema {
    [key:string]: any,
    "name"?: string,
    "datatype"?: string,
    "datalength"?: number,
    "charset"?: string,
    "tables_id"?: string,
    "schemadata_id"?: string,
    "documentation"?: string,
    "properties"?: object,
    "tags"?: Array<string>
};

/**
 * Database schema
 */
export interface databasesSchema {
    [key:string]: any,
    "name"?: string,
    "origins_id"?: string,
    "vendorbrand"?: string,
    "storageengine"?: string
};

/**
 * Navigation menu Item shape
 */
export interface MenuItem {
    name: string,
    label: string,
    active: boolean,
    icon: IconName,
    menuVisible: boolean
};

/**
 * Form element configuration shape
 */
export interface formElementConfigSchema {
    shape: 'text' | 'select' | 'password' | 'email' | 'checkbow' | 'radio' | 'slider' | 'switch' | 'file' | 'numeric' | 'textarea'  | 'tag'  | 'datetime'  | 'timezone' | 'submit',
    showLabel?: boolean,
    options?: object
};

export interface formElemObjConfigSchema {
    [key:string]: formElementConfigSchema | boolean,
}

/**
 * Form config shape.
 * This is used to set form element GUI for the data coming from an JSON object
 */
export interface formConfigSchema {
    [key:string]: string | boolean | formElemObjConfigSchema,
    showButton?: boolean,
    fill?: boolean,
    vertical?: boolean,
    elements?: formElemObjConfigSchema
};

/**
 * Config for the standard datagrid (HTML version)
 */
export interface gridConfig {
    [key:string]: any,
    showOnly?: Array<string>,
    actions?: Array<'view' | 'edit' | 'delete' | 'drilldown' | 'delete'>
};