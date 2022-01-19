import { IconName } from "@blueprintjs/core";

/**
 * Schemadata Schema.
 * Schemadata is the collection/table in the DB where we store the raw data from the 
 * queries extracting sources schemas with Streamsets
 */
export interface schemadataSchema {
    [key:string]: any,
    "id"? : string,
    "meta_database_name"? : string,
    "meta_schema_name"? : string,
    "meta_table_name"? : string,
    "meta_column_name"? : string,
    "meta_column_type"? : string, 
    "meta_column_length"? : number, 
    "meta_column_precision"? : number,
    "meta_is_nullable"? : number, 
    "meta_is_pk"? : number,
    "meta_is_fk"? : number, 
    "meta_is_unique"? : number,
    "meta_schema_acquisition_timestamp"? : number,
    "meta_checksum"? : string,
    "meta_database_engine"? : string,
    "meta_pipeline_name"? : string, 
    "meta_connection_str"? : string,
    "meta_app_code"? : string,
    "meta_documentation"? : string,
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

export interface semantictypesSchema {
    [key:string]: any,
    /** PK */
    "id"?: string,
    /** Tag name/label */
    "name"?: string,
    /** Optional description */
    "description"?: object,
    /** Active on/off */
    "should_ignore"?: number
    "created_date"?: string,
    "processing_description"?: string,
    "parent_id"?: string,
    "tags"?: Array<string>
}

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

export interface ApplogSchema {
    [key:string]: any,
    "id"? : string, 
    "insertdate"? : string, 
    "action"? : string, 
    "model"? : string, 
    "query"? : object, 
    "tokenCreated"? : string, 
    "User_id"? : string, 
    "isNewInstance"? : boolean,
    "user"? : UsersSchema
};

export interface ViewapplogactionsSchema {
    "id"?: string,
    "User_id"?: string,
    "username"?: string,
    "document_id"?: string,
    "schemadata_id"?: string,
    "idh"?: string,
    "insertdate"?: string,
    "applog_createddate"?: string,
    "document_createddate"?: string,
    "schemadata_createddate"?: string,
    "action"?: string,
    "collection"?: string,
    "database_name"?: string,
    "schema_name"?: string,
    "table_name"?: string,
    "column_name"?: string
};

export interface ViewlastinserteddataSchema {
    "id"?: string,
    "name_systems"?: string,
    "name_origins"?: string,
    "name_databases"?: string,
    "name_schemas"?: string,
    "name_table"?: string,
    "name_field"?: string,
    "date_systems"?: string,
    "date_origins"?: string,
    "date_schemas"?: string,
    "date_tables"?: string,
    "date_field"?: string,
};

export interface ViewhivetablesSchema {
    "id"?: string,
    "database"?: string,
    "table"?: string,
};


export interface ViewapplogbulkactionsSchema {
    "id"?: string,
    "User_id"?: string,
    "username"?: string,
    "document_id"?: string,
    "schemadata_id"?: string,
    "idh"?: string,
    "insertdate"?: string,
    "applog_createddate"?: string,
    "document_createddate"?: string,
    "schemadata_createddate"?: string,
    "action"?: string,
    "collection"?: string,
    "database_name"?: string,
    "schema_name"?: string,
    "table_name"?: string,
    "column_name"?: string
};

export interface ViewfieldsflatSchema 
{
    [key:string]: any,

