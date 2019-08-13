import { IconName } from "@blueprintjs/core";

/**
 * Schemadata Schema.
 * Schemadata is the collection/table in the DB where we store the raw data from the 
 * queries extracting sources schemas with Streamsets
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
 * Users schema.
 * Application users: people who have an account and can access the 
 * Metadata manager
 */
export interface UsersSchema {
    [key:string]: any,
    /** Primary key */
    "id"? : string,
    /** Group the user is part of */
    "realm"? : string,
    /** Unique username used for authentication */
    "username"? : string,
    /** Password (encrypted) */
    "password"? : string,
    /** Email address */
    "email"? : string,
    /** Was the email verified by the app */
    "emailVerified"? : boolean
};

/**
 * Tags schema.
 * Collection of tags users can use in the app for tagging entities.
 */
export interface datadictSchema {
    [key:string]: any,
    /** PK */
    "id"?: string,
    /** Tag name/label */
    "name"?: string,
    /** Optional description */
    "description"?: object,
    /** Active on/off */
    "should_ignore"?: number
};

/**
 * Access token used for validating requests against authentication.
 * This data is kept in memory on the server side.
 * So, when we restart the server, users will need to re-authenticate.
 */
export interface AccessTokensSchema {
    [key:string]: any,
    /** PK */
    "id"?: string,
    /** Time to live: defines when the token will expire/timeout */
    "ttl"?: number,
    /** Date/time when the token was created */
    "created"?: string,
    /** FK to the User */
    "userId"?: string
};

/**
 * Fields Schema.
 * ORM to the fields/columns definition kept in the DB.
 */
export interface fieldsSchema {
    [key:string]: any,
    /** PK */
    "id"?: string,
    /** Column name */
    "name"?: string,
    /** Data type as define in the DB source */
    "datatype"?: string,
    /** Length as defined in the DB source */
    "datalength"?: number,
    /** Character set */
    "charset"?: string,
    /** FK to the parent table (table in which this field is present) */
    "tables_id"?: string,
    /** FK to the source data extracted from the DB schema */
    "schemadata_id"?: string,
    /** Optional documentation */
    "documentation"?: string,
    /** Optional properties (user defined) */
    "properties"?: object,
    /** Tags assigned to this field; for categorization/search purpose */
    "tags"?: Array<string>,
    /** custom PK based on a hash of the name and parents names */
    "idh"?: string,
    /** FK to the custom hash of the parents entity (the table) */
    "tables_idh"?: string,
    /** If 1, we will not grab the data from the source (so, it will not exist in our big data env.) */
    "should_ignore"?: number,
    /** If 1, this is contains GDPR data; it implies this might be PII and we might have to delete this data is the customer reuests to be "forgotten". */
    "is_gdpr"?: number,
    /** 
     * List of groups this field is part of 
     * @deprecated 
     */
    "group"?: Array<string>,
    /** Semantic types are "human understandable types". Those special tags are used to give some meaning to the field/data. 
     * A field has to contain at least 2 semantic types (key-value pair). For example, a field can be of semantic type: customer, email.
     * This means that the data will be an email, part of the "category/group" email. This makes more sense if we take an address as an example:
     * for an address we will have a zip, city, street, ... part of the "group" address...
     */
    "semantic_type"?: Array<string>,
    /** If 1, this field contains personal identifiable information and will be hashed in our big data environment */
    "is_pii"?: number,
    /** If 1, this field contains payment card information and should be encrypted when at rest in our big data env.  */
    "is_pci"?: number,
    /** If 1, the data will be converted to lower case (this is the default setting) */
    "to_lower"?: number,
    /** If 1, this field is used for CDC (change data capture). Typically, a "on update" system managed timestamp might be the CDC column/field. */
    "is_cdc_field"?: number,
    /** If 1, this field is a primary key. */
    "is_pk"?: number,
    /** If 1, this field is a foreign key (link to another field in another table; see linked_to) */
    "is_fk"?: number,
    /** reference to the table:field this field is linked to */
    "linked_to"?: string
};

/**
 * Tables schema
 */
export interface tablesSchema {
    [key:string]: any,
    /** PK */
    "id"?: string,
    /** Storage engine used */
    "storageengine"?: string,
    /** FK to the database containing the table */
    "databases_id"?: string,
    /** Custom PK based on a hash of the name and parents */
    "idh"?:string,
    /** FK to the schem */
    "schemas_idh"?: string,
    /** */
    "schemadata_id"?: string,
    /** */
    "should_ignore"?: number,
    /** */
    "is_gdpr"?: number,
    /** */
    "name"?: string,
    /** */
    "landing_destination"?: string,
    /** */
    "documentation"?: string,
    /** */
    "tags"?: Array<string>,
};

/**
 * Database schema
 */
