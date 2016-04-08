export interface IJsonSchema {
    id?: string;
    example?: string;
    $schema?: string;
    $ref?:string;
    title?: string;
    description?: string;
    multipleOf?: number;
    maximum?: number;
    exclusiveMaximum?: boolean;
    minimum?: number;
    exclusiveMinimum?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    additionalItems?: boolean | IJsonSchema;
    items?: IJsonSchema;
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
    maxProperties?: number;
    minProperties?: number;
    required?: string[];
    additionalProperties?: boolean | IJsonSchema;
    definitions?: {
        [name: string]: IJsonSchema
    };
    properties?: {
        [name: string]: IJsonSchema
    };
    patternProperties?: {
        [name: string]: IJsonSchema
    };
    dependencies?: {
        [name: string]: IJsonSchema | string[]
    };
    'enum'?: any[];
    type?: string;
    format?:string;
    default?:boolean;
    allOf?: IJsonSchema[];
    anyOf?: IJsonSchema[];
    oneOf?: IJsonSchema[];
    not?: IJsonSchema;
    xml?:{name:string,wrapped:boolean};
}