    "field__id"?: string,
    "field_idh"?: string,
    "field_schemadata_id"?: string,
    "field_name"?: string,
    "field_datatype"?: string,
    "field_datalength"?: string,
    "field_charset"?: string,
    "field_tables_idh"?: string,
    "field_to_lower"?: string,
    "field_is_cdc_field"?: string,
    "field_documentation"?: string,
    "field_should_ignore"?: string,
    "tags_undefined"?: string,
    "field_is_gdpr"?: string,
    "group_undefined"?: string,
    "semantic_type_undefined"?: string,
    "field_is_pii"?: string,
    "field_is_pci"?: string,
    "field_is_pk"?: string,
    "field_is_fk"?: string,
    "field_linked_to"?: string,
    "field_is_nullable"?: string,
    "field_is_unique"?: string,
    "field_keyorder"?: string,
    "field_has_index"?: string,
    "field_index_name"?: string,
    "field_index_position"?: string,
    "field_tables_id"?: string,
    "table__id"?: string,
    "table_idh"?: string,
    "table_schemadata_id"?: string,
    "table_name"?: string,
    "table_schemas_idh"?: string,
    "table_should_ignore"?: string,
    "table_storageengine"?: string,
    "table_databases_id"?: string,
    "table_is_gdpr"?: string,
    "table_landing_destination"?: string,
    "table_documentation"?: string,
    "table_tags"?: string,
    "table_schemas_id"?: string,
    "schema__id"?: string,
    "schema_schemadata_id"?: string,
    "schema_idh"?: string,
    "schema_databases_idh"?: string,
    "schema_name"?: string,
    "schema_code"?: string,
    "schema_should_ignore"?: string,
    "schema_documentation"?: string,
    "schema_tags"?: string,
    "schema_schema"?: string,
    "schema_storageengine"?: string,
    "schema_vendorbrand"?: string,
    "schema_destination_lake"?: string,
    "schema_timezone"?: string,
    "schema_parent_id"?: string,
    "schema_databases_id"?: string,
    "database__id"?: string,
    "database_schemadata_id"?: string,
    "database_idh"?: string,
    "database_origins_idh"?: string,
    "database_name"?: string,
    "database_vendorbrand"?: string,
    "database_storageengine"?: string,
    "database_should_ignore"?: string,
    "database_documentation"?: string,
    "database_tags"?: string,
    "database_timezone"?: string,
    "database_parent_id"?: string,
    "database_app_name"?: string,
    "database_network"?: string,
    "database_hosted_area"?: string,
    "database_in_bidm"?: string,
    "database_deluxe_name"?: string,
    "database_firewall"?: string,
    "database_instance_name"?: string,
    "database_schema_name"?: string,
    "database_username"?: string,
    "database_password"?: string,
    "database_hostname"?: string,
    "database_sid"?: string,
    "database_ip"?: string,
    "database_port"?: string,
    "database_jdbc_connection_str"?: string,
    "database_origins_id"?: string,
    "origin__id"?: string,
    "origin_schemadata_id"?: string,
    "origin_idh"?: string,
    "origin_systems_idh"?: string,
    "origin_name"?: string,
    "origin_host"?: string,
    "origin_organization"?: string,
    "origin_should_ignore"?: string,
    "origin_app_code"?: string,
    "origin_cust_type"?: string,
    "origin_customer_source"?: string,
    "origin_business_contact"?: string,
    "origin_cdc_enabled"?: string,
    "origin_owner"?: string,
    "origin_tags"?: string,
    "origin_documentation"?: string,
    "origin_notes"?: string,
    "origin_systems_id"?: string,
    "system__id"?: string,
    "system_schemadata_id"?: string,
    "system_idh"?: string,
    "system_name"?: string,
    "system_should_ignore"?: string,
    "date_field"?: string,
    "date_table"?: string,
    "date_schema"?: string,
    "date_database"?: string,
    "date_origin"?: string,
    "date_system"?: string,
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
    "linked_to"?: string,
    "is_nullable"?: number,
    "is_unique"?: number,
    "keyorder"?: string,
    "has_index"?: number,
    "index_name"?: string,
    "index_position"?: number,
    "is_phi"?: number,
    "is_other_special_handling"?: number,
    "other_special_handling_type"?: string,

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
    "code"?: string,
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
 * Systems schema
 */
export interface systemsSchema {
    [key:string]: any,
    "id"?: string,
    "idh"?: string,
    "should_ignore"?: number,
    "name"?: string,
    "organization"?: string, 
    "code"?: string,
    "tags"?: Array<string>,
    "documentation"?: string, 
    "notes"?: string,
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
    "systems_id"?: string,
    "systems_idh"?: string,
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
    /** Tooltip text */
    tip?: string,
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
    shape: 'text' | 'select' | 'link' | 'password' | 'semantictypes' | 'email' | 'checkbox' | 'radio' | 'slider' | 'switch' | 'file' | 'numeric' | 'textarea'  | 'tag'  | 'datetime'  | 'timezone' | 'submit',
    /** */
    showLabel?: boolean,
    /** */
    options?: object,
    /** */
    disabled?: boolean,
    /** */
    hideLabel?: boolean,
    /** */
    leftIcon?: IconName,
    /** */
    placeholder?: string,
    bulkedit?: boolean
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
    /** Elements definition for edition / addition form */
    elements?: formElemObjConfigSchema,
    /** Elements for search form */
    elementssearch?: formElemObjConfigSchema
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
    actions?: Array<'view' | 'edit' | 'delete' | 'drilldown' | 'add' | 'report'>,
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
export interface sortparamsSchema {
    columnName: string,
    asc: boolean
};

/**
 * Payload to send to the server for a bulk update
 */
export interface requestDataGlobalSearch {
    name: string,
    ids: Array<string>,
    properties: fieldsSchema | tablesSchema | originsSchema | systemsSchema | databasesSchema | schemasSchema
}

/**
 * Response from the server after a bulk update
 * example: {"n":28,"nModified":28,"ok":1}
 */
export interface responseDataGlobalSearch {
    n: number,
    nModified: number,
    ok: number
}
/**
 * Object returned in the array from the getlatesttokens API
 */
export interface latesttokensSchema {
    "ttl": number, 
    "created": string, 
    "userId": string, 
    "username": string, 
    "realm": string, 
    "email": string, 
    "role": string, 
}

export interface datapipelinetablesvalidityDatacolumnviewSchema {
    tablename: string,
    schemaname: string,
    fields_length: number,
    to_lower: Array<number>,
    to_lower_sum: number,
    is_cdc_field: Array<number>,
    is_cdc_field_sum: number,
    should_ignore: Array<number>,
    should_ignore_sum: number,
    is_gdpr: Array<number>,
    is_gdpr_sum: number,
    is_pii: Array<number>,
    is_pii_sum: number,
    is_pci: Array<number>,
    is_pci_sum: number,
    is_pk: Array<number>,
    is_pk_sum: number,
    is_fk: Array<number>,
    is_fk_sum: number,
    group: Array<number>,
    group_sum: number,
    semantic_type: Array<number>,
    semantic_type_sum: number,
    documentation: Array<number>,
    documentation_sum: number
}

export interface datapipelinetablesvalidityTableshumanreadableSchema {
    name: string,
    schemaname: string,
    fields_length: number,
    to_lower_sum: number,
    is_cdc_field_sum: number,
    is_cdc_field_data: Array<number>,
    should_ignore_sum: number,
    should_ignore_data: Array<number>,
    is_gdpr_sum: number,
    is_gdpr_data: Array<number>,
    is_pii_sum: number,
    is_pii_data: Array<number>,
    is_pci_sum: number,
    is_pci_data: Array<number>,
    is_pk_sum: number,
    is_pk_data: Array<number>,
    is_fk_sum: number,
    is_fk_data: Array<number>,
    documentation_sum: number,
    documentation_data: Array<number>,
    group_sum: number,
    semantic_type_sum: number
};

export interface datapipelinetablesvalidityTableaggregationSchema {
    schemaname: string,
    tables_length: number,
    is_cdc_field_sum: number,
    fields_length: number,
    to_lower_sum: number,
    should_ignore_sum: number,
    is_gdpr_sum: number,
    is_pii_sum: number,
    is_pci_sum: number,
    is_phi_sum: number,
    is_pk_sum: number,
    is_fk_sum: number,
    group_sum: number,
    semantic_type_sum: number,
    documentation_sum: number
}

export interface datapipelinetablesvalidityReportSchema {
    has_cdc_for_each_table: boolean,
    has_pk_for_each_table: boolean,
}

export interface datapipelinetablesvaliditySchema {
    datacolumnview: Array<datapipelinetablesvalidityDatacolumnviewSchema> | null,
    tableaggregation: datapipelinetablesvalidityTableaggregationSchema | null,
    report: datapipelinetablesvalidityReportSchema | null,
    tableshumanreadable: Array<datapipelinetablesvalidityTableshumanreadableSchema> | null
}
