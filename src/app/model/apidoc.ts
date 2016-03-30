
type MimeTypes = string[];
type Parameters = (ParameterObject)[];

const TYPE_DEFINITION:string = '#/definitions/';
const TYPE_ARRAY:string = 'array';
const TYPE_OBJECT:string = 'object';
const PATH_PARAM:string = 'path';
const QUERY_PARAM:string = 'query';
const BODY_PARAM:string = 'body';
const HTTP_METHOD_PATCH:string = 'PATCH';
const HTTP_METHOD_POST:string = 'POST';
const HTTP_METHOD_PUT:string = 'PUT';

const METHOD_CLASS:Object = {
    GET:'grey lighten-2',
    POST:'teal lighten-2',
    PUT:'yellow lighten-2',
    DELETE:'red lighten-2',
    PATCH:'light-blue lighten-2',
    HEAD:'pink lighten-2'
};

export class ApiResult {
    message:string;
    status:number;
    date:Date;
    operation:OperationObject;
    constructor() {
        this.date = new Date();
        this.operation = new OperationObject();
    }
    getStatusClass():string {
        if(this.status >= 200 && this.status < 300) {
            return 'green lighten-2';
        }
        return 'red lighten-2';
    }
    getHighLightClass():string {
        if(this.operation.isJson()) {
            return 'json';
        }
        return 'xml';
    }
}

export class ApiDefinition {
    swagger: string;
    info: InfoObject;
    host: string;
    basePath: string;
    schemes: string[];
    consumes: MimeTypes;
    produces: MimeTypes;
    paths: Array<PathsObject>;
    definitions: Array<DefinitionsObject>;
    parameters: ParametersDefinitionsObject;
    responses: ResponsesDefinitionsObject;
    securityDefinitions: SecurityDefinitionsObject;
    security: SecurityRequirementObject[];
    tags: TagObject[];
    externalDocs: ExternalDocumentationObject;
    baseUrl:string;
    constructor(_apiDoc?:any) {
        this.info = new InfoObject();
        this.paths = [];
        this.produces = [];
        this.consumes = [];
        this.schemes = [];
        this.definitions = [];
        this.parameters = new ParametersDefinitionsObject();
        this.responses = new ResponsesDefinitionsObject();
        this.securityDefinitions = new SecurityDefinitionsObject();
        this.externalDocs = new ExternalDocumentationObject();
        this.security = [];
        this.tags = [];

        if(_apiDoc) {
            Object.assign(this, _apiDoc);

            this.baseUrl = 'http://'+this.host;
            if(this.basePath) {
                this.baseUrl +=  this.basePath;
            }

            if(_apiDoc.info) {
                this.info = new InfoObject(_apiDoc.info);
            }
            if(_apiDoc.paths) {
                this.paths = [];
                Object.keys(_apiDoc.paths).forEach((key:string)=> {
                    this.paths.push(new PathsObject(key,_apiDoc.paths[key]));
                });
            }
            if(_apiDoc.definitions) {
                this.definitions = [];
                Object.keys(_apiDoc.definitions).forEach((name:string) => {
                    this.definitions.push(new DefinitionsObject(name,_apiDoc.definitions[name]));
                });

            }
            if(_apiDoc.tags) {
                this.tags = [];
                _apiDoc.tags.forEach((tag:any) => {
                    this.tags.push(new TagObject(tag));
                });
            }
            if(_apiDoc.externalDocs) {
                this.externalDocs = new ExternalDocumentationObject(_apiDoc.externalDocs);
            }
        }
    }
    getDefinitionByEntity(entity:string):DefinitionsObject {
        return this.definitions.find((definition:DefinitionsObject) => {
            return definition.name === entity;
        });
    }
    isDtoType(entityName:string):boolean {
        let definition:DefinitionsObject = this.getDefinitionByEntity(entityName);
        return definition && definition.schema.type === TYPE_OBJECT;
    }
    toEntityName(name:string):string {
        if(name) {
            return name.replace(TYPE_DEFINITION, '');
        }
    }
    isOperationDtoType(operation:OperationObject):boolean {
        let resp:ResponseObject = operation.getOkResponse();
        return resp && resp.schema && resp.schema.$ref && this.isDtoType(resp.schema.entity);
    }
    getDtoType(operation:OperationObject):string {
        let resp:ResponseObject = operation.getOkResponse();
        if(resp && resp.schema) {
            if (resp.schema.entity) {
                return resp.schema.entity;
            }
            if(resp.schema.items && resp.schema.items.entity) {
                return resp.schema.items.entity;
            }
        }
    }
    isTypeArray(operation:OperationObject):boolean {
        let resp:ResponseObject = operation.getOkResponse();
        if(resp && resp.schema) {
            return resp.schema.type === TYPE_ARRAY;
        }
        return false;
    }
}