export interface databasesSchema {
    [key:string]: any,
    /** */
    "id"?: string,
    /** */
    "name"?: string,
    /** */
    "origins_id"?: string,
    /** */
    "vendorbrand"?: string,
    /** */
    "storageengine"?: string,
    /** */
    "idh"?:string,
    /** */
    "origins_idh"?:string,
    /** */
    "schemadata_id"?: string,
    /** */
    "should_ignore"?: number,
    /** */
    "documentation"?: string,
    /** */
    "tags"?: Array<string>,
    /** */
    "timezone"?: string,
    /** */
    "parent_id"?: string,
    /** */
    "app_name"?: string,
    /** */
    "network"?: string,
    /** */
    "hosted_area"?: string,
    /** */
    "in_bidm"?: number,
    /** */
    "deluxe_name"?: string,
    /** */
    "firewall"?: number,
    /** */
    "instance_name"?: string,
    /** */
    "schema_name"?: string,
    /** */
    "username"?: string,
    /** */
    "password"?: string,
    /** */
    "hostname"?: string,
    /** */
    "sid"?: string,
    /** */
    "ip"?: string,
    /** */
    "port"?: string,
    /** */
    "jdbc_connection_str"?: string
};

/**
 * Schema schema
 */
export interface schemasSchema {
    [key:string]: any,
    /** */
    "idh"?: "string",
    /** */
    "databases_idh"?: "string",
    /** */
    "schemadata_id"?: "string",
    /** */
    "name"?: "string",
    /** */
    "should_ignore"?: "number",
    /** */
    "documentation"?: "string",
    /** */
    "tags"?: Array<string>,
    /** */
    "schema"?: string,
    /** */
    "storageengine"? : string,
    /** */
    "vendorbrand"? : string,
    /** */
    "timezone"?: string,
    /** */
    "parent_id"?: string
};

/**
 * Origins schema
 */
export interface originsSchema {
    [key:string]: any,
    /** */
    "id"?: string,
    /** */
    "idh"?: string,
    /** */
    "schemadata_id"?: string,
    /** */
    "should_ignore"?: number,
    /** */
    "name"?: string,
    /** */
    "organization"?: string,
    /** */
    "app_code"?: string,
    /** */
    "cust_type"?: string,
    /** */
    "customer_source"?: string,
    /** */
    "business_contact"?: string,
    /** */
    "cdc_enabled"?:  number,
    /** */
    "owner"?:  string,
    /** */
    "tags"?: Array<string>,
    /** */
    "documentation"?: string,
    /** */
    "notes"?: string
};

/**
 * Navigation menu Item shape
 */
export interface MenuItem {
    /** name/id */
    name: string,
    /** Label to display in the menu bar */
    label: string,
    /** The group from which this item can be displayed */
    role: 'god' | 'superadmin' | 'admin' | 'editor' | 'viewer',
    /** is active/selected or not */
    active: boolean,
    /** Icon to dislpay */
    icon: IconName,
    /** Is the item visible in the menu */
    menuVisible: boolean,
    /** optional sublevel items */
    sublevel?: Array<MenuItem>,
    /** Level for the search screen */
    level?: number    

};

/**
 * Form element configuration shape
 */
export interface formElementConfigSchema {
    /** */
    shape: 'text' | 'select' | 'password' | 'email' | 'checkbow' | 'radio' | 'slider' | 'switch' | 'file' | 'numeric' | 'textarea'  | 'tag'  | 'datetime'  | 'timezone' | 'submit',
    /** */
    showLabel?: boolean,
    /** */
    options?: object,
    /** */
    diabled?: boolean,
    /** */
    hideLabel?: boolean,
    /** */
    leftIcon?: IconName,
    /** */
    placeholder?: string
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
    /** */
    showButton?: boolean,
    /** */
    buttonAction?: string,
    /** */
    fill?: boolean,
    /** */
    vertical?: boolean,
    /** */
    elements?: formElemObjConfigSchema
};

export interface gridConfigActionMethods {
    [key:string]: Function,
    /** */
    view?: Function,
    /** */
    edit?: Function,
    /** */
    delete?: Function,
    /** */
    drilldown?: Function
};

/**
 * Config for the standard datagrid (HTML version)
 */
export interface gridConfig {
    [key:string]: any,
    /** */
    showOnly?: Array<string>,
    /** */
    actions?: Array<'view' | 'edit' | 'delete' | 'drilldown' | 'add'>,
    /** */
    editable?: Array<string>
};

export interface modelErrorSchema {
    code?: string,
    message?: string,
    name?: string,
    stack?: string,
    statusCode?: number
};

export interface tagObjectSchema {
    [key:string]: Array<string>
};
export interface paginationSchema {
    perpages: number,
    pages: number,
    selected: number,
    searchstr: string,
    should_ignore: number,
    tagsfilter: object
};

export interface sortparamsSchema {
    columnName: string,
    asc: boolean
};