export class InfoObject {
    title: string;
    description: string;
    termsOfService: string;
    contact: ContactObject;
    license: LicenseObject;
    version: string;
    constructor(_info?:any) {
        this.contact = new ContactObject();
        this.license = new LicenseObject();
        if(_info) {
            Object.assign(this,_info);
            if(_info.contact) {
                this.contact = new ContactObject(_info.contact);
            }
            if(_info.license) {
                this.license = new LicenseObject(_info.license);
            }
        }
    }
}

export class ContactObject {
    name: string;
    url: string;
    email: string;
    constructor(_contact?:any) {
        if(_contact) {
            Object.assign(this,_contact);
        }
    }
}

export class LicenseObject {
    name: string;
    url: string;
    constructor(_license?:any) {
        if(_license) {
            Object.assign(this,_license);
        }
    }
}

export class PathsObject {
    name:string;
    path: PathItemObject;
    constructor(name?:string,_pathItem?:any) {
        this.name = name;
        this.path = new PathItemObject();
        if(_pathItem) {
            this.path = new PathItemObject(name,_pathItem);
        }
    }
}

export class PathItemObject {
    $ref: string;
    path:string;
    parameters: Parameters;
    operations:Array<OperationObject>;
    constructor(path?:string,_pathItemObj?:any) {
        this.path = path;
        this.operations = [];
        if(_pathItemObj) {
            Object.keys(_pathItemObj).forEach((method:string) => {
                this.operations.push(new OperationObject(path,method,_pathItemObj[method]));
            });
        }
    }
}

export class OperationObject {
    name:string;
    path:string;
    tags: string[];
    summary: string;
    description: string;
    externalDocs: ExternalDocumentationObject;
    operationId: string;
    consumes: MimeTypes;
    produces: MimeTypes;
    parameters: Parameters;
    responses: Array<ResponsesObject>;
    schemes: string[];
    deprecated: boolean;
    security: SecurityRequirementObject[];
    dataJson:string;
    patchJson:string;
    produce:string;
    constructor(path?:string,method?:string,_opObj?:any) {
        this.responses = [];
        this.parameters = [];
        this.produces = [];
        this.consumes = [];
        this.path = path;
        this.produce = 'application/json';
        if(method) {
            this.name = method.toUpperCase();
        }
        if(_opObj) {
            Object.assign(this,_opObj);
            if(_opObj.externalDocs) {
                this.externalDocs = new ExternalDocumentationObject(_opObj.externalDocs);
            }
            if(_opObj.responses) {
                this.responses = [];
                Object.keys(_opObj.responses).forEach((code:string) => {
                    this.responses.push(new ResponsesObject(code,_opObj.responses));
                });
            }
            if(_opObj.parameters) {
                this.parameters = [];
                _opObj.parameters.forEach((param:any) => {
                    this.parameters.push(new ParameterObject(param));
                });
            }
            if(_opObj.produces) {
                this.produce = this.produces[0];
            }
        }
    }
    getMethodClass():string {
        if(this.name) {
            return METHOD_CLASS[this.name];
        }
    }
    getOkResponse():ResponseObject {
        let respObj:ResponsesObject = this.responses.find((resp:ResponsesObject) => {
            return resp.code === '200';
        });

        if(respObj) {
            return respObj.response;
        }
    }
    getRequestUrl(onlyParameters:boolean):string {
        let url :string = !onlyParameters ? this.path : '';

        if(this.parameters.length > 0) {
            this.parameters.forEach((param:ParameterObject) => {
                if (param.isPathParam()) {
                    url = url.replace(new RegExp('{' + param.name + '}'), param.value);
                } else if (param.isQueryParam()) {
                    url += url.indexOf('?') === -1 ? '?' + param.name + '=' + param.value : '&' + param.name + '=' + param.value;
                }
            });
        }
        return url;
    }
    isPatchMethod():boolean {
        return this.name === HTTP_METHOD_PATCH;
    }
    isPostMethod():boolean {
        return this.name === HTTP_METHOD_POST;
    }
    isPutMethod():boolean {
        return this.name === HTTP_METHOD_PUT;
    }
    isJson():boolean {
        return this.produce && this.produce.indexOf('json') !== -1;
    }
}

export class DefinitionsObject {
    name:string;
    schema: SchemaObject;
    constructor(name?:string,_defObj?:any) {
        this.name = name;
        this.schema = new SchemaObject();
        if(_defObj) {
            this.schema = new SchemaObject(_defObj);
        }
    }
    isRequired(fieldName:string):boolean {
        return this.schema.required.indexOf(fieldName) !== -1;
    }
}

export class ResponsesObject {
    code:string;
    response: ResponseObject;
    constructor(code:string,_respObj?:any) {
        this.code = code;
        if(_respObj) {
            this.response = new ResponseObject(_respObj[code]);
        }
    }
}

export class ResponsesDefinitionsObject {
    [index: string]: ResponseObject;
}

export class ResponseObject {
    description: string;
    schema: SchemaObject;
    headers: HeadersObject;
    examples: ExampleObject;
    items:ReferenceObject;
    constructor(_respObj?:any) {
        if(_respObj) {
            Object.assign(this,_respObj);
            if(_respObj.schema) {
                this.schema = new SchemaObject(_respObj.schema);
            }
            if(_respObj.examples) {
                this.examples = new ExampleObject(_respObj.examples);
            }
            if(_respObj.headers) {
                this.headers = new HeadersObject(_respObj.headers);
            }
            if(_respObj.items) {
                this.items = new ReferenceObject(_respObj.items);
            }
        }
    }
}

export class HeadersObject {
    [index: string]: HeaderObject;
    constructor(_headersObj?:any) {
        if(_headersObj) {
            Object.assign(this,_headersObj);
        }
    }
}

export class ExampleObject {
    [index: string]: any;
    constructor(_exampleObj?:any) {
        if(_exampleObj) {
            Object.assign(this,_exampleObj);
        }
    }
}

export class SecurityDefinitionsObject {
    [index: string]: SecuritySchemeObject;
}

export class SecuritySchemeObject {
    type: string;
    description: string;
    name: string;
    'in': string;
    flow: string;
    authorizationUrl: string;
    tokenUrl: string;
    scopes: ScopesObject;
}

export class ScopesObject {
    [index: string]: any;
}

export class SecurityRequirementObject {
    [index: string]: string[];
}

export class TagObject {
    name: string;
    description: string;
    externalDocs: ExternalDocumentationObject;
    constructor(_tagsObj?:any) {
        if(_tagsObj) {
            Object.assign(this,_tagsObj);
            if(_tagsObj.externalDocs) {
                this.externalDocs = new ExternalDocumentationObject(_tagsObj.externalDocs);
            }
        }
    }
}

export class ItemsObject {
    type: string;
    format: string;
    items: ItemsObject;
    collectionFormat: string;
    'default': any;
    maximum: number;
    exclusiveMaximum: boolean;
    minimum: number;
    exclusiveMinimum: boolean;
    maxLength: number;
    minLength: number;
    pattern: string;
    maxItems: number;
    minItems: number;
    uniqueItems: boolean;
    'enum': any[];
    multipleOf: number;
    constructor(_itemsObject?:any) {
        this.enum = [];
        if(_itemsObject) {
            Object.assign(this,_itemsObject);
            if(_itemsObject.items) {
                this.items = new ItemsObject(_itemsObject.items);
            }
        }
    }
}

export class HeaderObject extends ItemsObject {
}

export class ParametersDefinitionsObject {
    [index: string]: ParameterObject;
}

export class ParameterObject {
    name: string;
    'in': string;
    description: string;
    required: boolean;
    value:any;
    schema:ReferenceObject;
    collectionFormat:string;
    items:ItemsObject;
    type:string;
    constructor(_paramObj?:any) {
        this.items = new ItemsObject();
        if(_paramObj) {
            Object.assign(this,_paramObj);
            if(_paramObj.schema) {
                this.schema = new ReferenceObject(_paramObj.schema);
            }
            if(_paramObj.items) {
                this.items = new ItemsObject(_paramObj.items);
            }
        }
    }
    isPathParam():boolean {
        return this.in === PATH_PARAM;
    }
    isQueryParam():boolean {
        return this.in === QUERY_PARAM;
    }
    isBodyParam():boolean {
        return this.in === BODY_PARAM;
    }
    isTypeArray():boolean {
        return this.type === TYPE_ARRAY;
    }
    getParameterType():string {
        if(this.isBodyParam()) {
            return this.schema.entity;
        } else if(!this.isTypeArray()) {
            return this.type;
        } else if (this.items.enum && this.items.enum.length > 0) {
            return 'Enum ['+this.items.enum.join(',')+']';
        }
        return '['+this.items.type+']';
    }
}

export class ReferenceObject {
    $ref: string;
    entity:string;
    constructor(_refObj?:any) {
        if(_refObj) {
            Object.assign(this,_refObj);
            if(this.$ref) {
                this.entity = this.$ref.replace(TYPE_DEFINITION, '');
            }
        }
    }
}

export class ExternalDocumentationObject {
    [index: string]: any;
    description: string;
    url: string;
    constructor(_externDocObj?:any) {
        if(_externDocObj) {
            Object.assign(this,_externDocObj);
        }
    }
}

export interface IJsonSchema {
    id?: string;
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
    items?: IJsonSchema | IJsonSchema[];
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
    type?: string | string[];
    allOf?: IJsonSchema[];
    anyOf?: IJsonSchema[];
    oneOf?: IJsonSchema[];
    not?: IJsonSchema;
}

export class SchemaObject implements IJsonSchema {
    [index: string]: any;
    discriminator: string;
    readOnly: boolean;
    xml: XMLObject;
    externalDocs: ExternalDocumentationObject;
    example: any;
    items:ReferenceObject;
    $ref:string;
    entity:string;
    type:string;
    required: string[];
    properties: {
        [name: string]: IJsonSchema
    };
    constructor(_schemaObj?:any) {
        this.required = [];
        if(_schemaObj) {
            Object.assign(this,_schemaObj);
            if(_schemaObj.xml) {
                this.xml = new XMLObject(_schemaObj.xml);
            }
            if(_schemaObj.externalDocs) {
                this.externalDocs = new ExternalDocumentationObject(_schemaObj.externalDocs);
            }
            if(_schemaObj.items) {
                this.items = new ReferenceObject(_schemaObj.items);
            }
            if(_schemaObj.$ref) {
                this.entity = this.$ref.replace(TYPE_DEFINITION,'');
            }
        }
    }
    isPropertyTypeArray(value:any):boolean {
        return value.type === TYPE_ARRAY;
    }
    getPropertyByName(name:string):string {
        if(this.properties[name]) {
            return this.properties[name].description;
        }
    }
}

export class XMLObject {
    [index: string]: any;
    name: string;
    namespace: string;
    prefix: string;
    attribute: boolean;
    wrapped: boolean;
    constructor(_xmlObject?:any) {
        if(_xmlObject) {
            Object.assign(this,_xmlObject);
        }
    }
}
